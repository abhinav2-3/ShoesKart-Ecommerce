import React from "react";
import { NavLink } from "react-router-dom";
import CartAmountToggle from "../compoenents/CartAmountToggle";
import { useCartContext } from "../context/CartContext";
import FormatPrice from "../compoenents/FormatPrice";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const {
    cart,
    removeProduct,
    decrement,
    increment,
    total_price,
    shipping_fee,
    clearCart,
  } = useCartContext();
  const userId = localStorage.getItem("userId");
  const toastSuccess = () => {
    toast.success("Order Placed Successfully");
    clearCart();
  };
  const placeOrder = () => {
    [...cart].forEach(async (item) => {
      try {
        await axios.post(
          "https://shoes-bond.onrender.com/orders",
          {
            name: item.name,
            imageURL: item.image,
            amount: item.amount,
            price: item.price * item.amount,
            userId,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } catch (err) {
        if (!err?.response) {
          toast("No Server Response", {
            duration: 2000,
          });
        } else if (err.response?.status === 409) {
          toast.error("Already Registered with this Email");
        } else {
          toast("Login Failed\n\nTry After Sometime", {
            duration: 2000,
          });
        }
      }
    });
    toast.success("aas;ldf", { duration: "10s" });
  };
  if (cart.length > 0) {
    return (
      <section className="cart">
        <Toaster />
        <div className="table">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>SubTotal</p>
          <p>Remove</p>
        </div>
        <hr />
        <section className="productDetail">
          {cart.map((currElem) => {
            return (
              <div key={currElem.id}>
                <div className="prod_data">
                  <img src={currElem.image} alt={currElem.name} />
                  <aside>
                    <span>{currElem.name}</span>
                  </aside>
                </div>
                <p className="price">
                  <FormatPrice price={currElem.price} />
                </p>
                <div className="cartToggle">
                  <CartAmountToggle
                    amount={currElem.amount}
                    increment={() => increment(currElem.id)}
                    decrement={() => decrement(currElem.id)}
                  />
                </div>
                <p className="price subtotal">
                  <FormatPrice price={currElem.price * currElem.amount} />
                </p>
                <p className="button">
                  <MdDelete onClick={() => removeProduct(currElem.id)} />
                </p>
              </div>
            );
          })}
          <hr />
          <div className="two-btns">
            <NavLink to={"/products"}>
              <button className="btn">Continue Shopping</button>
            </NavLink>
            <button
              className="btn"
              onClick={() => {
                placeOrder(cart);
                toastSuccess();
              }}
            >
              Place Order
            </button>
          </div>
          <div className="total">
            <p>
              SubTotal :
              <span>
                <FormatPrice price={total_price} />
              </span>
            </p>
            <p>
              Shipping Charge :{" "}
              <span>
                {total_price > 600000 ? (
                  0
                ) : (
                  <FormatPrice price={shipping_fee} />
                )}
              </span>
            </p>
            <hr />
            <p>
              Total :{" "}
              <span>
                <FormatPrice price={total_price} />
              </span>
            </p>
          </div>
        </section>
      </section>
    );
  } else {
    return (
      <div className="noData">
        <h3>Cart is Empty!!</h3>
      </div>
    );
  }
};

export default Cart;
