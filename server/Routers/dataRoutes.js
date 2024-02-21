import express from "express";
import { shoesList } from "../controllers/dataControl.js";
import {
  clearOrders,
  createOrders,
  getOrders,
} from "../controllers/orderControl.js";

const dataRoutes = express.Router();

dataRoutes.get("/api_items", shoesList);
dataRoutes.post("/orders", createOrders);
dataRoutes.post("/getOrders", getOrders);
dataRoutes.post("/clearOrders", clearOrders);

export default dataRoutes;
