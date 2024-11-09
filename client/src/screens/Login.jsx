import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { API_LOGIN } from "../utils/APIs";
const Login = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const auth = localStorage.getItem("authToken");
    if (auth) navigate("/");
  });

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "guestuser@gmail.com",
    password: "1111",
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
      setLoading(true);
      const response = await axios.post(API_LOGIN, loginData);
      if (response.status === 201) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem(
          "authUser",
          JSON.stringify(response.data.existingUser)
        );
        localStorage.setItem("userId", response.data.existingUser._id);
        navigate("/");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
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
              // defaultValue={"abhinav"}
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
        {loading ? (
          <button type="button" className="btn" disabled={loading}>
            Loading...
          </button>
        ) : (
          <button
            type="button"
            className="btn"
            onClick={handleLogin}
            disabled={loading}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
