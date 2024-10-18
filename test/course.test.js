const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Student = require("../models/student");
const Course = require("../models/course");
const jwt = require("jsonwebtoken");

const generateToken = () => {
	return jwt.sign({ userId: "fakeUserId" }, "secretKey", { expiresIn: "1h" });
};

afterEach(async () => {
	await Course.deleteMany();
});

afterAll(async () => {
	await mongoose.connection.close();
});

describe("CRUD de materias con jwt", () => {
	it("Deberia crear una nueva materia", async () => {
		const token = generateToken();

		const student = await Student.create({
			name: "Juan perez",
			enrollment: true,
			age: 22,
		});

		const res = await request(app)
			.post("/api/course")
			.set("Authorization", token)
			.send({
				name: "algoritmos",
				student: [student._id],
				professor: "javier hernandez",
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("_id");
		expect(res.body.name).toBe("algoritmos");
	});
});