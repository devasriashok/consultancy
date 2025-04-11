import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa";

const ManagerDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [adminName, setAdminName] = useState("Admin");
    const [initial, setInitial] = useState("A");
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedAdmin = JSON.parse(localStorage.getItem("user"));
        if (storedAdmin?.name) {
            setAdminName(storedAdmin.name);
            setInitial(storedAdmin.name.charAt(0).toUpperCase());
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
        navigate("/");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <nav
                style={{
                    width: isSidebarOpen ? "220px" : "0px",
                    height: "100vh",
                    background: "#2c3e50",
                    padding: isSidebarOpen ? "20px" : "0px",
                    overflow: "hidden",
                    transition: "width 0.3s ease-in-out",
                    color: "white",
                }}
            >
                {isSidebarOpen && (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li style={{ marginBottom: "12px" }}>
                            <Link to="manageusers" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Manage Users</Link>
                        </li>
                        <li style={{ marginBottom: "12px" }}>
                            <Link to="reports" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Reports</Link>
                        </li>
                        <li style={{ marginBottom: "12px" }}>
                            <Link to="settings" style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}>Settings</Link>
                        </li>
                    </ul>
                )}
            </nav>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                {/* Header */}
                <header
                    style={{
                        background: "#34495e",
                        padding: "15px 20px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{
                            background: "none",
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "20px",
                        }}
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Admin Profile Section */}
                    <div style={{ position: "relative" }}>
                        <div
                            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <span>{adminName}</span>
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: "#e67e22",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontWeight: "bold",
                                    fontSize: "16px",
                                }}
                            >
                                {initial}
                            </div>
                        </div>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                            <div
                                style={{
                                    position: "absolute",
                                    top: "50px",
                                    right: "0",
                                    background: "white",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                    borderRadius: "5px",
                                    overflow: "hidden",
                                    zIndex: "1000",
                                }}
                            >
                                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                                    <li
                                        style={{
                                            padding: "10px 20px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            transition: "0.3s",
                                            color: "#333",
                                        }}
                                    >
                                        <FaUser /> Profile
                                    </li>
                                    <li
                                        onClick={handleLogout}
                                        style={{
                                            padding: "10px 20px",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "10px",
                                            transition: "0.3s",
                                            color: "#d9534f",
                                        }}
                                    >
                                        <FaSignOutAlt /> Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>

                
            </div>
        </div>
    );
};

export default ManagerDashboard;
