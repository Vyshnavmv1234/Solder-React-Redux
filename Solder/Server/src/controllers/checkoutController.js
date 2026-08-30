
import checkoutService from "../services/checkoutService.js"

const checkout = async (req, res, next) => {
  try {
    const { productIds } = req.body;

    const result = await checkoutService.checkout(productIds);

    res.status(200).json({
      success: true,
      message: "Checkout successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export default {checkout}