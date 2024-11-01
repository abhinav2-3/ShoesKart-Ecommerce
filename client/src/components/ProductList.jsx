import { useState } from "react";
import { useFilterContext } from "../context/FilterContext";
import Product from "./Product";
import Loader from "./Loader";
import Pagination from "./Pagination";
import { useProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { filter_Products } = useFilterContext();
  const { isLoading } = useProductContext();
  const [page, setPage] = useState(1);

  if (!isLoading && filter_Products.length === 0) {
    return <div className="productList">No Shoes Aviablable</div>;
  }

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <div className="productList">
        {filter_Products.slice(page * 9 - 9, page * 9).map((item) => {
          return <Product key={item.id} {...item} />;
        })}
      </div>
      <Pagination page={page} setPage={setPage} products={filter_Products} />
    </>
  );
};

export default ProductList;
