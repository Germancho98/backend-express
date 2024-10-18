const Student = require("../models/student");
const studentController = require("../controllers/studentController");

jest.mock("../models/student");

describe("obtenerEstudiantes", () => {
	it("debería devolver una lista de estudiantes con codigo 200", async () => {
		const req = {};
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn(),
		};
		Student.find.mockResolvedValue([
			{ name: "German Alonso", enrollment: true, age: 24 },
		]);

		await studentController.getStudents(req, res);

		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveBeenCalledWith([
			{ name: "German Alonso", enrollment: true, age: 24 },
		])
	})

	it("Debería devolver un error 500 si falla la busqueda", async () => {
		const req = {}
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}
		Student.find.mockRejectedValue( new Error("error en la base de datos"))

		await studentController.getStudents(req, res)

		expect(res.status).toHaveBeenCalledWith(500)
		expect(res.json).toHaveBeenCalledWith({ error: "error en la base de datos"})
	})

});

describe("crearEstudiantes", () => {
	it("Debería crear un estudiante y devolver el mismo estudiantes con un codigo 201", async () => {
		const req = {
			body:{ name: "German Alonso", enrollment: true, age: 24 }
		}
		const res = {
			status: jest.fn().mockReturnThis(),
            json: jest.fn()
		}
		await studentController.createStudent(req, res)
		expect(res.status).toHaveBeenCalledWith(201)
	})
})

describe("Obetener estudiantes por ID", ()=> {
	it("deberia volver un estudiante por id con codigo 200", async () => {
		const req = {
			params: { idStudent:"123" }
		}
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}
		Student.findById.mockResolvedValue({
			name: "German Alonso",
			age: 22,
			enrollment: true,
			_id: "123",
			__iv: 0
		})

		await studentController.getStudentForID(req, res)
		expect(res.status).toHaveBeenCalledWith(200)
		expect(res.json).toHaveBeenCalledWith({
			name: "German Alonso",
			age: 22,
			enrollment: true,
			_id: "123",
			__iv: 0
		})
	})

	it("Deberia devolver un 404 si no encuentra el ID del estudiante", async () => {
		const req = {
			params: { idStudent: "123" }
		}
		const res = {
			status: jest.fn().mockReturnThis(),
			json: jest.fn()
		}

		Student.findById.mockResolvedValue(null)

		await studentController.getStudentForID(req, res)

		expect(res.status).toHaveBeenCalledWith(404)
		expect(res.json).toHaveBeenCalledWith({ message: "student not found"})
	})

	it("Deberia devolver un 500 cuando falla al obtener el estudiante por otra razon diferente a no encontrarlo",
        async ()=>{
            const req = {
                params:{ idStudent:"123" }
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            Student.findById.mockRejectedValue(new Error("Error en la base de datos"))

            await studentController.getStudentForID(req,res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
        }
    )
})

describe("ActualizarEstudiante",()=>{
    it("Deberia actualizar un estudiante y devolverlo con codigo 200", async ()=>{
        const req = {
            params: { idStudent:"123" },
            body:{ name: "German Alonso", enrollment: true, age: 24 }
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Student.findByIdAndUpdate.mockResolvedValue({
            name:"Juan Jimenez",
            enrollment:true,
			age:20,  
            _id:"123",
            __v:0})
        await studentController.updateStudent(req, res)
        
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({
            name:"Juan Jimenez",
            age:20, 
            enrollment:true, 
            _id:"123",
            __v:0})
        
    })
    it("Deberia devolver un 404 si no encuentra el ID del estudiante para ser actualizado", async ()=>{
        const req = {
            params:{ idStudent:"123" },
            body:{ name: "German Alonso", enrollment: true, age: 24 }
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        Student.findByIdAndUpdate.mockResolvedValue(null)

        await studentController.updateStudent(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith( {message:"student not found"} )
    })
    it("Deberia devolver un 500 cuando falla al obtener el estudiante por otra razon diferente a no encontrarlo",
        async ()=>{
            const req = {
                params:{ idStudent:"123" },
                body:{ name: "German Alonso", enrollment: true, age: 24 }
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            Student.findByIdAndUpdate.mockRejectedValue(new Error("Error en la base de datos"))

            await studentController.updateStudent(req,res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
        }
    )
})

describe("eliminarEstudiante",()=>{
    it("Deberia eliminar un estudiante por ID y devolver un 200", async()=>{
        const req = {
            params:{ idStudent:"123" },
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await Student.findByIdAndDelete.mockResolvedValue({message:`student with id 123 deleted`})

        await studentController.deleteStudent(req,res)

        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.json).toHaveBeenCalledWith({message:`student with id 123 deleted`})
    })

    it("Deberia devolver un 404 si no encuentra el ID del estudiante para ser eliminado", async ()=>{
        const req = {
            params:{ idStudent:"123"},
        }
        const res ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await Student.findByIdAndDelete.mockResolvedValue(null)

        await studentController.deleteStudent(req,res)

        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.json).toHaveBeenCalledWith({ message: "student not found" });
    })
    it("Deberia devolver un 500 cuando falla al obtener el estudiante por otra razon diferente a no encontrarlo",
        async ()=>{
            const req = {
                params:{ idStudent:"123"},
            }
            const res ={
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
            await Student.findByIdAndDelete.mockRejectedValue(new Error("Error en la base de datos"))

            await studentController.deleteStudent(req,res)

            expect(res.status).toHaveBeenCalledWith(500)
            expect(res.json).toHaveBeenCalledWith({error:"Error en la base de datos"})
        })
})