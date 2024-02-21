import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="signup">
      <Toaster />
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={loginData.email}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
        />
        <div>
          Are You a New User !! <NavLink to={"/signup"}> Sign Up </NavLink>{" "}
        </div>
        <button type="button" className="btn" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
