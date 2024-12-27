import { Router } from "express";
import userRouter from "./user.routes.js";
import accountRouter from "./account.routes.js";
const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/account", accountRouter);

export default mainRouter;