import express from "express";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import authRoute from "./routes/authRoute.js";
import userRoute from './routes/userRoute.js';
import cors from "cors";

//setup
const app = express();

app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
  return res.status(200).json("Hello World");
});
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users",userRoute)
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/orders", orderRoute);

export default app;
