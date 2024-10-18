const Course = require("../models/course");
const Student = require("../models/student");
const courseController = require("../controllers/courseController");

jest.mock("../models/course");

beforeEach(() => {
    jest.clearAllMocks();
});


describe("obtenerMaterias", () => {
    it("debería devolver una lista de materias con código 200", async () => {
        const course = {
            name: "Algoritmos",
            students: [{ name: "Juan Perez", enrollment: true, age: 22 }],
            professor: "German Alonso",
        };

        Course.find.mockReturnValue({
            populate: jest.fn().mockResolvedValue([course]),
        });

        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await courseController.getCourse(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith([course]);
    })

    // it("Debería devolver un error 500 si falla la busqueda", async () => {
    // 	const req = {}
    // 	const res = {
    // 		status: jest.fn().mockReturnThis(),
    // 		json: jest.fn()
    // 	}
    // 	Student.find.mockRejectedValue( new Error("error en la base de datos"))

    // 	await studentController.getStudents(req, res)

    // 	expect(res.status).toHaveBeenCalledWith(500)
    // 	expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos"})
    // })
});

describe("crearMateria", () => {
    it("Debería crear una materia y devolver la misma materia con un codigo 201", async () => {
        const req = {
            name: "Algoritmos",
            students: [{ name: "Juan Perez", enrollment: true, age: 22 }],
            professor: "German Alonso",
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await courseController.createCourse(req, res)
        expect(res.status).toHaveBeenCalledWith(201)
    })
})
describe("Obetener materia por ID", ()=> {
    it("debería devolver un curso por ID con código 200", async () => {
        const req = {
            params: { id: "123" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        Course.findById.mockImplementation(() => ({
            populate: jest.fn().mockResolvedValue({
                name: "Algoritmos",
                students: [{ _id: "1", name: "Juan Perez", enrollment: true, age: 22 }],
                professor: "German Alonso",
                _id: "123",
            }),
        }));
    
        await courseController.getCourseForID(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            name: "Algoritmos",
            students: [{ _id: "1", name: "Juan Perez", enrollment: true, age: 22 }],
            professor: "German Alonso",
            _id: "123",
        })
    })        
});

describe("Actualizar Materia", () => {
    it("Debería actualizar una materia y devolverla con código 200", async () => {
        const req = {
            params: { idCourse: "123" },
            body: { name: "Algoritmos Avanzados", professor: "Dr. Smith" },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        Course.findByIdAndUpdate.mockResolvedValue({
            name: "Algoritmos Avanzados",
            professor: "Dr. Smith",
            _id: "123",
            __v: 0
        });

        await courseController.updateCourse(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            name: "Algoritmos Avanzados",
            professor: "Dr. Smith",
            _id: "123",
            __v: 0
        });
    });
});