import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormatPrice from "../compoenents/FormatPrice";
import FormatDate from "../compoenents/DateFormat";

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const userId = localStorage.getItem("userId");

  const myOrders = async () => {
    try {
      const response = await axios.post(
        "https://shoes-bond.onrender.com/getOrders",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOrderData(response.data);
    } catch (error) {
      if (!error?.response) {
        toast("No Server Response", {
          duration: 2000,
        });
      } else if (error.response?.status === 409) {
        toast.error("Already Registered with this Email");
      } else {
        toast("Login Failed\n\nTry After Sometime", {
          duration: 2000,
        });
      }
    }
  };

  const clearOrderHistory = async () => {
    try {
      const response = await axios.post(
        "https://shoes-bond.onrender.com/clearOrders",
        { userId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setOrderData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  myOrders();

  if (orderData.length === 0 || orderData === "[]") {
    return (
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "grid",
          placeItems: "center",
        }}
      >
        <h2> You Haven't Order Anything Yet !!</h2>
      </div>
    );
  } else {
    return (
      <section className="myOrder">
        <Toaster />
        <h1>My Orders</h1>
        <div className="table">
          <p>Item</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Date</p>
        </div>
        <hr />
        <section className="productDetail">
          {orderData.map((currElem) => {
            return (
              <div key={currElem._id}>
                <div className="prod_data">
                  <img src={currElem.imageURL} alt={currElem.name} />
                  <aside>
                    <span>{currElem.name}</span>
                  </aside>
                </div>
                <p className="price">
                  <FormatPrice price={currElem.price} />
                </p>
                <p className="amount">{currElem.amount}</p>
                <p className="date">
                  <FormatDate dateString={currElem.date.toString()} />
                </p>
              </div>
            );
          })}
        </section>
        {orderData.length > 0 && (
          <button onClick={clearOrderHistory}>Clear Order History</button>
        )}
      </section>
    );
  }
};

export default MyOrder;
