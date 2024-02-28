import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    //Upload image on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });
    //File Uploaded Successfully
    console.log(response.url);
    return response.url;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};
