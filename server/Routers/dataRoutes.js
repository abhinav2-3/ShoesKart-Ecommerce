import express from "express";
import { shoesList } from "../controllers/dataControl.js";
import {
  checkout,
  clearOrders,
  createOrders,
  getKey,
  getOrders,
  validate,
} from "../controllers/orderControl.js";

const dataRoutes = express.Router();

dataRoutes.get("/api_items", shoesList);
dataRoutes.post("/orders", createOrders);
dataRoutes.post("/getOrders", getOrders);
dataRoutes.post("/clearOrders", clearOrders);
dataRoutes.post("/checkout", checkout);
dataRoutes.post("/validate", validate);
dataRoutes.get("/getkey", getKey);

export default dataRoutes;
