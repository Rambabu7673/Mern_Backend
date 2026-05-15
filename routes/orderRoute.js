import express from 'express';
import { placeOrder } from '../Controllers/order.js';

const router = express.Router();

router.post('/placeorder', placeOrder);

export default router;
