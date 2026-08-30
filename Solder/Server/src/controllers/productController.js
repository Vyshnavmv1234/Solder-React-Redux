import ProductRepository from "../repositories/ProductRepository.js";
import productService from "../services/productService.js";
import { uploadToCloudinary } from "../config/cloudinary.js";

const createProduct = async (req, res, next) => {
  try {
    let imageUrl = req.body.imageUrl;

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const productData = {
      ...req.body,
      imageUrl,
    };

    if (productData.price) {
      productData.price = Number(productData.price);
    }

    const product = await productService.createProduct(
      productData,
      req.user.userId,
    );

    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

const getMyProducts = async (req, res, next) => {
  try {
    const products = await ProductRepository.findProductsBySeller(
      req.user.userId,
    );

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

const getAvailableProducts = async (req, res, next) => {
  try {
    const filters = {
      category: req.query.category,
      minPrice: req.query.minPrice,
      maxPrice: req.query.maxPrice,
    };

    const products = await productService.getAvailableProducts(filters);

    res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};


export default { createProduct, getAvailableProducts, getMyProducts };
