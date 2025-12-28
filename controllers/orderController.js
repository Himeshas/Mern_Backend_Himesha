import e from "express";
import Order from "../models/order.js";

// Create a new order
export async function createOrder(req,res) {
    try {

    if (req.user == null) {

        res.status(401).json({message: "Please log in to create an order."});

        return;
    }

    //order ID format CBC00202

    const latestOrder = await Order.find().sort({date : -1}).limit(1);

    let orderid = "CBC00202";

    if (latestOrder.length > 0) {

        const latestOrderIdString = latestOrder[0].orderID;
        const latestOrderIdPrefix = latestOrderIdString.replace("CBC", "");
        const latestOrderIdInteger = parseInt(latestOrderIdPrefix);
        const newOrderIdInteger = latestOrderIdInteger + 1;
        const newOrderIdWithoutPrefix = newOrderIdInteger.toString().padStart(5, '0');
        orderid = "CBC" + newOrderIdWithoutPrefix;

    }

    const items = []
    let total = 0;

    if (req.body.items !== null && Array.isArray(req.body.items)) {

        for (let i = 0; i < req.body.items.length; i++) {

            let item = req.body.items[i];

            let product = await Product.findOne({productID: item.productID});

            if (product == null) {
                res.status(400).json({message: `Product with ID ${item.productID} not found.`});
                return;
            }

            items [i]= {
                productID: product.productID,
                name: product.name,
                image: product.images[0],
                qty: item.qty,
                price: product.price
            }

            total += product.price * item.qty;
        }

    }else{
        res.status(400).json({message: "Invalid items format."});
        return;
    }


    const order = new Order({
        orderID : orderid,
        email : req.user.email,
        name : req.user.firstName + " " + req.user.lastName,
        address : req.body.address,
        phone : req.body.phone,
        items : req.body.items,
        total : total
    })

    await order.save();

    res.status(201).json({message: "Order created successfully", order: order});

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
    
}

export async function getOrders(req,res) {

    const page = parseInt(req.params.pageNum) || 1;
    const limit = parseInt(req.params.limit) || 1;

    if (req.user == null) {

        res.status(401).json({message: "Please log in to view orders."});
        return;
    }

    if (req.user.role == "admin") {

        const orderCount= await Order.countDocuments();
        const totalPages= Math.ceil(orderCount / limit);
        const orders = await Order.find().skip((page-1) * limit).limit(limit).sort({date:-1});
        res.status(200).json({orders: orders,totalPages:totalPages});
    }else{
        const orderCount= await Order.countDocuments();
        const totalPages= Math.ceil(orderCount / limit);
        const orders = await Order.find({email: req.user.email}).skip((page-1) * limit).limit(limit).sort({date: -1});
        res.status(200).json({orders: orders});//user specific orders
        
    }
}