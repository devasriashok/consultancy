import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import SlidingImages from "./SlidingImages";

const AdminDashboard = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [adminName, setAdminName] = useState("Admin");
    const [initial, setInitial] = useState("A");
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    const location = useLocation();
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

    // Settings for the image slider
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        fade: true
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            
            {/* Sidebar */}
            <nav 
                style={{ 
                    width: isSidebarOpen ? '220px' : '0px',
                    height: '100vh',
                    background: '#2c3e50',
                    padding: isSidebarOpen ? '20px' : '0px',
                    overflow: 'hidden',
                    transition: 'width 0.3s ease-in-out',
                    color: 'white'
                }}
            >
                {isSidebarOpen && (
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {["Careers", "Project", "Employee", "Mail request"].map((item, index) => (
                            <li key={index} style={{ marginBottom: '12px' }}>
                                <Link 
                                    to={`/${item.toLowerCase().replace(/\s+/g, '')}`} 
                                    style={{ 
                                        textDecoration: 'none', 
                                        color: location.pathname === `/${item.toLowerCase().replace(/\s+/g, '')}` ? '#1abc9c' : 'white',
                                        fontWeight: 'bold', 
                                        display: 'block', 
                                        padding: '12px', 
                                        borderRadius: '5px', 
                                        transition: '0.3s', 
                                        background: location.pathname === `/${item.toLowerCase().replace(/\s+/g, '')}` ? '#34495e' : '#3a4f64' 
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
                <header style={{ 
                    background: '#34495e', 
                    padding: '15px 20px', 
                    color: 'white', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between' 
                }}>
                    
                    {/* Sidebar Toggle */}
                    <button 
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            cursor: 'pointer',
                            fontSize: '20px',
                        }}
                    >
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {/* Search Input */}
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        style={{ 
                            padding: '8px 12px', 
                            borderRadius: '20px', 
                            border: 'none', 
                            outline: 'none', 
                            width: '250px' 
                        }} 
                    />

                    {/* Admin Profile Section */}
                    <div style={{ position: 'relative' }}>
                        <div 
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
                            onClick={() => setShowProfileMenu(!showProfileMenu)}
                        >
                            <span>{adminName}</span>
                            <div 
                                style={{ 
                                    width: '40px', 
                                    height: '40px', 
                                    borderRadius: '50%', 
                                    backgroundColor: '#e67e22',
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    color: 'white', 
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                }}
                            >
                                {initial}
                            </div>
                        </div>

                        {/* Profile Dropdown */}
                        {showProfileMenu && (
                            <div 
                                style={{ 
                                    position: 'absolute',
                                    top: '50px',
                                    right: '0',
                                    background: 'white',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                                    borderRadius: '5px',
                                    overflow: 'hidden',
                                    zIndex: '1000'
                                }}
                            >
                                <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                                    <li 
                                        style={{ 
                                            padding: '10px 20px', 
                                            cursor: 'pointer', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '10px',
                                            transition: '0.3s',
                                            color: '#333'
                                        }}
                                    >
                                        <FaUser /> Profile
                                    </li>
                                    <li 
                                        onClick={handleLogout}
                                        style={{ 
                                            padding: '10px 20px', 
                                            cursor: 'pointer', 
                                            display: 'flex', 
                                            alignItems: 'center', 
                                            gap: '10px',
                                            transition: '0.3s',
                                            color: '#d9534f'
                                        }}
                                    >
                                        <FaSignOutAlt /> Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </header>

                {/* Page Content with Image Carousel */}
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <h2>Welcome to the Vishakan Builders</h2>
                    <p>Manage users, view reports, and configure system settings here.</p>

                    {/* Image Slider */}
                    <div style={{ maxWidth: '400px', margin: '20px auto' }}>
                        <Slider {...sliderSettings}>
                            <img src="https://img.freepik.com/free-photo/excavator-action_1112-1598.jpg?ga=GA1.1.1995240481.1731166665&semt=ais_hybrid&w=740" alt="Tech 1" style={{ width: '100%', borderRadius: '10px' }} />
                            <img src="https://img.freepik.com/free-vector/construction-concept-illustration_114360-2558.jpg?ga=GA1.1.1995240481.1731166665&semt=ais_hybrid&w=740" alt="Tech 2" style={{ width: '100%', borderRadius: '10px' }} />
                            <img src="https://media.istockphoto.com/id/2169553797/photo/silhouette-engineer-at-construction-site-against-sky-during-sunset.jpg?s=612x612&w=0&k=20&c=qTj-d5pub5Phvg8rNKTa36T92VWgesQYHZdLjgYbc30=" alt="Tech 3" style={{ width: '100%', borderRadius: '10px' }} />
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
