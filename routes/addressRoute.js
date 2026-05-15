import express from 'express';
import { addAddress, getAddress } from "../Controllers/address.js";


const router = express.Router();

router.post('/address', addAddress)

router.get("/:userId", getAddress);

export default router;