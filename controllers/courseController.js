const Course = require("../models/course");

exports.createCourse = async (req, res) => {
	try {
		const newCourse = new Course(req.body);
		await newCourse.save();
		res.status(201).json(newCourse);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getCourse = async (req, res) => {
	try {
		const courses = await Course.find().populate("students");
		res.status(200).json(courses);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.getCourseForID = async (req, res) => {
	try {
		const course = await Course.findById(req.params.id).populate("students");
		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}
		res.status(200).json(course);
	} catch (error) {
		console.error("Error fetching course:", error);
		res.status(500).json({ error: error.message });
	}
};

exports.updateCourse = async (req, res) => {
	try {
		const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		if (!course) {
			return res.status(404).json({ message: "Course not found" });
		}
		res.status(200).json(course);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

exports.deleteCourse = async (req, res) => {
	try {
		const course = await Course.findByIdAndDelete(req.params.id);
		if (!materia) {
			return res
				.status(404)
				.json({ message: `course whit id: ${req.params.id}` });
		}
	} catch (error) {}
};
