import { Request, Response, NextFunction} from "express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import * as loanController from "../src/api/v1/controllers/loanController";
import * as loanService from "../src/api/v1/services/loanServices";
import { Loan } from "../src/api/v1/models/loanModel";

jest.mock("../src/api/v1/services/loanServices");

describe("Loan Controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    // reusable mocks for any controller tests
    beforeEach(() => {
        jest.clearAllMocks();
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("getAllLoans", () => {
        it("should handle successful operation", async () => {
            const mockItems: Loan[] = [
                {
                    id: "1",
                    applicant: "Test Loan",
                    amount: 50000,
                    status: "pending",
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                },
            ];
            (loanService.getAllLoans as jest.Mock).mockReturnValue(mockItems);

            await loanController.getAllLoans(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalled();
        });
    });

    describe("createLoan", () => {
        it("should handle successful creation", async () => {
            const mockBody = {
                applicant: "Test Loan",
                amount: 50000,
                status: "pending",
            };

            const mockLoan: Loan = {
                id: "loan-1",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ...mockBody,
            };

            mockReq.body = mockBody;
            (loanService.createLoan as jest.Mock).mockReturnValue(mockLoan);

            await loanController.createLoan(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalled()
        });
    });
});
