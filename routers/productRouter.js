import express from "express";
import { createProduct, deleteProduct, getProductInfo, getProducts, updateProduct } from "../controllers/productController.js";

const productRouter = express.Router()

productRouter.post("/",createProduct);
productRouter.get("/",getProducts)
productRouter.get("/:productID",getProductInfo)
productRouter.delete("/:productID",deleteProduct)
productRouter.put("/:productID",updateProduct)

export default productRouter;

