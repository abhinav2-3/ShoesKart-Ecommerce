import { useNavigate } from "react-router-dom";
import FormatPrice from "./FormatPrice";

const Product = (item) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    const productName = encodeURIComponent(item.name);
    navigate(`/singleProduct?productname=${productName}`, {
      state: item,
    });
  };

  const { name, image, price, category } = item;
  const firstImageUrl =
    Array.isArray(image) && image.length > 0 ? image[0] : null;

  return (
    <div onClick={handleNavigate} className="navProduct" state={item}>
      <figure>
        <img src={firstImageUrl} alt={name} />
        <figcaption>{category}</figcaption>
      </figure>
      <div>
        <h3>{name}</h3>
        <p>
          <FormatPrice price={price} />
        </p>
      </div>
    </div>
  );
};

export default Product;
