import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import OverView from './Component/OverView';
import Login from './Component/Auth/Login'
import Register from './Component/Auth/Register'
import ShoppingCart from './Component/Carts/ShoppingCart';
import ProductDetail from './Component/Carts/ProductDetail';
import Shop from './Component/Carts/Shop';
import { BlogDetail } from './Component/Blogs/BlogDetail';
import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/overview" element={<OverView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/product-detail/:productId" element={<ProductDetail />} />
        <Route path="/shop" element={<Shop />} />

        <Route path="/blogs/info/:blogId" element={<BlogDetail />} />

      </Routes>
    </div>
  );
}

export default App;
