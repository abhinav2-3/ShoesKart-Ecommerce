import Filter from "../components/Filter";
import ProductList from "../components/ProductList";
import Sort from "../components/Sort";

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
