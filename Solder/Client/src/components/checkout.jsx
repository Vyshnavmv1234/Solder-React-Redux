import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import { checkoutProducts } from "../features/checkout/checkoutSlice";

import { clearCart } from "../features/cart/cartSlice";

import "../public/Checkout.css";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const { loading, success, error } = useSelector((state) => state.checkout);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  if (cartItems.length === 0 && !success) {
    return <Navigate to="/cart" replace />;
  }

  const handleCheckout = async () => {
    const productIds = cartItems.map((item) => item._id);

    try {
      const result = await dispatch(checkoutProducts(productIds));

      if (checkoutProducts.fulfilled.match(result)) {
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  };

  if (success) {
    return (
      <div className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>

          <h1>Order Successful!</h1>

          <p>Your products have been successfully purchased.</p>

          <button
            onClick={() => navigate("/products")}
            className="continue-shopping-button"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Review your order before confirming your purchase.</p>
        </div>

        <div className="checkout-layout">
          {/* Order Items */}

          <div className="checkout-items">
            <h2>Order Items</h2>

            {cartItems.map((item) => (
              <div className="checkout-item" key={item._id}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="checkout-item-image"
                />

                <div className="checkout-item-info">
                  <h3>{item.title}</h3>

                  <p>
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                <div className="checkout-item-total">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}

          <div className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Products</span>

              <span>{cartItems.length}</span>
            </div>

            <div className="summary-row">
              <span>Total Quantity</span>

              <span>{totalQuantity}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total Amount</span>

              <strong>₹{totalAmount}</strong>
            </div>

            {error && <div className="checkout-error">{error}</div>}

            <button
              className="confirm-checkout-button"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm Checkout"}
            </button>

            <button
              className="back-cart-button"
              onClick={() => navigate("/cart")}
              disabled={loading}
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
