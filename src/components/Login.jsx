import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Login.module.css"; // Import CSS module

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      const roleRedirect = {
        Admin: "/admin-dashboard",
        Manager: "/manager-dashboard",
        Employee: "/employee-dashboard",
      };

      alert(`Login successful! Welcome, ${user.name}`);
      navigate(roleRedirect[user.role] || "/");
    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <div className={styles["login-page"]}>
      {/* Left Side - Image */}
      <div className={styles["login-image-container"]}>
        <img 
          src="https://img.freepik.com/free-vector/organic-flat-engineers-working-construction-site-illustration_23-2148909837.jpg?ga=GA1.1.1995240481.1731166665&semt=ais_authors_boost" 
          alt="Login" 
          className={styles["login-image"]} 
        />
      </div>

      {/* Right Side - Login Form */}
      <div className={styles["login-container"]}>
        <h2>Login</h2>
        <form className={styles["login-form"]} onSubmit={handleLogin}>
          <label>Email:</label>
          <input type="email" name="email" placeholder="Enter email" required onChange={handleChange} />

          <label>Password:</label>
          <input type="password" name="password" placeholder="Enter password" required onChange={handleChange} />

          <button type="submit">Login</button>
        </form>
        <p className={styles["login-footer"]}>
          Don't have an account? <button onClick={() => navigate("/signup")}>Sign up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
