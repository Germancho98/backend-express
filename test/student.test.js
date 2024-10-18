const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const Student = require("../models/student");
const jwt = require("jsonwebtoken");

const generateToken = () => {
	return jwt.sign({ userId: "fakeUserId" }, "secretKey", { expiresIn: "1h" });
};

afterEach(async () => {
	await Student.deleteMany();
});

afterAll(async () => {
	await mongoose.connection.close();
});

beforeEach(async () => {
    await Student.deleteMany({});
});

describe("CRUD estudiante con jwt", () => {
	it("Deberia crear un nuevo estudiante", async () => {
		const token = generateToken();
		const res = await request(app)
			.post("/api/students")
			.set("Authorization", token)
			.send({
				name: "Juan perez",
				enrollment: true,
				age: 22,
			});
		expect(res.statusCode).toEqual(201);
		expect(res.body).toHaveProperty("_id");
		expect(res.body.name).toBe("Juan perez");
	});

	it("tests para obtener los estudiantes", async () => {
		try {
			await Student.create({
				name: "Juan perez",
				enrollment: true,
				age: 22,
			});
		} catch (error) {
			console.error("error al crear estudiante", error);
		}
		const token = generateToken();
		const res = await request(app)
			.get("/api/students")
			.set("Authorization", token);
		expect(res.statusCode).toEqual(200);
		expect(res.body.length).toBe(1);
	});

	it("test para obtener un estudiante por ID", async () => {
		try {
			const student = await Student.create({
				name: "Juan perez",
				enrollment: true,
				age: 22,
			});

			const token = generateToken();
			const res = await request(app)
				.get(`/api/students/${student._id}`)
				.set("Authorization", token);
			expect(res.statusCode).toEqual(200);
			expect(res.body.name).toBe("Juan perez");
		} catch (error) {
			console.error("error al obtener estudiante", error);
		}
	});

	it("tests para actualizar estudiante el ID", async () => {
		const student = await Student.create({
			name: "German Alonso",
			enrollment: true,
			age: 24,
		});
		const token = generateToken();
		const res = await request(app)
			.put(`/api/students/${student._id}`)
			.set("Authorization", token)
			.send({
				name: "German Alonso",
				enrollment: true,
				age: 24,
			});
		expect(res.statusCode).toEqual(200);
		expect(res.body.name).toBe("German Alonso");
		expect(res.body.enrollment).toEqual(true);
		expect(res.body.age).toEqual(24);
	});
});
