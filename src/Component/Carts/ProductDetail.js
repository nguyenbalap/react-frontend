import Header from "../Header"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
export default function ProductDetail(props) {
    const [item, setItem] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    let params = useParams();
    let user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.post("api/product-details", params)
            .then((response) => {
                setItem(response.data.productInfo);
                setLoading(false);
            });
    }, [])
    const addToCart = (id, quantity) => {
        axios.post('api/shopping-cart', user)
            .then(res => {
                if (res.status === 200) {
                    checkExists(res.data, id, quantity);
                }
            });
        alert('Add success')

    }
    const checkExists = (data, id, quan) => {
        let quantity = 0;
        let temp = false;
        let user = JSON.parse(localStorage.getItem("user"));

        for (let i = 0; i < data.length; i++) {
            if (data[i].customer_id === user.user_id && data[i].product_id === id) {
                temp = true;
                quantity = data[i].quantity + quan;
                break;
            } else {
                temp = false;
                quantity = quan;
            }
        }
        if (data.length === 0) {
            temp = false;
            quantity = quan;
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
    const increase = () => {
        setQuantity(quantity + 1);
    }
    const decrease = () => {
        setQuantity(quantity - 1);
    }
    return (
        <>
            <Header />
            <div class="container single_product_container">
                <div class="row">
                    <div class="col">
                        {/* <!-- Breadcrumbs --> */}
                        <div class="breadcrumbs d-flex flex-row align-items-center">
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="categories.html"><i class="fa fa-angle-right" aria-hidden="true"></i>Men's</a></li>
                                <li class="active"><a href="#"><i class="fa fa-angle-right" aria-hidden="true"></i>Single Product</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-7">
                        <div class="single_product_pics">
                            <div class="row">
                                <div class="col-lg-3 thumbnails_col order-lg-1 order-2">
                                    <div class="single_product_thumbnails">
                                        <ul>
                                            <li class=""><img src="images/single_1_thumb.jpg" alt="#" data-image="images/single_1.jpg" /></li>
                                            <li class=""><img src="images/single_2_thumb.jpg" alt="#" data-image="images/single_2.jpg" /></li>
                                            <li class="active"><img src="images/single_3_thumb.jpg" alt="#" data-image="images/single_3.jpg" /></li>
                                        </ul>
                                    </div>
                                </div>
                                <div class="col-lg-9 image_col order-lg-2 order-1">
                                    <div class="single_product_image">
                                        <div class="single_product_image_background" style={{ backgroundImage: `url("${item.image}")` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-5">
                        <div class="product_details">
                            <div class="product_details_title">
                                <h2>{item.name}</h2>
                                <p>{item.description}...</p>
                            </div>
                            <div class="free_delivery d-flex flex-row align-items-center justify-content-center">
                                <span class="ti-truck"></span><span>free delivery</span>
                            </div>
                            <div class="original_price">$629.99</div>
                            <div class="product_price">${item.price}</div>
                            <ul class="star_rating">
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star" aria-hidden="true"></i></li>
                                <li><i class="fa fa-star-o" aria-hidden="true"></i></li>
                            </ul>
                            <div class="product_color">
                                <span>Select Color:</span>
                                <ul>
                                    <li style={{ background: "#e54e5d" }}></li>
                                    <li style={{ background: "#252525" }}></li>
                                    <li style={{ background: "#60b3f3" }}></li>
                                </ul>
                            </div>
                            <div class="quantity d-flex flex-column flex-sm-row align-items-sm-center">
                                <span>Quantity:</span>
                                <div class="quantity_selector">
                                    <button
                                        onClick={() => decrease()}
                                        style={{ border: "0", width: '100%', height: '100%', background: 'none', cursor: 'pointer' }}>
                                        <span class="minus">

                                            <i class="fa fa-minus" aria-hidden="true"></i>
                                        </span>
                                    </button>

                                    <span id="quantity_value">{quantity}</span>
                                    <button
                                        onClick={() => increase()}
                                        style={{ border: "0", width: '100%', height: '100%', background: 'none', cursor: 'pointer' }}>
                                        <span class="plus">

                                            <i class="fa fa-plus" aria-hidden="true"></i>
                                        </span>
                                    </button>

                                </div>
                                <button
                                    onClick={() => addToCart(item.id, quantity)}
                                    style={{ border: "0", width: '100%', height: '100%', cursor: 'pointer', backgroundColor: '#fe4c50', color: 'white' }}>
                                    add to cart
                                </button>
                                <div class="product_favorite d-flex flex-column align-items-center justify-content-center"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}