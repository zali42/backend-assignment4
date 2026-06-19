import express, { Router } from "express";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { validateRequest } from "../middleware/validate";
import {loanSchemas } from "../validation/loanValidation";
import * as loanController from "../controllers/loanController";

const router: Router = express.Router();

//officer, manager and admin
router.get(
    "/",
    authenticate,
    isAuthorized({hasRole: ["officer", "manager", "admin"]}),
    loanController.getAllLoans
)

//officer, manager and admin
router.get(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["officer", "manager", "admin"] }),
    loanController.getLoanById
);

// manager and admin
router.post(
    "/",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"] }),
    validateRequest({body: loanSchemas.create.body}),
    loanController.createLoan
);

// manager and admin
router.put(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin", "manager"]}),
    validateRequest(loanSchemas.update),
    loanController.updateLoan
);

// Admin only
router.delete(
    "/:id",
    authenticate,
    isAuthorized({ hasRole: ["admin"] }),
    loanController.deleteLoan
);

export default router;
