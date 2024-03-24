import React, { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import { API_UPLOAD_AVATAR } from "../utils/APIs";

const UserProfile = () => {
  let authUser = localStorage.getItem("authUser");
  let username = JSON.parse(authUser);

  const [image, setImage] = useState(null);
  // const [allImage, setAllImage] = useState(null);

  const handleFileChanges = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("username", username);

      const response = await axios.post(API_UPLOAD_AVATAR, formData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // const getAvatar = async () => {
  //   try {
  //     const response = await axios.get("https://shoes-bond.onrender.com//get-avatar", {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     setAllImage(response.data.image);
  //     console.log(allImage);
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <form>
        <aside>
          <div>
            <label>Your Name</label>
            <input type="text" name="name" />
          </div>

          <div>
            <label>Email</label>
            <input type="email" name="email" placeholder="example23@emailcom" />
          </div>

          <div>
            <label>Number</label>
            <input type="number" name="number" placeholder="1112223330" />
          </div>

          <div>
            <label>Address</label>
            <input type="text" name="address" placeholder="Your Full Address" />
          </div>

          <div>
            <label>Password</label>
            <input type="password" />
          </div>
          <button
            type="button"
            className="btn"
            style={{ pointerEvents: "none", filter: "grayscale(1)" }}
          >
            Update Changes
          </button>
        </aside>
        <figure>
          <FaCircleUser />
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={handleFileChanges}
            style={{ pointerEvents: "none" }}
          />
          <button
            type="button"
            className="btn"
            onClick={handleUpload}
            style={{ pointerEvents: "none", filter: "grayscale(1)" }}
          >
            Upload Image
          </button>
        </figure>
      </form>
    </div>
  );
};

export default UserProfile;
