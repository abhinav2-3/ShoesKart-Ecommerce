/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from "../reducer/productReducer";
import { API_GET_PRODUCTS } from "../utils/APIs";

const AppContext = createContext();

const initialState = {
  isLoading: false,
  isError: false,
  products: [],
  featureProducts: [],
};

// eslint-disable-next-line react/prop-types
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const response = await axios.get(url, {
        headers: {
          "content-type": "application/josn",
        },
      });
      const products = await response?.data?.shoesData;
      dispatch({ type: "SET_API_DATA", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    getProducts(API_GET_PRODUCTS);
  }, []);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
