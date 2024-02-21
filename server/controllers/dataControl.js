export const shoesList = async (req, res) => {
  try {
    return res.status(200).send(global.shoesData);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
