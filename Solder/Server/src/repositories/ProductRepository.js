import Product from "../models/Product.js";

const createProduct = async (productData) => {
  return Product.create(productData);
};
const findProductById = async (productId) => {
  return Product.findById(productId);
};

const findProductsBySeller = async (sellerId) => {
  return Product.find({ seller: sellerId });
};

const getAvailableProducts = async (filters = {}) => {
  const query = {
    isSold: false,
  };

  if (filters.category) {
    query.category = filters.category;
  }
  if (filters.minPrice) {
    query.price = {
      ...query.price,
      $gte: Number(filters.minPrice),
    };
  }
  if (filters.maxPrice) {
    query.price = {
      ...query.price,
      $lte: Number(filters.maxPrice),
    };
  }
  return Product.find(query);
};

const markProductsAsSold = async (productIds) => {
  return Product.updateMany(
    {
      _id: { $in: productIds },
      isSold: false,
    },
    { $set: { isSold: true } },
  );
};

export default {
  createProduct,
  findProductById,
  getAvailableProducts,
  findProductsBySeller,
  markProductsAsSold,
};
