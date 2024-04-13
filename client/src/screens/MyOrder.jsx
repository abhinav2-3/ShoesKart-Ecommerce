import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import FormatPrice from "../components/FormatPrice";
import FormatDate from "../components/DateFormat";
import { API_CLEAR_ORDERS, API_GET_ORDERS } from "../utils/APIs";

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const authUser = localStorage.getItem("authUser");

  const user = JSON.parse(authUser);
  const userId = user._id;

  useEffect(() => {
    myOrders();
  }, []);

  const myOrders = async () => {
    try {
      const response = await axios.post(API_GET_ORDERS, { userId });
      setOrderData(response.data);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const clearOrderHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.post(API_CLEAR_ORDERS, { userId });
      setOrderData(response.data);
      toast.success("Order History Cleared");
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleApiError = (error) => {
    if (!error?.response) {
      toast("No Server Response", { duration: 2000 });
    } else {
      toast("Server Failed\n\nTry After Sometime", { duration: 2000 });
    }
  };

  return (
    <section className="myOrder">
      <Toaster />
      <h1>My Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : orderData.length === 0 ? (
        <div
          style={{
            width: "100%",
            height: "50vh",
            display: "grid",
            placeItems: "center",
            fontSize: "1.7rem",
          }}
        >
          <h5> You Haven&apos;t Order Anything Yet !!</h5>
        </div>
      ) : (
        <>
          <div className="table">
            <p>Item</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Date</p>
          </div>
          <hr />
          <section className="productDetail">
            {orderData.map((currElem) => (
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
            ))}
          </section>
          <button onClick={clearOrderHistory}>Clear Order History</button>
        </>
      )}
    </section>
  );
};

export default MyOrder;
