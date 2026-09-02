import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice";
import { fetchProducts } from "../features/product/productSlice";
import { toast } from "react-toastify";

import "../public/ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { products, loading, error } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart);

  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
  });

  useEffect(() => {
    const currentCategory = searchParams.get("category") || "";
    const currentMinPrice = searchParams.get("minPrice") || "";
    const currentMaxPrice = searchParams.get("maxPrice") || "";

    const urlFilters = {
      category: currentCategory,
      minPrice: currentMinPrice,
      maxPrice: currentMaxPrice,
    };

    setFilters(urlFilters);
    dispatch(fetchProducts(urlFilters));
  }, [searchParams, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFilters((previousFilters) => ({
      ...previousFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;

    setSearchParams(params);
  };

  const handleAddToCart = (product) => {
    const stock = product.stock ?? product.quantity;
    const existingInCart = cartItems.find((item) => item._id === product._id);

    if (stock !== undefined && stock <= 0) {
      toast.error("This product is out of stock!");
      return;
    }

    if (
      existingInCart &&
      stock !== undefined &&
      existingInCart.quantity >= (existingInCart.stock ?? stock)
    ) {
      toast.warning(`Cannot add more. Only ${stock} items available in stock!`);
      return;
    }

    dispatch(addToCart(product));

    toast.success(`${product.title} added to cart!`);
  };

  const handleResetFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
    });

    setSearchParams({});
  };

  return (
    <div className="products-container">
      <h1>Available Products</h1>

      {/* FILTER SECTION */}

      <div className="filter-container">
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>

          <option value="Electronics">Electronics</option>

          <option value="Furniture">Furniture</option>

          <option value="Vehicles">Vehicles</option>

          <option value="Fashion">Fashion</option>

          <option value="Books">Books</option>

          <option value="Others">Others</option>
        </select>

        <input
          type="number"
          name="minPrice"
          placeholder="Minimum Price"
          value={filters.minPrice}
          onChange={handleChange}
        />

        <input
          type="number"
          name="maxPrice"
          placeholder="Maximum Price"
          value={filters.maxPrice}
          onChange={handleChange}
        />

        <button className="filter-button" onClick={handleApplyFilters}>
          Apply Filters
        </button>

        <button className="reset-button" onClick={handleResetFilters}>
          Reset
        </button>
      </div>

      {/* LOADING */}

      {loading && <p className="loading-message">Loading products...</p>}

      {/* ERROR */}

      {error && <p className="error-message">{error}</p>}

      {/* PRODUCTS */}

      {!loading && !error && (
        <>
          {products.length === 0 ? (
            <p className="no-products">No products available.</p>
          ) : (
            <div className="products-grid">
              {products.map((product) => (
                <div className="product-card" key={product._id}>
                  <img
                    src={product.imageUrl || product.image}
                    alt={product.title}
                    className="product-image"
                  />

                  <div className="product-info">
                    <span className="product-category">{product.category}</span>

                    <h3>{product.title}</h3>

                    <p>{product.description}</p>

                    <strong>₹{product.price}</strong>

                    <button
                      className="add-cart-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
