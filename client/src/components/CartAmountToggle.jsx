import React from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
const CartAmountToggle = ({ amount, increment, decrement }) => {
  return (
    <div>
      <div className="qty">
        <button onClick={decrement}>
          <FaMinus />
        </button>{" "}
        <span>{amount}</span>{" "}
        <button onClick={increment}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default CartAmountToggle;
