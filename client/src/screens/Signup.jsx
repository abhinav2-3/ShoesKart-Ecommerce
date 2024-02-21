import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const Signup = () => {
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) navigate("/");
  });

  const navigate = useNavigate();
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        "https://shoes-bond.onrender.com/signup",
        signupData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
        localStorage.setItem("userId", response.data.existingUser._id);
        navigate("/");
      }
    } catch (err) {
      if (!err?.response) {
        toast("No Server Response", {
          duration: 2000,
        });
      } else if (err.response?.status === 409) {
        toast.error("Already Registered with this Email");
      } else {
        toast.error("Login Failed\n\nTry After Sometime", {
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="signup">
      <Toaster />
      <h2>Sign Up</h2>
      <form>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          placeholder="FullName"
          value={signupData.name}
          onChange={handleChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          placeholder="example23@emailcom"
          value={signupData.email}
          onChange={handleChange}
        />

        <label>Number:</label>
        <input
          type="number"
          name="number"
          placeholder="1112223330"
          value={signupData.number}
          onChange={handleChange}
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          placeholder="Your Full Address"
          value={signupData.address}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={signupData.password}
          onChange={handleChange}
        />
        <div>
          If Already Exist !! <NavLink to={"/login"}> Login</NavLink>
        </div>
        <aside>
          <input
            type="file"
            accept="image/*"
            name="image"
            value={signupData.image}
            onChange={handleChange}
          />
        </aside>
        <button type="button" className="btn" onClick={handleSignUp}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
