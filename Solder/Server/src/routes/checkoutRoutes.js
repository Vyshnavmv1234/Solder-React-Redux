import express from "express";
import checkoutController from "../controllers/checkoutController.js";
import protect from "../middleware/authMiddleware.js";

const checkoutRoutes = express.Router()

checkoutRoutes.post('/checkout',protect,checkoutController.checkout)

export default checkoutRoutes