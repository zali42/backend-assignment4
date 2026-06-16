export interface Loan {
    applicant: string;
    amount: number;
    status: string;
    createdAt: Date| string;
    updatedAt: Date | string;
}