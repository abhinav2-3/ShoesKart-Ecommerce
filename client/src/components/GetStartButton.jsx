import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const GetStartButton = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      const authUser = localStorage.getItem("authUser");
      setUser(authUser);
    }
  }, [user]);

  return (
    <div>
      {user ? (
        <NavLink to={"/products"} className="btn">
          Get Started
        </NavLink>
      ) : (
        <NavLink to={"/login"} className="btn">
          Login
        </NavLink>
      )}
    </div>
  );
};

export default GetStartButton;
