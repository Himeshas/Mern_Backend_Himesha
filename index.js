import express, { response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
//import Student from "./models/student.js"; methana .js enna eka manual add karaganna

import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";




const app = express();
const connectionString = "mongodb+srv://himesha:1234@cluster0.ubbz7jg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

app.use(bodyParser.json());

app.use(
    (req,res,next)=>{

        const value = req.header("Authorization")

        if(value != null){

            const token = value.replace("Bearer ","")
            jwt.verify(token,"cbc-6505",
                (err,decoded)=>{
                    if(decoded == null){

                        res.status(403).json({
                            message : "Unauthorised"
                        })
                    }else{
                        req.user=decoded
                        next()
                    }
                }
            )
        }else{
            next()
        }
    }
)

mongoose.connect(connectionString).then(
    ()=>{
        console.log("Database connected successfully....!!");
    }
).catch(()=>{
        console.log("Database connected Failed....!!");
    });



app.use("/users",userRouter)


    /*

app.get(
);

app.post(
);
*/


// for run the back end.
app.listen(5000,()=>
    {
    console.log("Server is running on 5000");  // Arrow function
})