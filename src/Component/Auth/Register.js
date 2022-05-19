import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function Register(props) {
    let navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        address: "",
        phone: "",
        gender: "",
        email: "",
        password: "",
    })
    const handleInput = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const register = (e) => {
        e.preventDefault();
        axios.post("api/register", user)
            .then(res => {
                if (res.data.status === 200) {
                    navigate("/login");
                    alert('Đăng ký thành công')
                }

            })
            .catch(err => { alert(err) })
    }
    return (
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-8 col-xl-6">
                    <div class="row">
                        <div class="col text-center">
                            <h1>Register</h1>
                            <p class="text-h3">Far far away, behind the word mountains, far from the countries Vokalia
                                and Consonantia. </p>
                        </div>
                    </div>
                    <form onSubmit={(event) => register(event)} method="POST">
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <span>Name:</span><input type="text" class="form-control" name="name" onChange={(event) => handleInput(event)} />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <span>Address:</span><input type="text" class="form-control" name="address" onChange={(event) => handleInput(event)} />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <span>Phone:</span><input type="text" class="form-control" name="phone" onChange={(event) => handleInput(event)} />
                            </div>
                        </div>

                        <div class="row align-items-center mt-4">
                            <div class="col">
                                Male<input type="radio" class="form-control" name="gender" value={0} onChange={(event) => handleInput(event)} />
                            </div>
                            <div class="col">
                                Female<input type="radio" class="form-control" name="gender" value={1} onChange={(event) => handleInput(event)} />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <span>Email:</span><input type="email" class="form-control" name="email" onChange={(event) => handleInput(event)} />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                <span>Password:</span><input type="password" class="form-control" name="password" onChange={(event) => handleInput(event)} />
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