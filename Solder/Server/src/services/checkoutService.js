import ProductRepository from "../repositories/ProductRepository.js";

const checkout = async (productIds) => {
  if (!productIds || productIds.length === 0) {
    const error = new Error("No products selected for checkout");
    error.statusCode = 400;

    throw error;
  }

  const result = await ProductRepository.markProductsAsSold(productIds)

  return result
};

export default {checkout}