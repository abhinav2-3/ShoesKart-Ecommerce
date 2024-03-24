import "./styles/App.scss";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Header from "./compoenents/Header";
import Footer from "./compoenents/Footer";
import About from "./screens/About";
import SingleProduct from "./screens/SingleProduct";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import Products from "./screens/Products";
import Cart from "./screens/Cart";
import ErrorPage from "./compoenents/ErrorPage";
import Contacts from "./screens/Contacts";
import MyOrder from "./screens/MyOrder";
import UserProfile from "./screens/UserProfile";
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
