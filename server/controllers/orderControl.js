import Order from "../models/ordersModel.js";

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
    const orders = await Order.find({ userId });
    await Order.deleteMany({ userId });
    const delOrders = await Order.find({ userId });

    return res.json(delOrders);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};
