import express from "express";
import dotenv from "dotenv";
import { database } from "./Database.js";
import router from "./Routers/userRoutes.js";
import dataRoutes from "./Routers/dataRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", router);
app.use("/", dataRoutes);

database();

app.get("/", (req, res) => {
  res.send("Hello, Abhinav!");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
