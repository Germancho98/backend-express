const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// controlador estudiantes

router.get("/", studentController.getStudents);
router.post("/", studentController.createStudent);
router.get("/:idStudent", studentController.getStudentForID);
router.put("/:idStudent", studentController.updateStudent);
router.delete("/:idStudent", studentController.deleteStudent);

module.exports = router;
