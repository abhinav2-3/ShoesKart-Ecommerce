import React from "react";
import { useProductContext } from "../context/ProductContext";
import Product from "./Product";
import Loader from "./Loader";

const FeaturedProducts = () => {
  const { isLoading, featureProducts } = useProductContext();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="featureProducts">
      <span>Check Now</span>
      <h3>Our Featured Products</h3>
      <div>
        {featureProducts.map((item) => {
          return <Product key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default FeaturedProducts;
