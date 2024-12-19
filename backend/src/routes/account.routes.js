import { Router } from "express";
import { accountBalance, amountTransfer } from "../controllers/account.controllers";

const accountRouter = Router();

//secured routes
accountRouter.get("/balance", accountBalance);
accountRouter.get("/transfer", amountTransfer);

export default accountRouter;