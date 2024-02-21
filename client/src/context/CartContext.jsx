import React, { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";
import toast from "react-hot-toast";

const CartContext = createContext();

const initialState = {
  cart: [],
  total_items: 0,
  shipping_fee: 25000,
  total_price: "",
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, amount, product) => {
    toast.success("Item Added in Your Cart");
    return dispatch({ type: "ADD_TO_CART", payload: { id, amount, product } });
  };

  const increment = (id) => {
    return dispatch({ type: "SET_INCREMENT", payload: id });
  };
  const decrement = (id) => {
    return dispatch({ type: "SET_DECREMENT", payload: id });
  };

  const removeProduct = (id) => {
    return dispatch({ type: "REMOVE_PRODUCT", payload: id });
  };

  const placeOrder = (cart) => {
    console.log(cart);
    return dispatch({ type: "PLACE_ORDER", payload: cart });
  };
  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };
  useEffect(() => {
    localStorage.setItem("Shoeskart", JSON.stringify(state.cart));
    dispatch({ type: "SET_TOTAL_PRICE" });
  }, [state.cart]);
  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        increment,
        decrement,
        removeProduct,
        placeOrder,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext, CartContext };
