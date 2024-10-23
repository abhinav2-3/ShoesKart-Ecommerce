/* eslint-disable react/prop-types */
import { useState } from "react";
import CartAmountToggle from "./CartAmountToggle";
import { useCartContext } from "../context/CartContext";
import { Toaster } from "react-hot-toast";

const AddToCart = ({ product }) => {
  const id = product._id;
  const countInStock = product.countInStock;

  const [amount, setAmount] = useState(1);

  const decrement = () => {
    amount > 1 ? setAmount(amount - 1) : setAmount(1);
  };

  const increment = () => {
    amount < countInStock ? setAmount(amount + 1) : setAmount(countInStock);
  };

  const { addToCart } = useCartContext();

  return (
    <>
      <Toaster />
      <CartAmountToggle
        amount={amount}
        increment={increment}
        decrement={decrement}
      />
      <button className="btn" onClick={() => addToCart(id, amount, product)}>
        Add To Cart
      </button>
    </>
  );
};

export default AddToCart;
