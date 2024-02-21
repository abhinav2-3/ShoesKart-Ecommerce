import React from "react";
import Herosection from "../compoenents/Herosection";

const About = () => {
  const data = {
    name: "ShoesKart Ecommerce",
  };
  return (
    <div className="home">
      <Herosection myData={data} />
    </div>
  );
};

export default About;
