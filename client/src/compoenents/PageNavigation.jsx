import React from "react";
import { NavLink } from "react-router-dom";

const PageNavigation = (props) => {
  return (
    <div className="pageNavigation">
      <NavLink to={"/"}>Home</NavLink>
      <span>/{props.title}</span>
    </div>
  );
};

export default PageNavigation;
