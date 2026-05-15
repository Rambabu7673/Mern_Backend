import express from "express";
import {
  productItems,
  getAllProducts,
  updateProduct,
  productDelete,
} from "../Controllers/productItem.js";


const router = express.Router();

router.post('/add', productItems);
router.get('/getproducts', getAllProducts);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', productDelete);

export default router;