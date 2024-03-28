import { Router } from "express";

const router = Router();

// Controllers imported
import { loginUser, registerUser } from "../controllers/user.controllers";

// API routes
router.route("/register").post(
    registerUser
);
router.route("/login").post(loginUser)

export default router;