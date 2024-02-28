import React from "react";
import Herosection from "../../compoenents/Herosection";
import Companies from "../../compoenents/Companies";
import Services from "../../compoenents/Services";
import FeaturedProducts from "../../compoenents/FeaturedProducts";

const Home = () => {
  const data = {
    name: "ShoesKart",
  };

  return (
    <section className="home">
      <Herosection myData={data} />
      <FeaturedProducts />
      <Services />
      <Companies />
    </section>
  );
};

export default Home;
