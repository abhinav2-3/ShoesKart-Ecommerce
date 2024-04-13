import React from "react";
import { useFilterContext } from "../context/FilterContext";
import FormatPrice from "./FormatPrice";

const Filter = () => {
  const {
    filters: { text, price, maxPrice, minPrice },
    updateFilterValue,
    all_Products,
    clearFilter,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newVal = data.map((currElem) => {
      return currElem[property];
    });
    return (newVal = ["All", ...new Set(newVal)]);
  };

  const categoryData = getUniqueData(all_Products, "category");
  const brandData = getUniqueData(all_Products, "brand");

  return (
    <section className="filter">
      <input
        type="search"
        name="text"
        value={text}
        onChange={updateFilterValue}
        placeholder="SEARCH"
      />

      <div className="category">
        <h4>Category</h4>
        {categoryData.map((currElem, index) => {
          return (
            <button
              key={index}
              type="button"
              name="category"
              value={currElem}
              onClick={updateFilterValue}
            >
              {currElem}
            </button>
          );
        })}
      </div>

      <div className="company">
        <h4>Company</h4>
        <select name="company" onClick={updateFilterValue}>
          {brandData.map((currElem, index) => {
            return (
              <option value={currElem} name="company" key={index}>
                {currElem}
              </option>
            );
          })}
        </select>
      </div>

      <div className="price">
        <h4>Price</h4>
        <p>
          <FormatPrice price={price} />
        </p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>
      <button className="btn" onClick={clearFilter}>
        Clear Filter
      </button>
    </section>
  );
};

export default Filter;
