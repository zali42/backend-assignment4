import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Event schema organised by request type
 */
export const loanSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/events
    create: {
        body: Joi.object({
            applicant: Joi.string().required().messages({
                "any.required": "\"applicant\" is required",
                "string.empty": "applicant cannot be empty",
            }),
            amount: Joi.number().positive().required().messages({
                "any.required": "amount is required",
                "number.base": "amount must be a number",
            }),
            status: Joi.string().valid("pending", "under_review", "flagged").messages({
                "any.required": "status is required",
            }),

            
        }),
    },
    update: {
        body: Joi.object({
            applicant: Joi.string().required().messages({
                "string.empty": "applicant cannot be empty",
            }),
            amount: Joi.number().positive().required().messages({
                "number.base": "amount must be a number",
            }),
            status: Joi.string().valid("pending", "under_review", "flagged").messages({
                "any.required": "status is required",})
            }),

    },


};
