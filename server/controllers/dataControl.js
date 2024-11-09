import shoes_list from "../models/shoesModel.js";

export const shoesList = async (req, res) => {
  try {
    const shoesData = await shoes_list.find({});
    return res.status(200).json({ success: true, shoesData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

function capitalizeFirstLetter(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export const addShoe = async (req, res) => {
  const {
    name,
    description,
    brand,
    category,
    image,
    countInStock,
    rating,
    reviews,
    price,
  } = req.body;
  try {
    const shoe = new shoes_list({
      name,
      description,
      brand: capitalizeFirstLetter(brand),
      category: capitalizeFirstLetter(category),
      image,
      countInStock,
      rating,
      reviews,
      price: price * 100,
    });
    await shoe.save();
    return res.status(201).json({ success: true, message: "Product is Added" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
