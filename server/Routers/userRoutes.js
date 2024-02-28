import express from "express";
import {
  getAvatar,
  login,
  signup,
  updateAvatar,
} from "../controllers/userControls.js";
// import upload from "../middleware/multerMiddleware.js";
// import { upload } from "../middleware/multerMiddleware.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/upload-avatar", upload.single("image"), updateAvatar);
router.get("/get-avatar", getAvatar);

export default router;
