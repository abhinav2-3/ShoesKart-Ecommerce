import { useState } from "react";
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import { API_UPLOAD_AVATAR } from "../utils/APIs";

const UserProfile = () => {
  let authUser = localStorage.getItem("authUser");
  let user = JSON.parse(authUser);

  const [image, setImage] = useState(null);
  // const [allImage, setAllImage] = useState(null);

  const handleFileChanges = (e) => {
    setImage(e.target.files[0]);
  };
  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("username", user);

      const response = await axios.post(API_UPLOAD_AVATAR, formData);
      console.log(response);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div className="profile">
      <h1>Your Profile</h1>
      <form>
        <aside>
          <div>
            <label>Your Name</label>
            <input type="text" name="name" value={user?.name} />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="example23@emailcom"
              value={user?.email}
            />
          </div>

          <div>
            <label>Number</label>
            <input
              type="number"
              name="number"
              placeholder="1112223330"
              value={user?.number}
            />
          </div>

          <div>
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Your Full Address"
              value={user?.address}
            />
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
