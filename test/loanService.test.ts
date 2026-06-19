import * as loanService from "../src/api/v1/services/loanServices";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Loan } from "../src/api/v1/models/loanModel";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Loan Service", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create an loan successfully", async () => {
        // Arrange
        const mockloanData = {
            applicant: "John Smith",
            amount: 50000,
            status: "pending",
        };

        const mockDocumentId: string = "test-loan-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result: Loan = await loanService.createLoan(mockloanData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "loanApplications",
            expect.objectContaining({
                applicant: mockloanData.applicant,
                amount: mockloanData.amount,
                status: mockloanData.status,
            })
        );
        expect(result.id).toBe(mockDocumentId);
        expect(result.applicant).toBe(mockloanData.applicant);
    });

    it("should delete an loan successfully", async () => {
        // Arrange
        const mockDocumentId: string = "loan-123";
        const mockloan: Loan = {
            id: mockDocumentId,
            applicant: "Test Loan",
            amount: 50000,
            status: "pending",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        // jest.spyOn creates a mock for a specific method/function on an object, in our example the loanService
        jest.spyOn(loanService, "getLoanById").mockResolvedValue(mockloan);

        // jest.Mock replaces the auto-mocked version with our specific mocked implementation
        (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
            undefined
        );

        // Act
        await loanService.deleteLoan(mockDocumentId);

        // Assert
        expect(loanService.getLoanById).toHaveBeenCalledWith(mockDocumentId);
        expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
            "loanApplications",
            mockDocumentId
        );
    });
});
