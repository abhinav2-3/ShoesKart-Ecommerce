import "./styles/App.scss";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Users/Home";
import Header from "./compoenents/Header";
import Footer from "./compoenents/Footer";
import About from "./screens/Users/About";
import SingleProduct from "./screens/Users/SingleProduct";
import Signup from "./screens/Users/Signup";
import Login from "./screens/Users/Login";
import Products from "./screens/Users/Products";
import Cart from "./screens/Users/Cart";
import ErrorPage from "./compoenents/ErrorPage";
import Contacts from "./screens/Users/Contacts";
import MyOrder from "./screens/Users/MyOrder";
import UserProfile from "./screens/Users/UserProfile";
import { Toaster, toast } from "react-hot-toast";

function App() {
  const notify = () =>
    toast.loading(
      "Please wait a moment while we fetch the data from server. Thank you for your patience.",
      { duration: 5000 }
    );

  useEffect(() => {
    notify();
  }, []);

  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/myOrders" element={<MyOrder />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/singleProduct" element={<SingleProduct />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
