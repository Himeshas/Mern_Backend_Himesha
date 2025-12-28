import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController';

const orderRouter = express.Router();

orderRouter.post("/", createOrder)
orderRouter.get("/:pageNum/:limit", getOrders)

export default orderRouter;