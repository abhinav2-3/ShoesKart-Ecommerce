import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const auth = localStorage.getItem("authToken");
  const location = useLocation();
  const logoutHandler = () => {
    localStorage.clear();
  };
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const { cart } = useCartContext();
  return (
    <nav>
      <h1>
        <NavLink to={"/"}>ShoesKart.</NavLink>
      </h1>
      <div className={menu === true ? "phoneNav" : "mainNav"}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        <NavLink to={"/products"}>Products</NavLink>
        {auth ? (
          <>
            <NavLink to={"/contact"}>Contact</NavLink>
            <NavLink to={"/myOrders"}>My Orders</NavLink>
            <NavLink to={"/cart"}>
              <FaShoppingCart />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
            </NavLink>
            <NavLink to={"/"} className="btn" onClick={logoutHandler}>
              Log Out
            </NavLink>
          </>
        ) : isLoginPage ? (
          <NavLink to={"/signup"} className="btn">
            Sign Up
          </NavLink>
        ) : isSignupPage ? (
          <NavLink to={"/login"} className="btn">
            Log In
          </NavLink>
        ) : (
          <>
            <NavLink to={"/login"} className="btn">
              Log In
            </NavLink>
            <NavLink to={"/signup"} className="btn">
              Sign Up
            </NavLink>
          </>
        )}
      </div>
      <div className="menu-btn" onClick={() => setMenu(!menu)}>
        {menu === true ? <IoClose /> : <GiHamburgerMenu />}
      </div>
    </nav>
  );
};

export default Header;
