import { NavLink } from "react-router-dom";
import CartAmountToggle from "../compoenents/CartAmountToggle";
import { useCartContext } from "../context/CartContext";
import FormatPrice from "../compoenents/FormatPrice";
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
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const authUser = localStorage.getItem("authUser");
  //   setUser(JSON.parse(authUser));
  // }, []);

  // const placeOrder = async () => {
  //   try {
  //     await Promise.all(
  //       cart.map(async (item) => {
  //         await axios.post(API_SET_ORDER, {
  //           name: item.name,
  //           imageURL: item.image,
  //           amount: item.amount,
  //           price: item.price * item.amount,
  //           userId: user._id,
  //         });
  //       })
  //     );
  //     clearCart();
  //     navigate("/myOrders", { replace: true });
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     toast.error("Failed to place order");
  //   }
  // };

  // const checkout = async () => {
  //   try {
  //     const {
  //       data: { key },
  //     } = await axios.get(API_GET_KEY);

  //     const response = await axios.post(API_CHEKOUT_ORDER, {
  //       total_price,
  //     });

  //     // Razorpay Configurations

  //     const options = {
  //       key,
  //       amount: response.data.order.amount,
  //       currency: "INR",
  //       name: `${user.name.split(" ")[0]}'s Cart`,
  //       description: `${
  //         user.name.split(" ")[0]
  //       }'s Transaction is under Processing...`,
  //       image:
  //         "https://as1.ftcdn.net/v2/jpg/03/15/06/10/1000_F_315061039_JPz3A8Yd64Ugsy2T6Ez6E9IPwAhs3ftD.jpg",
  //       order_id: response.data.order.id,
  //       handler: async function (response) {
  //         const body = { ...response };
  //         const validateRes = await axios.post(API_VALIDATE, body);
  //         if (validateRes) {
  //           await placeOrder(cart);
  //         }
  //       },
  //       prefill: {
  //         name: user.name,
  //         email: user.email,
  //         contact: user.number,
  //       },
  //       notes: {
  //         address: user.address,
  //       },
  //       theme: {
  //         color: "#d90429",
  //       },
  //     };

  //     const razor = new window.Razorpay(options);
  //     razor.on("payment.failed", function (response) {
  //       toast.error("Payment Failed");
  //       console.log(response);
  //     });
  //     razor.open();

  //     toast.success("Order is processing...");
  //   } catch (error) {
  //     console.error("Error during checkout:", error);
  //     toast.error("Failed to checkout");
  //   }
  // };

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
