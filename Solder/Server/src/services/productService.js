import ProductRepository from "../repositories/ProductRepository.js";

const createProduct = async (productData, userId) => {
  console.log(userId);
  const product = await ProductRepository.createProduct({
    ...productData,
    seller: userId,
  });
  return product;
};
const getAvailableProducts = async (filters) => {
  return await ProductRepository.getAvailableProducts(filters);
};

export default { createProduct, getAvailableProducts};
