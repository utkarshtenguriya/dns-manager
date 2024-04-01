import { Router } from "express";

const router = Router();

// -----------::Controllers imported::----------------
import {
    logOutUser,
    loginUser,
    registerUser,
    userAuth,
} from "../controllers/user.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";

// -----------::open routes::------------
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/auth").post(verifyJWT, userAuth);
router.route("/logout").post(verifyJWT, logOutUser)

export default router;
