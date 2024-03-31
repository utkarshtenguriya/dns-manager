"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// ----------import controllers-----------
const record_controllers_1 = require("../controllers/record.controllers");
const auth_middleware_1 = require("../middlewares/auth.middleware");
// ---------secure routes define---------
router.route("/create").post(auth_middleware_1.verifyJWT, record_controllers_1.createRecord);
router.route("/delete").post(auth_middleware_1.verifyJWT, record_controllers_1.deleteRecord);
router.route("/fetch").post(auth_middleware_1.verifyJWT, record_controllers_1.fetchRecord);
router.route("/update").post(auth_middleware_1.verifyJWT, record_controllers_1.updateRecord);
// router.route("/find").post(verifyJWT, findOneRecord);
exports.default = router;
//# sourceMappingURL=record.routes.js.map