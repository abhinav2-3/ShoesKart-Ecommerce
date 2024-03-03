import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Avatar from "../models/avatarModel.js";

export const signup = async (req, res) => {
  const { name, email, number, address, password } = req.body;

  if (!name || !email || !password || !address || !number) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(409).json({ error: "User Already Exist" });

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      address,
      number,
    });

    const authToken = jwt.sign({ userId: user.id },thisisecommercewebsite);

    return res.status(201).json({ success: true, authToken, user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser)
      return res.status(400).json({ error: "User Does Not Exist" });

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch)
      return res.status(401).json({ error: "Password is Incorrect" });

    const authToken = jwt.sign(
      { userId: existingUser.id },
      thisisecommercewebsite
    );
    return res.status(201).json({ success: true, authToken, existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateAvatar = async (req, res) => {
  const avatarName = req.file.filename;
  const { username } = req.body;

  try {
    await Avatar.create({ avatarName, username });
    return res.status(201).json({ success: true, message: "uploaded" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAvatar = async (req, res) => {
  try {
    const image = await Avatar.find({});
    if (!image) {
      console.log("Image not found");
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    return res.status(201).json({ success: true, image });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
