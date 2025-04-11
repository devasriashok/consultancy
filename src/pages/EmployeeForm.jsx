import React, { useState } from "react";
import axios from "axios";

const EmployeeForm = () => {
  const [formData, setFormData] = useState({
    emp_id: "",
    emp_name: "",
    qualification: "",
    age: "",
    email: "",
    contact_primary: "",
    contact_emergency: "",
    position: "Project Manager"
  });

  const [employees, setEmployees] = useState([]);
  const [showEmployeeList, setShowEmployeeList] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      emp_id: formData.emp_id,
      emp_name: formData.emp_name,
      qualification: formData.qualification,
      age: formData.age,
      email: formData.email,
      contact_details: {
        primary: formData.contact_primary,
        emergency: formData.contact_emergency
      },
      position: formData.position
    };

    try {
      await axios.post("http://localhost:5000/api/employees", payload);
      alert("Employee added successfully!");
      setFormData({
        emp_id: "",
        emp_name: "",
        qualification: "",
        age: "",
        email: "",
        contact_primary: "",
        contact_emergency: "",
        position: "Project Manager"
      });
    } catch (error) {
      alert("Failed to add employee.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");
      setEmployees(response.data.employees);
      setShowEmployeeList(true);
    } catch (error) {
      alert("Failed to fetch employees.");
    }
  };

  const handleBack = () => {
    setShowEmployeeList(false);
  };

  if (showEmployeeList) {
    return (
      <div style={{ padding: "40px", fontFamily: "Arial" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "16px" }}>Employee List</h2>
        <button
          onClick={handleBack}
          style={{
            marginBottom: "16px",
            padding: "8px 12px",
            backgroundColor: "#6c757d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          ← Back to Add Employee
        </button>
        <table border="1" cellPadding="8" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Qualification</th>
              <th>Age</th>
              <th>Email</th>
              <th>Primary Contact</th>
              <th>Emergency Contact</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.emp_id}>
                <td>{emp.emp_id}</td>
                <td>{emp.emp_name}</td>
                <td>{emp.qualification}</td>
                <td>{emp.age}</td>
                <td>{emp.email}</td>
                <td>{emp.contact_details.primary}</td>
                <td>{emp.contact_details.emergency}</td>
                <td>{emp.position}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "700px",
      margin: "40px auto",
      padding: "30px",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
      fontFamily: "Arial"
    }}>
      <h2 style={{
        marginBottom: "24px",
        fontSize: "1.75rem",
        fontWeight: "bold",
        color: "#333",
        textAlign: "center"
      }}>
        Add New Employee
      </h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { label: "Employee ID", name: "emp_id", type: "text" },
          { label: "Employee Name", name: "emp_name", type: "text" },
          { label: "Qualification", name: "qualification", type: "text" },
          { label: "Age", name: "age", type: "number" },
          { label: "Email", name: "email", type: "email" },
          { label: "Primary Contact", name: "contact_primary", type: "text" },
          { label: "Emergency Contact", name: "contact_emergency", type: "text" }
        ].map((field) => (
          <label key={field.name} style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
            {field.label}
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              required={field.name !== "contact_emergency"}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginTop: "6px",
                fontSize: "1rem"
              }}
            />
          </label>
        ))}

        <label style={{ display: "flex", flexDirection: "column", fontWeight: "bold" }}>
          Position
          <select
            name="position"
            value={formData.position}
            onChange={handleChange}
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginTop: "6px",
              fontSize: "1rem"
            }}
          >
            <option value="Project Manager">Project Manager</option>
            <option value="Site Manager">Site Manager</option>
            <option value="Site Supervisor">Site Supervisor</option>
            <option value="Site Engineer">Site Engineer</option>
            <option value="Worker">Worker</option>
          </select>
        </label>

        <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
          <button
            type="submit"
            style={{
              flex: 1,
              backgroundColor: "#28a745",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Add Employee
          </button>

          <button
            type="button"
            onClick={fetchEmployees}
            style={{
              flex: 1,
              backgroundColor: "#007bff",
              color: "#fff",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            View Employees
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
