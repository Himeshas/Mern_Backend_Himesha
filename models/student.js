import mongoose from "mongoose";

const collctionScema = new mongoose.Schema(
    {
        Name : String,
        age  : Number,
        email: String
    }
);

const Student = mongoose.model("student",collctionScema);

export default Student;