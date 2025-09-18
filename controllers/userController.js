import Users from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export function createUsers(req,res){

    if(req.user == null){

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

    const passwordHash = bcrypt.hashSync(req.body.password,10)

    const userData = {
            firstname : req.body.firstname,
            lastname  : req.body.lastname,
            email     : req.body.email,
            password  : passwordHash

        }

    

    const user = new Users(userData);

    user.save().then(
        ()=>res.json(
            {
                message:"User added successfully...!"
            }
        )  
    ).catch(
        ()=>res.json(
            {
                message: "Operation failed....!"
            }
        )
    )
}

export function loginUser(req,res){

    const email = req.body.email;
    const password = req.body.password;

    Users.findOne(
        {
            email : email
        }
    ).then(
        (user)=>{
            if(user == null){
                res.status(404).json(
                    {
                        "message":"user not found"
                    }
                )

                
            }else{
                const isPasswordCorrect = bcrypt.compareSync(password,user.password)

                if(isPasswordCorrect){

                    const token = jwt.sign(
                        {
                            email : user.email,
                            firstname : user.firstname,
                            lastname : user.lastname,
                            role : user.role,
                            isBlocked : user.isBlocked,
                            isEmailVerified : user.isEmailVerified,
                            image : user.image
                        },
                        "cbc-6505"
                    )

                    res.json(
                        {
                            "token" : token,
                            "message" : "Login successfully..!"
                        }
                    )
                }else{

                    res.status(403).json(
                        {
                            message : "Incorrect password..!"
                        }
                    )
                }
            }
            
        }
    )
}

export function isAdmin(req){

    if(req.user == null){

        return false;
    }

    if(req.user.role == "admin"){

        return true;
    }else{

        return false;
    }
}



/*{
            firstname : req.firstname,
            lastname  : req.lastname,
            email     : req.email,
            password  : req.password,
            phone     : req.phone,
            isBlocked : req.isBlocked,
            role      : req.role,
            isEmailVerified: req.isEmailVerified,
            image     : req.image

        }*/