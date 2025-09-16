import Product from "../models/product.js";

export async function createProduct(req,res){

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