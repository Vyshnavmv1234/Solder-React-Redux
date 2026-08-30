import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchMyProducts } from "../features/product/productSlice.js";

import "../public/MyProducts.css";

const MyProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const {isAuthenticated} = useSelector((state)=>state.auth)

  if(!isAuthenticated) navigate('/login')

  const {
    myProducts,
    loading,
    error,
  } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(fetchMyProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="my-products-container">
        <h2>Loading your products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-products-container">
        <h2 className="error-message">
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div className="my-products-container">
      <h1>My Products</h1>

      {myProducts.length === 0 ? (
        <p className="no-products">
          You have not listed any products yet.
        </p>
      ) : (
        <div className="my-products-grid">
          {myProducts.map((product) => (
            <div
              className="my-product-card"
              key={product._id}
            >
              <img
                src={product.imageUrl || product.image}
                alt={product.title}
                className="my-product-image"
              />

              <div className="my-product-info">
                <span className="my-product-category">
                  {product.category}
                </span>

                <h3>{product.title}</h3>

                <p>
                  {product.description}
                </p>

                <strong>
                  ₹{product.price}
                </strong>

                <p
                  className={
                    product.isSold
                      ? "sold-status"
                      : "available-status"
                  }
                >
                  {product.isSold
                    ? "Sold"
                    : "Available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;