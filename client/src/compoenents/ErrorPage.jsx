import React from "react";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="errorpg">
      <h1>404</h1>
      <p>UH OH! You&apos;re lost</p>
      <span>
        The page you are looking for does not exist. How you got here is a
        mystery. But you can click the button below to go back to the homepage.
      </span>
      <NavLink to={"/"}>
        <button className="btn">home</button>
      </NavLink>
    </div>
  );
};

export default ErrorPage;
