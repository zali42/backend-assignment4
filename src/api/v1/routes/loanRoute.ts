import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import {loanSchemas } from "../validation/loanValidation";
import * as loanController from "../controllers/loanController";

const router: Router = express.Router();

router.post(
    "/",
    validateRequest({ body: loanSchemas.create.body }),
    loanController.createLoan
);

router.get("/", loanController.getAllLoans)
router.get("/:id", loanController.getLoanById);
router.put("/:id", loanController.updateLoan);
router.delete("/:id", loanController.deleteLoan)

export default router;
