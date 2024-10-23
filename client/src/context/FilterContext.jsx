import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/filterReducer";
import { useProductContext } from "./ProductContext";

const FilterContext = createContext();

const initialState = {
  filter_Products: [],
  all_Products: [],
  gridview: true,
  sorting_value: "lowToHigh",
  filters: {
    text: "",
    category: "All",
    company: "All",
    maxPrice: 0,
    price: 0,
    minPrice: 0,
  },
};

// eslint-disable-next-line react/prop-types
const FilterProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    return dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
    dispatch({ type: "SORT_PRODUCTS" });
  }, [products, state.sorting_value, state.filters]);

  const sorting = (e) => {
    return dispatch({ type: "GET_SORT_VALUE", payload: e.target.value });
  };

  const updateFilterValue = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    return dispatch({ type: "UPDATE_FILTER_VALUE", payload: { name, value } });
  };

  const clearFilter = () => {
    return dispatch({ type: "CLEAR_FILTER" });
  };

  return (
    <FilterContext.Provider
      value={{ ...state, sorting, updateFilterValue, clearFilter }}
    >
      {children}
    </FilterContext.Provider>
  );
};

const useFilterContext = () => {
  return useContext(FilterContext);
};

export { FilterProvider, FilterContext, useFilterContext };
