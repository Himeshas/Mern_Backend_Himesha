import express from "express";
import { createUsers, getUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post(
    "/",createUsers
);

userRouter.get("/",getUser)

userRouter.post("/login",loginUser)

export default userRouter;