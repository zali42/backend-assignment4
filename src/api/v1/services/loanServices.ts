import {
    QuerySnapshot,
    DocumentData,
    DocumentSnapshot,
} from "firebase-admin/firestore";
import { Loan } from "../models/loanModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

// reference to the firestore collection name
const COLLECTION: string = "loanApplications";

/**
 * Retrieves all loans
 * @returns Array of all loans
 */
export const getAllLoans = async (): Promise<Loan[]> => {
  
    const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

   const loans: Loan[] =  snapshot.docs.map((doc) => {
        const data: DocumentData = doc.data();

         return {
                id: doc.id,
                applicant: data.applicant,
                amount: data.amount,
                status: data.status,
                createdAt: data.createdAt.toDate().toISOString(),
                updatedAt: data.updatedAt.toDate().toISOString(),
            } as Loan;
        });

        return loans 

};


/**
 * Creates a new loan
 * @param loanData - The data for the new loan
 * @returns The created loan with generated ID
 */
export const createLoan = async (
   loanData: Pick<Loan, "applicant" | "amount" | "status">
): Promise<Loan> => {
    const dateNow = new Date().toISOString();

    const createdLoan: Partial<Loan> = {
        applicant: loanData.applicant,
        amount: loanData.amount,
        status: loanData.status,
        createdAt: dateNow,
        updatedAt: dateNow,
    };

    const loanId: string = await createDocument<Loan>(COLLECTION, createdLoan);

    return structuredClone({ id: loanId, ...createdLoan } as Loan);
};

/**
 * Retrieves a single loan by ID from the database
 * @param id - This ID of the loan to retrieve
 * @returns The loan if found
 */
export const getLoanById = async (id: string): Promise<Loan> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Loan with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();
    const loan: Loan = {
        id: doc.id,
        applicant: data?.applicant,
        amount: data?.amount,
        status: data?.status,
        createdAt: data?.createdAt.toDate().toISOString(),
        updatedAt: data?.updatedAt.toDate().toISOString(),
    } ;

    return structuredClone(loan);
};

/**
 * Updates (replaces) an existing loan
 * @param id - The ID of the loan to update
 * @param loanData - The fields to updates (name and/or description)
 * @returns The updated loan
 * @throws Error if loan with given ID is not found
 */
export const updateLoan = async (
    id: string,
    loanData: Pick<Loan, "applicant" | "amount" | "status">
): Promise<Loan> => {
    // check if the loan exists before updating
    const loan: Loan = await getLoanById(id);

    const updatedLoan: Loan = {
        ...loan,
        ...loanData,
        updatedAt: new Date().toISOString(),
    };

    await updateDocument<Loan>(COLLECTION, id, updatedLoan);

    return structuredClone(updatedLoan);
};

/**
 * Deletes an loan from storage
 * @param id - The ID of the loan to delete
 * @throws Error if loan with given ID is not found
 */
export const deleteLoan = async (id: string): Promise<void> => {
    // check if the loan exists before deleting
    const loan: Loan = await getLoanById(id);

    await deleteDocument(COLLECTION, id);
};
