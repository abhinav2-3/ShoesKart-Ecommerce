import mongoose from "mongoose";

export const database = () => {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: "Shoes-Bond" })
    .then(async () => {
      console.log("DB is connected");
      const shoes = await mongoose.connection.db
        .collection("shoes_list")
        .find()
        .toArray();
      global.shoesData = shoes;
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};
