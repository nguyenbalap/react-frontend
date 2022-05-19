import Header from "../Header"
import axios from "axios"
import Footer from "../Footer"
import { useEffect, useState } from "react"



export default function Shop(props) {
    import("./css/categories_styles.css");
    import("./css/categories_responsive.css");

    const [item, setItem] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    let user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.post(`api/products/page/${page}`).then((res) => {
            setItem(res.data.products);
            setLoading(false);
        });
    }, [page])
    const currentPage = (e) => {
        setPage(parseInt(e.target.name));
    }
    const addToCart = (id) => {
        let user_cart = [];
        axios.post('api/shopping-cart', user)
            .then(res => {
                if (res.status === 200) {
                    checkExists(res.data, id);
                }
            });
        alert('Add success')

    }
    const checkExists = (data, id) => {
        let quantity = 0;
        let temp = false;
        let user = JSON.parse(localStorage.getItem("user"));

        for (let i = 0; i < data.length; i++) {
            if (data[i].customer_id === user.user_id && data[i].product_id === id) {
                temp = true;
                quantity = data[i].quantity + 1;
                break;
            } else {
                temp = false;
                quantity = 1;
            }
        }
        if (data.length === 0) {
            temp = false;
            quantity = 1;
        };
        console.log(temp);
        if (temp) {
            axios.put(`api/update-quantity/${id}`, { customer_id: user.user_id, product_id: id, quantity: quantity })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res)
                    }
                });
        } else {
            axios.post('api/add-new-item', { customer_id: user.user_id, product_id: id, quantity: quantity })
                .then(res => {
                    console.log(res)
                });
        }
    }
    console.log('re-render')
    return (
        <>
            <Header />

            <div className="container product_section_container">
                <div className="row">
                    <div className="col product_section clearfix">
                        {/* Breadcrumbs */}
                        <div className="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li className="active"><a href="index.html"><i className="fa fa-angle-right" aria-hidden="true" />Men's</a></li>
                            </ul>
                        </div>
                        {/* Sidebar */}
                        <div className="sidebar">
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Product Category</h5>
                                </div>
                                <ul className="sidebar_categories">
                                    <li><a href="#">Men</a></li>
                                    <li className="active"><a href="#"><span><i className="fa fa-angle-double-right" aria-hidden="true" /></span>Women</a></li>
                                    <li><a href="#">Accessories</a></li>
                                    <li><a href="#">New Arrivals</a></li>
                                    <li><a href="#">Collection</a></li>
                                    <li><a href="#">Shop</a></li>
                                </ul>
                            </div>
                            {/* Price Range Filtering */}
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Filter by Price</h5>
                                </div>
                                <p>
                                    <input type="text" id="amount" readOnly style={{ border: 0, color: '#f6931f', fontWeight: 'bold' }} />
                                </p>
                                <div id="slider-range" className="ui-slider ui-corner-all ui-slider-horizontal ui-widget ui-widget-content"><div className="ui-slider-range ui-corner-all ui-widget-header" style={{ left: '0%', width: '58%' }} /><span tabIndex={0} className="ui-slider-handle ui-corner-all ui-state-default" style={{ left: '0%' }} /><span tabIndex={0} className="ui-slider-handle ui-corner-all ui-state-default" style={{ left: '58%' }} /></div>
                                <div className="filter_button"><span>filter</span></div>
                            </div>
                            {/* Sizes */}
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Sizes</h5>
                                </div>
                                <ul className="checkboxes">
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>S</span></li>
                                    <li className="active"><i className="fa fa-square" aria-hidden="true" /><span>M</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>L</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>XL</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>XXL</span></li>
                                </ul>
                            </div>
                            {/* Color */}
                            <div className="sidebar_section">
                                <div className="sidebar_title">
                                    <h5>Color</h5>
                                </div>
                                <ul className="checkboxes">
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Black</span></li>
                                    <li className="active"><i className="fa fa-square" aria-hidden="true" /><span>Pink</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>White</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Blue</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Orange</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>White</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Blue</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Orange</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>White</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Blue</span></li>
                                    <li><i className="fa fa-square-o" aria-hidden="true" /><span>Orange</span></li>
                                </ul>
                                <div className="show_more">
                                    <span><span>+</span>Show More</span>
                                </div>
                            </div>
                        </div>
                        {/* Main Content */}
                        <div className="main_content">
                            {/* Products */}
                            <div className="products_iso">
                                <div className="row">
                                    <div className="col">
                                        {/* Product Sorting */}
                                        <div className="product_sorting_container product_sorting_container_top">
                                            <ul className="product_sorting">
                                                <li>
                                                    <span className="type_sorting_text">Default Sorting</span>
                                                    <i className="fa fa-angle-down" />
                                                    <ul className="sorting_type">
                                                        <li className="type_sorting_btn" data-isotope-option="{ &quot;sortBy&quot;: &quot;original-order&quot; }"><span>Default Sorting</span></li>
                                                        <li className="type_sorting_btn" data-isotope-option="{ &quot;sortBy&quot;: &quot;price&quot; }"><span>Price</span></li>
                                                        <li className="type_sorting_btn" data-isotope-option="{ &quot;sortBy&quot;: &quot;name&quot; }"><span>Product Name</span></li>
                                                    </ul>
                                                </li>
                                                <li>
                                                    <span>Show</span>
                                                    <span className="num_sorting_text">6</span>
                                                    <i className="fa fa-angle-down" />
                                                    <ul className="sorting_num">
                                                        <li className="num_sorting_btn"><span>6</span></li>
                                                        <li className="num_sorting_btn"><span>12</span></li>
                                                        <li className="num_sorting_btn"><span>24</span></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <div className="pages d-flex flex-row align-items-center">
                                                <div className="page_current">
                                                    <span>1</span>
                                                    <ul className="page_selection">
                                                        <li><a href="#">1</a></li>
                                                        <li><a href="#">2</a></li>
                                                        <li><a href="#">3</a></li>
                                                    </ul>
                                                </div>
                                                <div className="page_total"><span>of</span> 3</div>
                                                <div id="next_page" className="page_next"><a href="#"><i className="fa fa-long-arrow-right" aria-hidden="true" /></a></div>
                                            </div>
                                        </div>
                                        {/* Product Grid */}
                                        <div className="product-grid" style={{ position: 'relative', height: '1140px', display: 'flex', flexWrap: 'wrap' }}>
                                            {/* Product 1 */}
                                            {loading ? "" :
                                                item.map((value, index) => {
                                                    return (
                                                        <>
                                                            <div className="product-item men" >
                                                                <div className="product discount product_filter" style={{ borderRight: '1px solid rgb(233, 233, 233)' }}>
                                                                    <div className="product_image">
                                                                        <img src={`${value.image}`} alt="" />
                                                                    </div>
                                                                    <div className="favorite favorite_left" />
                                                                    <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                                                                    <div className="product_info">
                                                                        <h6 className="product_name"><a href="single.html">{value.name}</a></h6>
                                                                        <div className="product_price">{value.price}<span>$590.00</span></div>
                                                                    </div>
                                                                </div>
                                                                {user ?
                                                                    <div class="red_button add_to_cart_button" style={{ marginLeft: "0px", width: '100%' }}><button style={{ border: '0', background: 'none', color: 'white', width: '100%' }} onClick={() => addToCart(value.id)}>add to cart</button></div>
                                                                    :
                                                                    <div class="red_button add_to_cart_button"><a href="/login?errors=Chua co tai khoan">add to cart</a></div>
                                                                }
                                                            </div>

                                                        </>
                                                    )
                                                })


                                            }


                                        </div>
                                        {/* Product Sorting */}
                                        <div className="product_sorting_container product_sorting_container_bottom clearfix">
                                            <ul className="product_sorting">
                                                <li>
                                                    <span>Show:</span>
                                                    <span className="num_sorting_text">04</span>
                                                    <i className="fa fa-angle-down" />
                                                    <ul className="sorting_num">
                                                        <li className="num_sorting_btn"><span>01</span></li>
                                                        <li className="num_sorting_btn"><span>02</span></li>
                                                        <li className="num_sorting_btn"><span>03</span></li>
                                                        <li className="num_sorting_btn"><span>04</span></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <span className="showing_results">Showing 1–3 of 12 results</span>
                                            <div className="pages d-flex flex-row align-items-center">
                                                {[1, 2, 3].map(value => (
                                                    <>
                                                        <button className="btn btn-outline-secondary" type="button" onClick={currentPage} name={value}>{value}</button>
                                                    </>
                                                ))}
                                                <div id="next_page_1" className="page_next"><a href="#"><i className="fa fa-long-arrow-right" aria-hidden="true" /></a></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}