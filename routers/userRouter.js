import express from "express";
import { createUsers, loginUser } from "../controllers/userController.js";

const userRouter = express.Router()

userRouter.post(
    "/",createUsers
);

userRouter.post("/login",loginUser)

export default userRouter;