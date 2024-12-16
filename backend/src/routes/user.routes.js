import { Router } from "express";
import { findUser, loginUser, registerUser, updateDetails } from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);

//secured routes
router.route("/").put(verifyJWT, updateDetails);
router.route("/bulk").put(verifyJWT, findUser);

export default router;


