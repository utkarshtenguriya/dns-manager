import { Router } from "express";

const router = Router();

// ----------import controllers-----------
import {
    createRecord,
    deleteRecord,
    fetchRecord,
    updateRecord,
} from "../controllers/record.controllers";
import { verifyJWT } from "../middlewares/auth.middleware";


// ---------secure routes define---------
router.route("/create").post(verifyJWT, createRecord);
router.route("/delete").post(verifyJWT, deleteRecord);
router.route("/fetch").post(verifyJWT, fetchRecord);
router.route("/update").post(verifyJWT, updateRecord);
// router.route("/find").post(verifyJWT, findOneRecord);

export default router;
