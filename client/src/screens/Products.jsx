import React from "react";
import Filter from "../compoenents/Filter";
import ProductList from "../compoenents/ProductList";
import Sort from "../compoenents/Sort";

const Products = () => {
  return (
    <section className="products">
      <Filter />
      <div className="container">
        <aside className="top-bar">
          <Sort />
        </aside>
        <aside className="main">
          <ProductList />
        </aside>
      </div>
    </section>
  );
};

export default Products;
