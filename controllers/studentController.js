import Student from "../models/student.js";
import bcrypt from "bcrypt"

export function getStudents (req,res) {
        
        /*
        console.log(req.body);

        console.log("This is get request...!");
        res.json(
            {
                message : "This is Response."
            }
        )*/

        Student.find().then(
           
            (student)=>{
                res.json(student)
            }


        ).catch(
           () =>{ res.json({
                message : "Failed to fetch data."
                      }            
            )

        }
        )    
    }

export function setStudents(req,res) {
        console.log("This is a post Request...!");
        if(req.user = null){

        res.status(403).json({
            message : "Please login to create a user"
        })
        return //return dannama one naththn palleha code run wenwa
    }
    if(req.user.role != "admin"){
        res.status(403).json({
            message : "Please login as Admin for create a user"
        })
        return //return dannama one naththn palleha code run wenwa
    }
        /*
        res.json(
            {
                message : "This is Response for Post....."
            }
        );*/

        const student = new Student(

            {
                Name : req.body.Name,
                age  : req.body.age,
                email: req.body.email
            }
        );

        student.save().then(
            ()=>res.json(
                {
                   message :"Studend saved successfully."
                }
             )).catch(
             ()=>res.json(
                {
                    message : "Student saving failed."
                }
            )
        );
    }    

/*    
export function deleteStudent () {
        console.log("This is a Delete Request...!");
    }  


export function updateStudent () {
        console.log("This is a put Request...!");
    } 
        
    */