const express = require("express");
const mongoose = require("mongoose")
require('dotenv').config();

const studentsRoutes = require("./routes/students")
const courseRoutes = require("./routes/course")
const authRoutes = require("./routes/auth")

const authMiddleware = require("./middlewares/authMiddleware")

const app = express()

//middleware
app.use(express.json())
//conexión dc
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("connected to the database"))
    .catch(err => console.log("Error: Could not establish a connection to the database.", err));

//rutas
app.use("/api/students", studentsRoutes)
app.use("/api/course", authMiddleware, courseRoutes)
app.use("/api", authRoutes)

const PORT = process.env.PORT || 3000

module.exports = app

//app.listen(PORT, ()=> console.log(`servidor escuchando el puerto ${PORT}`))