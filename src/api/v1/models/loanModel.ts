export interface Loan {
    id?: string;
    applicant: string;
    amount: number;
    status: string;
    createdAt: Date| string;
    updatedAt: Date | string;
}