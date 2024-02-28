import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema({
  avatarName: {
    type: String,
  },
});

export default mongoose.model("Avatar", avatarSchema);
