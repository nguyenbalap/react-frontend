import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    let navigate = useNavigate();

    const handleInput = (e) => {
        e.persist(); // deo biet la gi ty search
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const Verification = (e) => {
        e.preventDefault();

        console.log(navigate)
        axios.post("api/auth", user)
            .then(res => {
                if (res.data.status === 200) {
                    const access = JSON.stringify(res.data);
                    localStorage.setItem("user", access);
                    setUser(access);
                    navigate("../overview", { replace: true });
                } else {
                    console.log("???")
                }
            })
    }
    console.log(navigate)
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-8 col-xl-6">
                    <div class="row">
                        <div class="col text-center">
                            <h1>Signing</h1>
                            <p class="text-h3">Far far away, behind the word mountains, far from the countries Vokalia
                                and Consonantia. </p>
                        </div>
                    </div>
                    <form onSubmit={(event) => Verification(event)} method="POST">

                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <input type="email" class="form-control" placeholder="Email" name="email" onChange={handleInput} />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <input type="password" class="form-control" placeholder="Mật khẩu" name="password" onChange={handleInput} />
                            </div>

                        </div>
                        <div class="row justify-content-start mt-4">
                            <div class="col text-center">
                                <button class="btn btn-primary btn-lg">Submit</button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}