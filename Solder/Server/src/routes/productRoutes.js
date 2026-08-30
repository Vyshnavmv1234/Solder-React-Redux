import express from "express";
import productController from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const productRouter = express.Router();

productRouter.post(
  "/addProduct",
  protect,
  upload.single("image"),
  productController.createProduct
);
productRouter.get("/products", productController.getAvailableProducts);
productRouter.get("/myProducts", protect, productController.getMyProducts);

export default productRouter;

