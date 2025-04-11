import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from "react-icons/fa";

const EmployeeDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [userName, setUserName] = useState("User");
    const [initial, setInitial] = useState("U");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser?.name) {
            setUserName(storedUser.name);
            setInitial(storedUser.name.charAt(0).toUpperCase());
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <div style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar */}
            <nav
                style={{
                    width: isSidebarOpen ? "200px" : "0px",
                    height: "100vh",
                    background: "#f4f4f4",
                    padding: isSidebarOpen ? "20px" : "0px",
                    overflow: "hidden",
                    transition: "width 0.3s ease-in-out",
                }}
            >
                {isSidebarOpen && (
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        {["Home", "Employees", "Departments", "Settings"].map((item, index) => (
                            <li key={index} style={{ marginBottom: "10px" }}>
                                <Link
                                    to={`/${item.toLowerCase()}`}
                                    style={{
                                        textDecoration: "none",
                                        color: location.pathname === `/${item.toLowerCase()}` ? "#007bff" : "#333",
                                        fontWeight: "bold",
                                        display: "block",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        transition: "0.3s",
                                        background: location.pathname === `/${item.toLowerCase()}` ? "#d0e2ff" : "#e0e0e0",
                                    }}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                {/* Header */}
                <header
                    style={{
                        background: "#282c34",
                        padding: "15px 20px",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    {/* Sidebar Toggle */}
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

                    {/* Search Input */}
                    <input
                        type="text"
                        placeholder="Search..."
                        style={{
                            padding: "8px 12px",
                            borderRadius: "20px",
                            border: "none",
                            outline: "none",
                            width: "250px",
                        }}
                    />

                    {/* User Profile Section */}
                    <div style={{ position: "relative" }}>
                        <div
                            style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <span>{userName}</span>
                            <div
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    backgroundColor: "#4CAF50",
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

                {/* Page Content Loaded Here */}
                <div style={{ padding: "20px" }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
