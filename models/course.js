const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	students: [
		{
			type: Schema.Types.ObjectId,
			ref: "Student",
		},
	],
	professor: {
		type: String,
		require: true,
	},
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
