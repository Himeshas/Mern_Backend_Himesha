import Product from "../models/product.js";
import { isAdmin } from "./userController.js";

export async function createProduct(req,res){
/*
    if(req.user == null){
        res.status(403).json({
            message : "Please logit to create user."
        })

        return;
    }

    if(req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized for this action."
        })

        return;
    }*/

        if(!isAdmin(req)){
            return res.status(403).json({message:"Access denied admins only"})
        }

    const product = new Product(req.body)

    try{
        const response = await product.save()

        res.json({
            message : "Product created success fully",
            product : response
        })
    }catch(error){
        console.log("Error creating product",error)
        return res.status(500).json({message : "Failed to create product."})
    }
}

export async function getProducts(req,res) {

    try{

        if(isAdmin(req)){

            const products = await Product.find();
            return res.json(products)

        }else{

            const products = await Product.find({isAvailable : true});
            return res.json(products)

        }
    }catch(error){

        console.error("Error fetching products.",error)
        return res.status(500).json({message:"can't fetching products"})

    }
    
}

export async function deleteProduct(req,res){

    if(!isAdmin(req)){
        res.status(403).json({

            message: "Access denied, Admin users only"
        })
        return
    }

    try{
        const productID = req.params.productID;

        await Product.deleteOne(
            {productID : productID}
        )

        res.json({message : "Product deleted successfully"})

    }catch(error){

     console.error("error deleting product",error);
     res.status(500).json({message : "Failed to delete product"})
     return

    }
}

export async function updateProduct(req,res) {
    
    if(!isAdmin(req)){
        res.status(403).json({

            message: "Access denied, Admin users only"
        })
        return
    }

    const data = req.body;
    const productID = req.body.productID;
    //to prevent overwriting the productID in the request body
    data.productID = productID;

    try{
        await Product.updateOne({
            productID : productID,data
        });

        res.json({message : "Product updated successfully"})

    }catch(error){
        console.error("error updating product",error);
     res.status(500).json({message : "Failed to update product"})
     return
    }


}

export async function getProductInfo(req,res) {
    try{
        const productID = req.params.productID;
        const product = await Product.findOne({productId : productID})

        if(product == null){

            res.status(404).json({message : "Product not found"})

     return

        }

        if(isAdmin(req)){

            res.json(product)
        }else{
            if(product.isAvailable){
                res.json(product)
            }else{
                res.status(404).json({message:"Product not found"})
            }
        }

    }catch(error){
        console.error("error getting product info",error);
     res.status(500).json({message : "Failed to get product info"})
     return
    }
}