import React from 'react';
import Header from './Header';
import Banner from './Banner';
import DealOfWeek from './DealOfWeek';
import Benefit from './Benefit';
import Blog from './Blog';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import Slider from './Slider';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function OverView(props) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [logout, setLogout] = useState(false);

    const navigate = useNavigate();

    const [cart, setCart] = useState([]);
    let user = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        axios.get('api/products')
            .then(res => {
                if (res.status === 200) {
                    setProducts(res.data.products);
                    setLoading(false);
                }
            })
    }, [])
    let changeNumbertoType = (type) => {
        switch (type) {
            case 0:
                return 'women';
            case 1:
                return 'men'
            case 2:
                return 'accessories'
        }
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
    const signout = () => {
        alert("Logout success!");
        localStorage.removeItem("user");
        setLogout(true);
    }
    console.log('re-render')
    return (
        <div class="super_container">

            {/* <!-- Header --> */}
            <Header signout={signout} />
            {/* <!-- Slider --> */}
            <Slider />
            {/* <!-- Banner --> */}
            <Banner />
            {/* <!-- New Arrivals --> */}
            <div class="new_arrivals">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <div class="section_title new_arrivals_title">
                                <h2>New Arrivals</h2>
                            </div>
                        </div>
                    </div>
                    <div class="row align-items-center">
                        <div class="col text-center">
                            <div class="new_arrivals_sorting">
                                <ul class="arrivals_grid_sorting clearfix button-group filters-button-group">
                                    <li class="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked" data-filter="*">all</li>
                                    <li class="grid_sorting_button button d-flex flex-column justify-content-center align-items-center" data-filter=".women">women's</li>
                                    <li class="grid_sorting_button button d-flex flex-column justify-content-center align-items-center" data-filter=".accessories">accessories</li>
                                    <li class="grid_sorting_button button d-flex flex-column justify-content-center align-items-center" data-filter=".men">men's</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <div class="product-grid" data-isotope="{ &quot;itemSelector&quot;: &quot;.product-item&quot;, &quot;layoutMode&quot;: &quot;fitRows&quot; }" style={{ position: "relative", height: "760px" }}>

                                {/* <!-- Product 1 --> */}
                                {loading ? <h3>Loading...</h3> :
                                    products.map((value, index) => {
                                        let type = changeNumbertoType(value.type);
                                        if (index < 5) {
                                            return (
                                                <>

                                                    <div class={`product-item ${type}`} style={{ position: "absolute", left: `${index * 222}px`, top: "0px" }}>

                                                        <div class="product discount product_filter" style={{ borderRight: "1px solid rgb(233, 233, 233)" }}>
                                                            <div class="product_image">
                                                                <img src={`${value.image}`} alt="" />
                                                            </div>
                                                            <div class="favorite favorite_left"></div>
                                                            <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                                                            <div class="product_info">
                                                                <h6 class="product_name">
                                                                    <button onClick={() => navigate('/product-detail/' + value.id)}
                                                                        style={{ border: '0', background: 'none', color: '#333', cursor: 'pointer' }}

                                                                    >

                                                                        {value.name}
                                                                    </button>
                                                                </h6>
                                                                <div class="product_price">${value.price}</div>
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
                                        }
                                        else {
                                            return (
                                                <>
                                                    <div class={`product-item ${type}`} style={{ position: "absolute", left: `${(index - 5) * 222}px`, top: "380px" }}>

                                                        <div class="product discount product_filter" style={{ borderRight: "1px solid rgb(233, 233, 233)" }}>
                                                            <div class="product_image">
                                                                <img src={`${value.image}`} alt="" />
                                                            </div>
                                                            <div class="favorite favorite_left"></div>
                                                            <div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-$20</span></div>
                                                            <div class="product_info">
                                                                <h6 class="product_name">
                                                                    <button onClick={() => navigate('/product-detail/' + value.id)}
                                                                        style={{ border: '0', background: 'none', color: '#333', cursor: 'pointer' }}

                                                                    >
                                                                        {value.name}
                                                                    </button>
                                                                </h6>
                                                                <div class="product_price">${value.price}</div>
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
                                        }
                                    })
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Deal of the week --> */}
            <DealOfWeek />
            {/* <!-- Best Sellers --> */}
            {/* <!-- Benefit --> */}
            < Benefit />
            {/* <!-- Blogs --> */}
            < Blog />
            {/* <!-- Newsletter --> */}
            {/* <!-- Footer --> */}
            <Footer />
        </div >
    )
}