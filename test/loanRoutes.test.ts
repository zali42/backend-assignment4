import request from "supertest";
import app from "../src/app";



describe("Loan Routes", () => {
    describe("Get /api/v1/loans", () => {
        it("should return 401 when no token is provided", async () => {
            const response = await request(app).get("/api/v1/loans")

            expect(response.status).toBe(401)
        })
    })

    
    describe("POST /api/v1/loans", () => {
        it("should return 401 when no token is provided", async () => {
            const response = await request(app)
                .post("/api/v1/loans")
                .send({
                    applicant: "test user",
                    amount: 50000,
                    status: "pending",
                });

            expect(response.status).toBe(401);
        });
    });

})
