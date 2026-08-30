import express from 'express'
import cors from 'cors'
import router from './routes/authRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import productRouter from './routes/productRoutes.js'
import checkoutRoutes from './routes/checkoutRoutes.js'

const app = express()

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Solder API is running",
  });
});

app.use(productRouter)
app.use(checkoutRoutes)
app.use(router)
app.use(errorHandler)

export default app