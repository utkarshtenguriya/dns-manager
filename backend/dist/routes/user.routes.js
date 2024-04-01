"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// -----------::Controllers imported::----------------
const user_controllers_1 = require("../controllers/user.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// -----------open routes------------
router.route("/register").post(user_controllers_1.registerUser);
router.route("/login").post(user_controllers_1.loginUser);
router.route("/auth").post(auth_middleware_1.verifyJWT, user_controllers_1.userAuth);
exports.default = router;
//# sourceMappingURL=user.routes.js.map