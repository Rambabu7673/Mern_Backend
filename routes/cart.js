import express from "express";
import {
  productCart,
  getCartByUserId,
  UpdateQuentity,
  deleteProduct,
} from "../Controllers/cart.js";

const router = express.Router();

// Add New prodct cart
router.post("/add", productCart);
// Update Quentity cart
router.post("/update", UpdateQuentity);
// Delete Product
router.post("/delete", deleteProduct);
// Get Card by UserId
router.get("/:userId", getCartByUserId);

export default router;
