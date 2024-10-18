const Student = require("../models/student");

exports.getStudents = async (req, res) => {
	try {
		const students = await Student.find();
		res.status(200).json(students);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.createStudent = async (req, res) => {
	try {
		console.log(req.body);
		const newStudent = new Student(req.body);
		await newStudent.save();
		res.status(201).json(newStudent);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getStudentForID = async (req, res) => {
	try {
		const idStudent = req.params.idStudent;
		const student = await Student.findById(idStudent);
		if (!student) {
			res.status(404).json({ message: "student not found" });
		}
		res.status(200).json(student);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.updateStudent = async (req, res) => {
	try {
		const idStudent = req.params.idStudent;
		const newStudent = req.body;
		const student = await Student.findByIdAndUpdate(idStudent, newStudent);
		if (!student) {
			res.status(404).json({ message: "student not found" });
		}
		res.status(200).json(student);
		console.log(`Updated student ID ${idStudent}`);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteStudent = async (req, res) => {
	try {
		const idStudent = req.params.idStudent;
		const student = await Student.findByIdAndDelete(idStudent);
		if (!student) {
			res.status(404).json({ message: "student not found" });
		}
		console.log(student);
		res.status(200).json({ message: `student with id ${idStudent} deleted` });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
