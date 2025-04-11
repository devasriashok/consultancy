import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./SignUp.module.css"; // Import CSS module

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Employee" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/signup", formData);
      alert(response.data.message);
      navigate("/");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className={styles["signup-page"]}>
      {/* Left Side - Image */}
      <div className={styles["signup-image-container"]}>
        <img 
          src="https://plus.unsplash.com/premium_vector-1682299692411-5bd547d070c1?q=80&w=2362&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Signup" 
          className={styles["signup-image"]} 
        />
      </div>

      {/* Right Side - Signup Form */}
      <div className={styles["signup-form-container"]}>
        <h2>Signup</h2>
        <form className={styles["signup-form"]} onSubmit={handleSignup}>
          <label>Name:</label>
          <input type="text" name="name" placeholder="Enter name" required onChange={handleChange} />

          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter email" required onChange={handleChange} />

          <label>Password:</label>
          <input type="password" name="password" placeholder="Enter password" required onChange={handleChange} />

          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange} required>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="Employee">Employee</option>
          </select>

          <button type="submit">Signup</button>
        </form>
        <p className={styles["signup-footer"]}>
          Already have an account? <button onClick={() => navigate("/")}>Login</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
