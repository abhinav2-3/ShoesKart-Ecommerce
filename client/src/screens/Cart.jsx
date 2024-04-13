import { NavLink } from "react-router-dom";
import CartAmountToggle from "../components/CartAmountToggle";
import { useCartContext } from "../context/CartContext";
import FormatPrice from "../components/FormatPrice";
import { MdDelete } from "react-icons/md";
import { Toaster } from "react-hot-toast";
import usePlaceOrder from "../utils/usePlaceOrder";

const Cart = () => {
  const {
    cart,
    removeProduct,
    decrement,
    increment,
    total_price,
    shipping_fee,
  } = useCartContext();

  const checkout = usePlaceOrder(cart);

  return (
    <section className="cart">
      <Toaster />
      {cart.length > 0 ? (
        <>
          <div className="table">
            <p>Item</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>SubTotal</p>
            <p>Remove</p>
          </div>
          <hr />
          <section className="productDetail">
            {cart.map((item) => (
              <div key={item.id}>
                <div className="prod_data">
                  <img src={item.image} alt={item.name} />
                  <aside>
                    <span>{item.name}</span>
                  </aside>
                </div>
                <p className="price">
                  <FormatPrice price={item.price} />
                </p>
                <div className="cartToggle">
                  <CartAmountToggle
                    amount={item.amount}
                    increment={() => increment(item.id)}
                    decrement={() => decrement(item.id)}
                  />
                </div>
                <p className="price subtotal">
                  <FormatPrice price={item.price * item.amount} />
                </p>
                <p className="button">
                  <MdDelete onClick={() => removeProduct(item.id)} />
                </p>
              </div>
            ))}
            <hr />
            <div className="two-btns">
              <NavLink to={"/products"}>
                <button className="btn">Continue Shopping</button>
              </NavLink>
              <button className="btn" onClick={checkout}>
                Place Order
              </button>
            </div>
            <div className="total">
              <p>
                SubTotal :{" "}
                <span>
                  <FormatPrice price={total_price} />
                </span>
              </p>
              <p>
                Shipping Charge :{" "}
                <span>
                  {total_price > 600000 ? (
                    0
                  ) : (
                    <FormatPrice price={shipping_fee} />
                  )}
                </span>
              </p>
              <hr />
              <p>
                Total :{" "}
                <span>
                  <FormatPrice price={total_price} />
                </span>
              </p>
            </div>
          </section>
        </>
      ) : (
        <div className="noData">
          <h3>Cart is Empty!!</h3>
        </div>
      )}
    </section>
  );
};

export default Cart;
