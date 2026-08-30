import express from "express";
import authController from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";
import productController from "../controllers/productController.js";

const router = express.Router()

router.post("/register", authController.register);
router.post('/login',authController.login)

export default router