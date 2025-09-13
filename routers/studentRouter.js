import express from "express"
import Student from "../models/student.js" //meka import wenna one
import {/*deleteStudent,*/ getStudents, setStudents,/* updateStudent */} from "../controllers/studentController.js"

const studentRouter = express.Router()


studentRouter.get(
    "/", getStudents
    
)

studentRouter.post(

    "/", setStudents
    
)
/*
app.delete("/",deleteStudent
    
);

app.put("/",updateStudent
    
)
*/

export default studentRouter;