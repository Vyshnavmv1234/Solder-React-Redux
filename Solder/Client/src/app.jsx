import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Signup from "./components/signup";
import SellProduct from "./components/sellProduct";
import ProductList from "./components/productList";
import Navbar from "./components/Navbar";
import MyProducts from "./components/myProducts";
import Cart from "./components/cart";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/addProduct" element={<SellProduct />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/myProducts" element={<MyProducts />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </>
  );
};
export default App;
