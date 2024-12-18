import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import { API_SIGNUP } from "../utils/APIs";

const Signup = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const response = await axios.post(API_SIGNUP, signupData);

      if (response.data.success) {
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
        setLoading(false);
        navigate("/");
      } else {
        toast.error("Signup failed");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error:", err);

      if (err.response) {
        console.error("Response status:", err.response.status);

        if (err.response.status === 409) {
          toast.error("User already exists");
        } else if (err.response.status === 400) {
          toast.error("Missing required fields");
        } else {
          toast.error("An error occurred");
        }
      } else {
        toast.error("No server response");
      }
    }
  };

  return (
    <div className="profile">
      <Toaster />
      <h1>Sign Up</h1>
      <form>
        <aside>
          <div>
            <label>Your Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={signupData.name}
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example23@emailcom"
              value={signupData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Number</label>
            <input
              type="number"
              name="number"
              placeholder="11122230"
              value={signupData.number}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Your Full Address"
              value={signupData.address}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={signupData.password}
              onChange={handleChange}
            />
          </div>
          {loading ? (
            <button type="button" className="btn" disabled={loading}>
              Loading...
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              onClick={handleSignUp}
              disabled={loading}
            >
              Signup
            </button>
          )}
        </aside>

        <figure>
          <FaCircleUser />
          <input
            type="file"
            accept="image/*"
            name="image"
            style={{ pointerEvents: "none" }}
          />
          <button
            type="button"
            className="btn"
            style={{ pointerEvents: "none" }}
          >
            Upload Image
          </button>
        </figure>
      </form>
      <div>
        <span>
          If already Exist !! <NavLink to={"/login"}>Login</NavLink>
        </span>
      </div>
    </div>
  );
};

export default Signup;
