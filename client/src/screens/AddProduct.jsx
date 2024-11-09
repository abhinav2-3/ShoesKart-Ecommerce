import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { API_ADD_SHOES, API_GET_PRODUCTS } from "../utils/APIs";
import { useProductContext } from "../context/ProductContext";

const AddProduct = () => {
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    image: ["", "", "", ""],
    countInStock: 8,
    rating: 3.6,
    reviews: 49,
    price: 0,
  });
  const { getProducts } = useProductContext();
  const inputHandleChange = (e, index) => {
    const { name, value } = e.target;
    if (name === "image") {
      setProductDetails((prevData) => ({
        ...prevData,
        image: [
          ...prevData.image.slice(0, index),
          value,
          ...prevData.image.slice(index + 1),
        ],
      }));
    } else {
      setProductDetails((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const submitHandler = async () => {
    try {
      const response = await axios.post(API_ADD_SHOES, productDetails);
      if (response.status === 201) {
        toast.success("Shoe Added");
        setProductDetails({
          name: "",
          description: "",
          brand: "",
          category: "",
          image: ["", "", "", ""],
          countInStock: 1,
          rating: 0,
          reviews: 0,
          price: 0,
        });
        await getProducts(API_GET_PRODUCTS);
      }
    } catch (error) {
      toast.error("Error while Adding the Shoe");
      console.log("error", error);
    }
  };

  return (
    <div className="admin">
      <h2>Add New Shoe</h2>
      <div>
        <ul>
          <label>Name : </label>
          <label>Description : </label>
          <label>Brand : </label>
          <label>Category : </label>
          <label>Images : </label>
          <label>Stocks : </label>
          <label>Ratings : </label>
          <label>Reviews : </label>
          <label>Price : </label>
        </ul>
        <ul>
          <input
            onChange={(e) => inputHandleChange(e)}
            type="text"
            placeholder="Product Name"
            name="name"
            value={productDetails.name}
          />
          <input
            onChange={(e) => inputHandleChange(e)}
            type="text"
            placeholder="Product Details"
            name="description"
            value={productDetails.description}
          />
          <input
            onChange={(e) => inputHandleChange(e)}
            type="text"
            placeholder="Brand Name"
            name="brand"
            value={productDetails.brand}
          />
          <input
            onChange={(e) => inputHandleChange(e)}
            type="text"
            placeholder="Category Name"
            name="category"
            value={productDetails.category}
          />
          {productDetails.image.map((_, index) => (
            <input
              key={index}
              onChange={(e) => inputHandleChange(e, index)}
              type="text"
              placeholder={`Image ${index + 1} url`}
              name="image"
            />
          ))}
          <input
            onChange={(e) => inputHandleChange(e)}
            type="number"
            placeholder="3"
            name="countInStock"
            value={productDetails.countInStock}
          />
          <input
            onChange={(e) => inputHandleChange(e)}
            type="number"
            placeholder="3 out of 5"
            name="rating"
            value={productDetails.rating}
          />
          <input
            onChange={(e) => inputHandleChange(e)}
            type="number"
            placeholder="13"
            name="reviews"
            value={productDetails.reviews}
          />
          <input
            onChange={(e) => inputHandleChange(e)}
            type="number"
            placeholder="499"
            name="price"
            value={productDetails.price}
          />
        </ul>
      </div>
      <button className="btn" type="submit" onClick={submitHandler}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
