import Order from "../models/ordersModel.js";
import { instance } from "../utils/razorpay.js";
import crypto from "crypto";

export const createOrders = async (req, res) => {
  try {
    const { imageURL, name, amount, price, userId } = req.body;

    const order = new Order({
      imageURL,
      name,
      amount,
      price,
      userId,
    });
    await order.save();
    return res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const getOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await Order.find({ userId });
    let sortedData;
    orders.length > 0
      ? (sortedData = orders.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        ))
      : (sortedData = []);

    return res.json(sortedData);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

export const clearOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const deletedOrders = await Order.deleteMany({ userId });

    if (deletedOrders.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "Order history cleared successfully" });
    } else {
      return res
        .status(404)
        .json({ message: "No orders found for the given user" });
    }
  } catch (error) {
    console.error("Error clearing orders:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export const checkout = async (req, res) => {
  const { total_price } = req.body;
  try {
    const options = {
      amount: Number(total_price),
      currency: "INR",
      receipt: "order_rcptid_11",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const validate = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");

    const isAuthenticate = expectedSignature === razorpay_signature;

    if (isAuthenticate) {
      return res
        .status(200)
        .json({ redirect: "http://localhost:5173/myOrders" });
    } else {
      return res.status(401).json({ error: "Payment information is invalid" });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

export const getKey = (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY });
};
