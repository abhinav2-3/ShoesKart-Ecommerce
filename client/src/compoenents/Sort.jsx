import React from "react";
import { useFilterContext } from "../context/FilterContext";

const Sort = () => {
  const { filter_Products, sorting } = useFilterContext();
  return (
    <div className="sorting">
      <span>{filter_Products.length} Total Products</span>
      <form>
        <select name="sort" onClick={sorting}>
          <option value="lowToHigh">Low To High</option>
          <option value="highToLow">High To Low</option>
          <option value="a-z">Price (a-z)</option>
          <option value="z-a">Price (z-a)</option>
        </select>
      </form>
    </div>
  );
};

export default Sort;
