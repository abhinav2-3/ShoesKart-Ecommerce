import { useFilterContext } from "../context/FilterContext";
import Product from "./Product";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { filter_Products, page } = useFilterContext();
  const { isLoading } = useProductContext();

  if (!isLoading && filter_Products.length === 0) {
    return <div className="productList">No Shoes Aviablable</div>;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="productList">
        {filter_Products.slice(page * 9 - 9, page * 9).map((item) => {
          return <Product key={item._id} {...item} />;
        })}
      </div>
      <Pagination page={page} productsLength={filter_Products?.length} />
    </>
  );
};

export default ProductList;
