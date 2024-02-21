import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { name, email, number, address, password, image } = req.body;

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
      image,
    });

    const authToken = jwt.sign({ userId: user.id }, process.env.SECRET_KEY);

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
      process.env.SECRET_KEY
    );
    return res.status(201).json({ success: true, authToken, existingUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
