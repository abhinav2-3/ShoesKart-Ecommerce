import express from "express";
import {
  getAvatar,
  login,
  signup,
  updateAvatar,
} from "../controllers/userControls.js";
import { upload } from "../middleware/multerMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/upload-avatar", upload.single("image"), updateAvatar);
router.get("/get-avatar", getAvatar);

export default router;
