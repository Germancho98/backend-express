const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

router.post("/", courseController.createCourse);
router.get("/", courseController.getCourse);
router.get("/:id", courseController.getCourseForID);
router.put("/:id", courseController.updateCourse);

module.exports = router;
