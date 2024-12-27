import { Router } from "express";
import { accountBalance, amountTransfer } from "../controllers/account.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const accountRouter = Router();

//secured routes
accountRouter.route("/balance").get(verifyJWT ,accountBalance);
accountRouter.route("/transfer").post(verifyJWT, amountTransfer);

export default accountRouter;