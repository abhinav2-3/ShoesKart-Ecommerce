import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
const Login = () => {
  useEffect(() => {
    const auth = localStorage.getItem("authToken");
    if (auth) navigate("/");
  });

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://shoes-bond.onrender.com/login",
        loginData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem(
          "authUser",
          JSON.stringify(response.data.existingUser)
        );
        localStorage.setItem("userId", response.data.existingUser._id);
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        toast("No Server Response", {
          duration: 2000,
        });
      } else if (err.response?.status === 400) {
        toast.error("Invalid Email");
      } else if (err.response?.status === 401) {
        toast.error("Enter Correct Password");
      } else {
        toast("Login Failed", {
          duration: 2000,
        });
      }
      setLoginData({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="profile login">
      <Toaster />
      <h1>Login</h1>
      <form>
        <aside>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example23@emailcom"
              value={loginData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="xyzabc"
              value={loginData.password}
              onChange={handleChange}
            />
          </div>
        </aside>
        <figure>
          <FaCircleUser />
        </figure>
      </form>
      <div>
        <span>
          If you are New !! <NavLink to={"/signup"}>Signup</NavLink>
        </span>
        <button type="button" className="btn" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
