import React from 'react';
import check from './CheckUser';
import { useState } from 'react';
export default function Header(props) {
    const [logout, setLogout] = useState(false);
    let user = JSON.parse(localStorage.getItem("user"));
    return (
        <>
            <header class="header trans_300">
                {/* <!-- Top Navigation --> */}
                <div class="top_nav">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="top_nav_left">free shipping on all u.s orders over $50</div>
                            </div>
                            <div class="col-md-6 text-right">
                                <div class="top_nav_right">
                                    <ul class="top_nav_menu">

                                        {/* <!-- Currency / Language / My Account --> */}

                                        <li class="currency">
                                            <a href="#">
                                                usd
                                                <i class="fa fa-angle-down"></i>
                                            </a>
                                            <ul class="currency_selection">
                                                <li><a href="#">cad</a></li>
                                                <li><a href="#">aud</a></li>
                                                <li><a href="#">eur</a></li>
                                                <li><a href="#">gbp</a></li>
                                            </ul>
                                        </li>
                                        <li class="language">
                                            <a href="#">
                                                English
                                                <i class="fa fa-angle-down"></i>
                                            </a>
                                            <ul class="language_selection">
                                                <li><a href="#">French</a></li>
                                                <li><a href="#">Italian</a></li>
                                                <li><a href="#">German</a></li>
                                                <li><a href="#">Spanish</a></li>
                                            </ul>
                                        </li>
                                        <li class="account">
                                            <a href="#">
                                                My Account
                                                <i class="fa fa-angle-down"></i>
                                            </a>
                                            <ul class="account_selection">
                                                {user ?
                                                    <>
                                                        <li><a href="/info"><i class="fa fa-plus" aria-hidden="true"></i>{user.name}</a></li>
                                                        <li><button onClick={props.signout} style={{ border: "0", width: "100%", background: "none" }}><i class="fa fa-sign-out" aria-hidden="true"></i>Logout</button></li>
                                                    </>
                                                    : <>
                                                        <li><a href="/login"><i class="fa fa-sign-in" aria-hidden="true"></i>Sign In</a></li>
                                                        <li><a href="/register"><i class="fa fa-user-plus" aria-hidden="true"></i>Register</a></li>
                                                    </>}

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {/* <!-- Main Navigation --> */}

                <div class="main_nav_container">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-12 text-right">
                                <div class="logo_container">
                                    <a href="/overview">colo<span>shop</span></a>
                                </div>
                                <nav class="navbar">
                                    <ul class="navbar_menu">
                                        <li><a href="/overview">home</a></li>
                                        <li><a href="/shop">shop</a></li>
                                        <li><a href="#">promotion</a></li>
                                        <li><a href="#">pages</a></li>
                                        <li><a href="#">blog</a></li>
                                        <li><a href="contact.html">contact</a></li>
                                    </ul>
                                    <ul class="navbar_user">
                                        <li><a href="#"><i class="fa fa-search" aria-hidden="true"></i></a></li>
                                        <li><a href="#"><i class="fa fa-user" aria-hidden="true"></i></a></li>
                                        <li class="checkout">
                                            {user ?
                                                <a href="/shopping-cart">
                                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                </a>

                                                :
                                                <a href="/login?errors=Chua co tai khoan">
                                                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>
                                                </a>
                                            }

                                        </li>
                                    </ul>
                                    <div class="hamburger_container">
                                        <i class="fa fa-bars" aria-hidden="true"></i>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </header>


        </>
    )
}