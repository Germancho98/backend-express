const request = require("supertest")
const app = require("../app")
const moongose = require("mongoose")
const Auth = require("../models/user")
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")

const generateToken = () => {
    return jwt.sign({ userId: "fakeUserId"}, "secretKey", { expiresIn: "1h"});
}

afterEach(async () => {
    await Auth.deleteMany();
})

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Registrar y loguear un usuario correctamente", () => {
    it("Debería registrar el usuario", async () => {
        const token = generateToken()

        const res = await request(app)
            .post("/api/register")
            .set("Authorization", token)
            .send({
                username: "Alonso",
                password: "fakePass123",
            });

        expect(res.statusCode).toEqual(201);
    });

    it("Debería loguear el usuario registrado", async () => {
        const user = await Auth.create({
            username: "Doe",
            password: "fakePass123"
        })

        const res = await request(app)
            .post("/api/login")
            .send({
                username: "Doe",
                password: "fakePass123"
            })
            expect(res.statusCode).toEqual(200);
    })
});

