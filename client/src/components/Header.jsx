import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import Dropdown from "./Dropdown";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const auth = localStorage.getItem("authToken");
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const { cart } = useCartContext();

  const toggleDropdown = () => {
    setMenu(false);
  };

  return (
    <nav>
      <NavLink to={"/"} onClick={toggleDropdown}>
        ShoesKart.
      </NavLink>

      <div className={menu ? "phoneNav" : "mainNav"} onClick={toggleDropdown}>
        <NavLink to={"/"}>Home</NavLink>
        <NavLink to={"/products"}>Products</NavLink>
        <NavLink to={"/about"}>About</NavLink>
        {auth ? (
          <>
            <NavLink to={"/contact"}>Contact</NavLink>
            <Dropdown />
            <NavLink to={"/cart"}>
              <FaShoppingCart />
              {cart.length > 0 && <span className="badge">{cart.length}</span>}
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
