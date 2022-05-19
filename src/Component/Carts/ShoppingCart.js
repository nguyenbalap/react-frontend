
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header"
export default function ShoppingCart(props) {
    let user = JSON.parse(localStorage.getItem("user"));
    let total = 0;

    const [item, setItem] = useState([]);
    // const [quantity, setQuantity] = useState(1);

    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState({
        customerId: user.user_id,
        name: user.name,
        address: user.address,
        phone: user.phone,
    })
    useEffect(() => {
        axios.post("api/user-shopping-cart", user)
            .then((response) => {
                setItem(response.data.products);
                setLoading(false);
            });
    }, [])
    const handleInput = (e) => {
        e.persist();
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
    const handleSupmit = (e, total_money) => {
        e.preventDefault();
        axios.post("api/orders", { customer, total_money }).then((response) => { setLoading(true) })
        alert('Đặt hàng thành công')
    }
    console.log(customer)
    return (
        <>
            <Header />
            <main class="col-md-9 ms-sm-auto col-lg-12 px-md-4 mt-5" style={{ padding: "150px" }}>
                <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 class="h2">Giỏ hàng</h1>

                </div>

                {/* <!--<canvas class="my-4 w-100" id="myChart" width="900" height="380"></canvas>--> */}

                {/* <!-- <h2>Section title</h2> --> */}
                <div class="table-responsive" style={{ height: '300px' }}>
                    <table class="table table-striped table-sm">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Thao tác</th>
                                <th scope="col">Tổng tiền</th>

                            </tr>
                        </thead>
                        <tbody>
                            {loading ? "" :
                                item.map((value, index) => {
                                    total += value.quantity * value.price;
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>
                                                    <img src={`${value.image}`} alt="#" style={{ height: '100px' }} />
                                                </td>
                                                <td>
                                                    {value.name}
                                                </td>
                                                <td>
                                                    {value.price}
                                                </td>
                                                <td>
                                                    {value.quantity}
                                                </td>
                                                <td>
                                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                                </td>
                                                <td>
                                                    {value.quantity * value.price}
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>


                </div>
                <div>
                    <h2>
                        Tổng tiền: <span class="span_sum">{total}</span>
                    </h2>
                    <form onSubmit={(event) => handleSupmit(event, total)} method="POST">

                        <div class="row align-items-center mt-4">
                            <div class="col">
                                Tên người nhận<input type="text" class="form-control" value={`${customer.name}`} placeholder="Tên người nhận" onChange={handleInput} name="name" />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                Địa chỉ người nhận<input type="text" class="form-control" value={`${customer.address}`} placeholder="Địa chỉ người nhận" onChange={handleInput} name="address" />
                            </div>
                        </div>
                        <div class="row align-items-center mt-4">
                            <div class="col">
                                Số điện thoại<input type="text" class="form-control" value={`${customer.phone}`} placeholder="Số điện thoại người nhận" onChange={handleInput} name="phone" />
                            </div>
                        </div>
                        <div class="row justify-content-start mt-4">
                            <div class="col">
                                <button class="btn btn-primary mt-4">Đặt hàng</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}