import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";

import "../public/Cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <h1>Your Cart</h1>

        <p>Your cart is empty.</p>

        <button
          className="checkout-button"
          onClick={() => navigate("/products")}
        >
          Continue Shopping
        </button>
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
                <button
                  onClick={() => dispatch(decreaseQuantity(item._id))}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => dispatch(increaseQuantity(item._id))}
                  disabled={
                    item.stock !== undefined &&
                    item.quantity >= item.stock
                  }
                  title={
                    item.stock !== undefined &&
                    item.quantity >= item.stock
                      ? "Maximum stock limit reached"
                      : ""
                  }
                >
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

          <p>Total Products: {cartItems.length}</p>

          <p>Total Quantity: {totalQuantity}</p>

          <h3>Total: ₹{totalAmount}</h3>

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;