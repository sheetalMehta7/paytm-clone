import { Router } from "express";
import { findUser, loginUser, registerUser, updateDetails } from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);

//secured routes
userRouter.route("/").put(verifyJWT, updateDetails);
userRouter.route("/bulk").get(verifyJWT, findUser);

export default userRouter;


