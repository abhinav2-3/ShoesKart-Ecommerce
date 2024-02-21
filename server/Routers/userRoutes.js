import express from "express";
import { login, signup } from "../controllers/userControls.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.post("/signup", upload.single("image"), signup);
router.post("/login", login);

export default router;
