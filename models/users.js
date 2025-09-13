import mongoose from "mongoose";


const userScema = new mongoose.Schema(
    {
        firstname :{type : String, required : true} ,
        lastname  :{type : String, required : true},
        email     :{type : String, required : true, unique : true},
        password  :{type : String, required : true},
        phone     :{type : String, default : "N/A"},
        isBlocked :{type : Boolean, default : false},
        role      :{type : String, default : "user"},
        isEmailVerified:{type : Boolean, default : false},
        image     :{type : String, default : "454406-PF8Y14-132.jpg"}
    }
);

const Users = mongoose.model("users",userScema);

export default Users;