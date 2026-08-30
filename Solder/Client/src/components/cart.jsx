import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} from "../features/cart/cartSlice";
import { toast } from "react-toastify";

import { checkoutProducts } from "../features/checkout/checkoutSlice";

import "../public/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) navigate("/login");

  const { loading: checkoutLoading, error: checkoutError } = useSelector(
    (state) => state.checkout,
  );

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const handleCheckout = async () => {
    const productIds = cartItems.map((item) => item._id);

    const result = await dispatch(checkoutProducts(productIds));

    if (checkoutProducts.fulfilled.match(result)) {
      toast.success("Order Proceeded to Checkout")
      dispatch(clearCart());
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="cart-item" key={item._id}>
              <img
                src={item.imageUrl || item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-info">
                <h3>{item.title}</h3>

                <p>₹{item.price}</p>
              </div>

              <div className="quantity-controls">
                <button onClick={() => dispatch(decreaseQuantity(item._id))}>
                  -
                </button>

                <span>{item.quantity}</span>

                <button onClick={() => dispatch(increaseQuantity(item._id))}>
                  +
                </button>
              </div>

              <button
                className="remove-button"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <p>Total Items: {cartItems.length}</p>

          <h3>Total: ₹{totalAmount}</h3>

          {checkoutError && <p className="checkout-error">{checkoutError}</p>}

          <button
            className="checkout-button"
            onClick={handleCheckout}
            disabled={checkoutLoading}
          >
            {checkoutLoading ? "Processing..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
