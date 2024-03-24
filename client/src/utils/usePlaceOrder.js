import { useCartContext } from "../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  API_CHEKOUT_ORDER,
  API_GET_KEY,
  API_SET_ORDER,
  API_VALIDATE,
  LOGO,
} from "./APIs";

const usePlaceOrder = (cart) => {
  const { clearCart, total_price } = useCartContext();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const authUser = localStorage.getItem("authUser");
    setUser(JSON.parse(authUser));
  }, []);

  const placeOrder = async () => {
    try {
      await Promise.all(
        cart.map(async (item) => {
          await axios.post(API_SET_ORDER, {
            name: item.name,
            imageURL: item.image,
            amount: item.amount,
            price: item.price * item.amount,
            userId: user._id,
          });
        })
      );
      clearCart();
      navigate("/myOrders", { replace: true });
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order");
    }
  };

  const checkout = async () => {
    try {
      const {
        data: { key },
      } = await axios.get(API_GET_KEY);

      const response = await axios.post(API_CHEKOUT_ORDER, {
        total_price,
      });

      // Razorpay Configurations

      const options = {
        key,
        amount: response.data.order.amount,
        currency: "INR",
        name: `${user.name.split(" ")[0]}'s Cart`,
        description: `${
          user.name.split(" ")[0]
        }'s Transaction is under Processing...`,
        image: LOGO,
        order_id: response.data.order.id,
        handler: async function (response) {
          const body = { ...response };
          const validateRes = await axios.post(API_VALIDATE, body);
          if (validateRes) {
            await placeOrder(cart);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.number,
        },
        notes: {
          address: user.address,
        },
        theme: {
          color: "#d90429",
        },
      };

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        toast.error("Payment Failed");
        console.log(response);
      });
      razor.open();

      toast.success("Order is processing...");
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout");
    }
  };
  return checkout;
};

export default usePlaceOrder;
