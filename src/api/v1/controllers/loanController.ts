import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import type { Loan } from "../models/loanModel";
import { successResponse } from "../models/responseModel";
import * as loanService from "../services/loanServices"

// create Loan
export const createLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try{
        const {applicant, amount, status} = req.body;

        const newLoan: Loan = await loanService.createLoan({
           applicant,
           amount,
           status,
        })
        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newLoan,"Loan application created")
            
        );
    } catch (error: unknown) {
        next(error)
    }
};

export const getAllLoans = async (
     req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const loans = await loanService.getAllLoans()

        res.status(HTTP_STATUS.OK).json(
            successResponse(loans,"Loan retrieved")
        );
    }  catch (error: unknown) {
        next(error)
    }
};

export const getLoanById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id as string;

        const Loan: Loan = await loanService.getLoanById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(Loan,"Loan retrieved")
        );
    }  catch (error: unknown) {
        next(error)
    }
};

export const updateLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id as string;

        const updatedLoan: Loan = await loanService.updateLoan(
            id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedLoan,"Loan updated successfully")
        );
    }  catch (error: unknown) {
        next(error)
    }
};

export const deleteLoan = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const id = req.params.id as string;

        await loanService.deleteLoan(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse("Loan deleted successfuly")
        );
    }  catch (error: unknown) {
        next(error)
    }
};
