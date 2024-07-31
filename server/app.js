const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5005;
const studentRouter = require("./routes/Students.routes");
const cohortRouter = require("./routes/Cohorts.routes");

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
// ...
const cohorts = require("./models/cohorts");
const students = require("./models/students");
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
// ...

app.use(
  cors({
    origin: ["http://localhost:5005"], // Allow all origins
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/Students.routes", studentRouter);
app.use("/Cohorts.routes", cohortRouter);

// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:
// ...
app.post("/", async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all students
app.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get students by cohort ID
app.get("/cohort/:cohortId", async (req, res) => {
  try {
    const students = await Student.find({ cohort: req.params.cohortId });
    res.send(students);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a student by ID
app.get("/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a student by ID
app.put("/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.studentId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a student by ID
app.delete("/:studentId", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.studentId);
    if (!student) return res.status(404).send();
    res.send(student);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/docs", (req, res) => {
  res.sendFile(__dirname + "/views/docs.html");
});
app.get("/api/cohorts", async (req, res) => {
  try {
    const cohorts = await Cohort.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(cohorts);
  } catch (error) {
    res.status(500).send(error);
  }
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
