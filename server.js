const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./model/User");
const Project = require("./model/Project");
const Employee = require("./model/Employee");

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// JWT Middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

// ------------------------ Auth Routes ------------------------

app.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });

    await newUser.save();
    res.status(201).json({ message: "User Registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: `Welcome, user with ID: ${req.user.id}` });
});

// ------------------------ Project Routes ------------------------

app.post("/api/projects", async (req, res) => {
  const { title, description, status, employees, location, estimation } = req.body;

  try {
    const newProject = new Project({ title, description, status, employees, location, estimation });
    await newProject.save();
    res.status(201).json({ message: "Project added successfully", project: newProject });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const projects = await Project.find().populate("employees");
    res.json({ projects });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status, employees, location, estimation } = req.body;

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, status, employees, location, estimation },
      { new: true }
    );
    if (!updatedProject) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project updated successfully", project: updatedProject });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete("/api/projects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) return res.status(404).json({ message: "Project not found" });

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Assign employees to project
app.put("/api/projects/:id/assign", async (req, res) => {
  const { id } = req.params;
  const { employees } = req.body;

  try {
    const project = await Project.findById(id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    project.employees = employees;
    await project.save();

    res.json({ message: "Employees assigned successfully", project });
  } catch (err) {
    res.status(500).json({ message: "Failed to assign employees", error: err.message });
  }
});

// ------------------------ Employee Routes ------------------------

app.post("/api/employees", async (req, res) => {
  const {
    emp_id,
    emp_name,
    qualification,
    age,
    email,
    contact_details,
    position
  } = req.body;

  try {
    const newEmployee = new Employee({
      emp_id,
      emp_name,
      qualification,
      age,
      email,
      contact_details,
      position
    });

    await newEmployee.save();
    res.status(201).json({ message: "Employee added successfully", employee: newEmployee });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/projects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      console.log("Project not found with id:", id);
      return res.status(404).json({ message: "Project not found" });
    }

    Object.assign(project, req.body);
    await project.save();

    res.json({ message: "Project updated successfully", project });
  } catch (err) {
    console.error("Update error:", err.message);
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});


app.delete("/api/projects/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Project.findByIdAndDelete(id);
    if (!result) {
      console.log("Delete failed: Project not found with id:", id);
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ message: "Delete failed", error: err.message });
  }
});

// ------------------------ Start Server ------------------------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
