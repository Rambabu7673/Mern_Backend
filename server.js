import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
import express from "express";
import cors from "cors";
import dotenv, { config } from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cart.js";
import addressRoutes from "./routes/addressRoute.js";
import orderRoutes from "./routes/orderRoute.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use('/user/auth', userRoutes);
app.use('/user/products', productRoutes);
app.use('/user/cart', cartRoutes);
app.use('/user/biodata', addressRoutes);
app.use('/user/orders', orderRoutes);


app.get("/", (req, res) => {
  res.send("This is home route ");
});
connectDB();

const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server is runing on port= ${port}`));
