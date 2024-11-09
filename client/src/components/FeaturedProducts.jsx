import { useProductContext } from "../context/ProductContext";
import Product from "./Product";
import Loader from "./Loader";

const FeaturedProducts = () => {
  const { isLoading, featureProducts } = useProductContext();

  return (
    <section className="featureProducts">
      <span>Check Now</span>
      <h3>Our Featured Products</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {featureProducts.map((item) => {
            return <Product key={item._id} {...item} />;
          })}
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;
