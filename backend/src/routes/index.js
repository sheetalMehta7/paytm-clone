import { Router } from "express";
import userRouter from "./user.routes.js";
const mainRouter = Router();

mainRouter.use("/user", userRouter);

export default mainRouter;