// src/components/Project.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClipboardCheck,
  FaRegClock,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Project = () => {
  const [project, setProject] = useState({
    title: "",
    description: "",
    status: "Ongoing",
    location: "",
    estimation: "",
  });
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const getRandomStartDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date(2024, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toDateString();
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects");
      const updatedProjects = response.data.projects.map((proj) => ({
        ...proj,
        startDate: proj.startDate || getRandomStartDate(),
      }));
      setProjects(updatedProjects);
    } catch (error) {
      alert("Error fetching projects: " + (error.response?.data?.message || error.message));
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployeeList(response.data.employees);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && selectedProject) {
        await axios.put(`http://localhost:5000/api/projects/${selectedProject._id}`, project);
        alert("Project updated successfully");
      } else {
        const projectData = {
          ...project,
          employees: 0,
          assignedEmployeeIds: [],
          startDate: getRandomStartDate(),
        };
        await axios.post("http://localhost:5000/api/projects", projectData);
        alert("Project added successfully");
      }
      setShowForm(false);
      setIsEditing(false);
      setSelectedProject(null);
      fetchProjects();
    } catch (error) {
      alert("Error submitting project: " + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = () => {
    setProject({
      title: selectedProject.title,
      description: selectedProject.description,
      status: selectedProject.status,
      location: selectedProject.location,
      estimation: selectedProject.estimation,
    });
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`http://localhost:5000/api/projects/${selectedProject._id}`);
        alert("Project deleted successfully");
        setSelectedProject(null);
        fetchProjects();
      } catch (error) {
        alert("Error deleting project: " + (error.response?.data?.message || error.message));
      }
    }
  };

  const assignEmployees = async () => {
    try {
      const mergedEmployees = Array.from(
        new Set([...(selectedProject.assignedEmployeeIds || []), ...selectedEmployees])
      );

      const updatedProject = {
        ...selectedProject,
        assignedEmployeeIds: mergedEmployees,
        employees: mergedEmployees.length,
      };

      await axios.put(`http://localhost:5000/api/projects/${selectedProject._id}/assign`, {
        employees: mergedEmployees.length,
        assignedEmployeeIds: mergedEmployees,
      });

      alert("Employees assigned successfully!");
      setSelectedProject(updatedProject);
      setShowEmployeeDropdown(false);
      fetchProjects();
    } catch (err) {
      alert("Failed to assign employees.");
    }
  };

  const getEmployeeNameById = (id) => {
    const emp = employeeList.find((e) => e._id === id);
    return emp ? `${emp.emp_name} (${emp.position})` : "Unknown";
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {selectedProject && !showForm && (
        <div style={{ width: "100vw", minHeight: "100vh", backgroundColor: "#f4f6f9", padding: "40px 60px" }}>
          <div style={{ backgroundColor: "#fff", padding: "30px 40px", borderRadius: "12px", boxShadow: "0 8px 25px rgba(0,0,0,0.1)", maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#1c1c1c", marginBottom: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
              <FaClipboardCheck /> {selectedProject.title}
            </h1>
            <p style={{ fontSize: "1.1rem", color: "#555", marginBottom: "30px", lineHeight: "1.6" }}>{selectedProject.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px", marginBottom: "20px" }}>
              <div><FaClipboardCheck /> <strong>Status:</strong> {selectedProject.status}</div>
              <div><FaUsers /> <strong>Employees:</strong> {selectedProject.employees}</div>
              <div><FaMapMarkerAlt /> <strong>Location:</strong> {selectedProject.location}</div>
              <div><FaRegClock /> <strong>Estimation:</strong> {selectedProject.estimation} days</div>
              <div><FaCalendarAlt /> <strong>Start Date:</strong> {selectedProject.startDate}</div>
            </div>
            <div style={{ marginBottom: "20px" }}>
              <strong>Assigned Employees:</strong>
              <ul>
                {(selectedProject.assignedEmployeeIds || []).map((empId) => (
                  <li key={empId}>{getEmployeeNameById(empId)}</li>
                ))}
              </ul>
            </div>
            <div style={{ marginTop: "30px" }}>
              <button onClick={() => { setSelectedEmployees([]); setShowEmployeeDropdown(!showEmployeeDropdown); }} style={{ padding: "10px 20px", backgroundColor: "#17a2b8", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                {showEmployeeDropdown ? "Hide Employees" : "Add Employees to Project"}
              </button>
              {showEmployeeDropdown && (
                <div style={{ marginTop: "15px" }}>
                  <select multiple value={selectedEmployees} onChange={(e) => setSelectedEmployees(Array.from(e.target.selectedOptions, (opt) => opt.value))} style={{ width: "100%", height: "120px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}>
                    {employeeList.map((emp) => (
                      <option key={emp._id} value={emp._id}>{emp.emp_name} ({emp.position})</option>
                    ))}
                  </select>
                  <button onClick={assignEmployees} style={{ marginTop: "10px", padding: "8px 15px", backgroundColor: "#28a745", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                    Save Assignment
                  </button>
                </div>
              )}
            </div>
            <div style={{ display: "flex", gap: "15px", justifyContent: "flex-end", marginTop: "30px" }}>
              <button onClick={handleEdit} style={{ padding: "10px 20px", backgroundColor: "#ffc107", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}><FaEdit /> Edit</button>
              <button onClick={handleDelete} style={{ padding: "10px 20px", backgroundColor: "#dc3545", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}><FaTrash /> Delete</button>
              <button onClick={() => setSelectedProject(null)} style={{ padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}><FaArrowLeft /> Back to List</button>
            </div>
          </div>
        </div>
      )}

{!selectedProject && !showForm && (
  <div style={{ padding: "40px", backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
    <h2 style={{ fontSize: "2rem", textAlign: "center", color: "#333", marginBottom: "30px" }}>
      Project List
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
      }}
    >
      {projects.map((proj) => (
        <div
          key={proj._id}
          onClick={() => setSelectedProject(proj)}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "12px",
            padding: "25px",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
            transition: "transform 0.2s ease-in-out",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <h3 style={{ margin: "0 0 12px", fontSize: "1.2rem", color: "#2c3e50" }}>
            {proj.title}
          </h3>
          <span
            style={{
              padding: "6px 14px",
              backgroundColor:
                proj.status === "Completed" ? "#28a745" : "#ffc107",
              color: "#fff",
              borderRadius: "20px",
              fontSize: "0.9rem",
              fontWeight: "500",
            }}
          >
            {proj.status}
          </span>
        </div>
      ))}
    </div>

    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button
        onClick={() => setShowForm(true)}
        style={{
          padding: "12px 30px",
          fontSize: "1rem",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
          transition: "background-color 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0069d9")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
      >
        + Add Project
      </button>
    </div>
  </div>
)}


      {showForm && (
        <div style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
          <h2>{isEditing ? "Edit Project" : "Add New Project"}</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <input type="text" name="title" value={project.title} onChange={handleChange} required placeholder="Title" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <textarea name="description" value={project.description} onChange={handleChange} required placeholder="Description" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <select name="status" value={project.status} onChange={handleChange} required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
            </select>
            <input type="text" name="location" value={project.location} onChange={handleChange} required placeholder="Location" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <input type="number" name="estimation" value={project.estimation} onChange={handleChange} required placeholder="Estimation (in days)" style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
            <div style={{ display: "flex", gap: "10px" }}>
              <button type="submit" style={{ padding: "10px 20px", backgroundColor: "green", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>Submit</button>
              <button type="button" onClick={() => { setShowForm(false); setIsEditing(false); }} style={{ padding: "10px 20px", backgroundColor: "red", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Project;