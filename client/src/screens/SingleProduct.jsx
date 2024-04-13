import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageNavigation from "../components/PageNavigation";
import MyImages from "../components/MyImages";
import FormatPrice from "../components/FormatPrice";
import { TbTruckDelivery, TbReplace } from "react-icons/tb";
import { MdOutlineSecurity } from "react-icons/md";
import Rating from "../components/Rating";
import AddToCart from "../components/AddToCart";

const SingleProduct = () => {
  const { state } = useLocation();
  const productData = state;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);
  const {
    name,
    price,
    description,
    category,
    reviews,
    brand,
    rating,
    countInStock,
    image,
  } = productData;

  if (loading) {
    return (
      <div
        style={{
          width: "100%",
          height: "10vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading.....
      </div>
    );
  }
  return (
    <section className="single_product">
      <PageNavigation title={name} />
      <div className="container">
        <aside className="image_container">
          <MyImages image={image} name={name} />
        </aside>

        <aside className="product_data">
          <h2>{name}</h2>
          <div>
            <Rating stars={rating} reviews={reviews} />
          </div>
          <div className="mrp">
            MRP :
            <del>
              <FormatPrice price={price + 250000} />
            </del>
          </div>
          <span>
            Deal of the Day : <FormatPrice price={price} />
          </span>
          <p>{description}</p>
          <div className="warranty">
            <div>
              <TbTruckDelivery />
              <p>Free Delivery</p>
            </div>
            <div>
              <TbReplace />
              <p>30 Days Replacement</p>
            </div>
            <div>
              <MdOutlineSecurity />
              <p>2 Years Warranty</p>
            </div>
          </div>
          <div className="brand">
            <span>
              Avialable :{" "}
              <span>{countInStock > 0 ? "In Stock" : "Out Of Stock"}</span>
            </span>
            <span>
              Category : <span>{category}</span>
            </span>
            <span>
              Brand : <span>{brand}</span>
            </span>
            <hr />
            {countInStock > 0 ? (
              <AddToCart product={productData} />
            ) : (
              <button className="btn outOfStockBtn">Out of Stock</button>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default SingleProduct;
