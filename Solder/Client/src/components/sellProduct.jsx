import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import "../public/SellProduct.css";
import { toast } from "react-toastify";

const SellProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.products);

  const [previewUrl, setPreviewUrl] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const selectedImage = watch("image");

  useEffect(() => {
    if (selectedImage && selectedImage.length > 0) {
      const file = selectedImage[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedImage]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("quantity", data.stock);
      formData.append("category", data.category);

      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      await dispatch(createProduct(formData)).unwrap();
      reset();
      setPreviewUrl(null);

      toast.success("Product Added Successfully")
      navigate("/myProducts");
    } catch (error) {}
  };

  return (
    <div className="sell-page">
      <div className="sell-container">
        <div className="sell-header">
          <h1>Sell a Product</h1>
          <p>
            Create a listing and find someone who needs what you no longer do.
          </p>
        </div>

        <form className="sell-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title">Product Title</label>
            <input
              id="title"
              type="text"
              placeholder="Enter product title"
              {...register("title", {
                required: "Product title is required",
              })}
            />
            {errors.title && (
              <span className="field-error">{errors.title.message}</span>
            )}
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="5"
              placeholder="Describe your product..."
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 20,
                  message: "Description must be at least 20 characters",
                },
              })}
            />
            {errors.description && (
              <span className="field-error">{errors.description.message}</span>
            )}
          </div>

          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              id="price"
              type="number"
              step="0.01"
              placeholder="Enter price"
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
                validate: (value) =>
                  value > 0 || "Price must be greater than 0",
              })}
            />
            {errors.price && (
              <span className="field-error">{errors.price.message}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              type="number"
              step="0.01"
              placeholder="Enter quantity"
              {...register("stock", {
                required: "Quantity is required",
                valueAsNumber: true,
                validate: (value) =>
                  value > 0 || "Quantity must be greater than 0",
              })}
            />
            {errors.price && (
              <span className="field-error">{errors.price.message}</span>
            )}
          </div>

          {/* Category */}
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="">Select a category</option>
              <option value="Electronics">Electronics</option>
              <option value="Furniture">Furniture</option>
              <option value="Books">Books</option>
              <option value="Clothing">Clothing</option>
              <option value="Vehicles">Vehicles</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && (
              <span className="field-error">{errors.category.message}</span>
            )}
          </div>

          {/* Product Picture (Cloudinary) */}
          <div className="form-group">
            <label htmlFor="image">Product Picture</label>
            <div className="file-input-wrapper">
              <input
                id="image"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                className="file-input"
                {...register("image", {
                  required: "Product picture is required",
                  validate: {
                    fileType: (files) => {
                      if (!files || !files[0]) return true;
                      const allowedTypes = [
                        "image/jpeg",
                        "image/jpg",
                        "image/png",
                        "image/webp",
                        "image/gif",
                      ];
                      return (
                        allowedTypes.includes(files[0].type) ||
                        "Only JPG, PNG, WEBP, or GIF images are allowed"
                      );
                    },
                    fileSize: (files) => {
                      if (!files || !files[0]) return true;
                      return (
                        files[0].size <= 10 * 1024 * 1024 ||
                        "Image size must be less than 10MB"
                      );
                    },
                  },
                })}
              />
            </div>
            {errors.image && (
              <span className="field-error">{errors.image.message}</span>
            )}

            {previewUrl && (
              <div className="image-preview-container">
                <p className="preview-label">Image Preview:</p>
                <img
                  src={previewUrl}
                  alt="Product preview"
                  className="image-preview"
                />
              </div>
            )}
          </div>

          {/* Backend Error */}
          {error && <div className="form-error">{error}</div>}

          {/* Submit */}
          <button type="submit" className="sell-button" disabled={loading}>
            {loading ? "Listing Product..." : "List Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellProduct;
