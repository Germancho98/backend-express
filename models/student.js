const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
	},
	enrollment: {
		type: Boolean,
		require: true,
		default: false,
	},
	age: Number,
});
module.exports = mongoose.model("Student", studentSchema);
