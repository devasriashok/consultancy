import React, { useState } from "react";

const UsersTable = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Jese Leos", role: "Administrator", status: "Active", profilePic: "https://i.pravatar.cc/40?img=1", social: "https://twitter.com", promoted: false, rating: 4, lastLogin: "2025-03-10 12:45 PM" },
        { id: 2, name: "Bonnie Green", role: "Viewer", status: "Active", profilePic: "https://i.pravatar.cc/40?img=2", social: "https://facebook.com", promoted: true, rating: 5, lastLogin: "2025-03-11 03:20 PM" },
        { id: 3, name: "Leslie Livingston", role: "Moderator", status: "Inactive", profilePic: "https://i.pravatar.cc/40?img=3", social: "https://linkedin.com", promoted: false, rating: 3, lastLogin: "2025-03-12 08:15 AM" }
    ]);

    const [newUserName, setNewUserName] = useState("");
    const [newUserRole, setNewUserRole] = useState("Viewer");

    const addUser = () => {
        if (newUserName.trim() === "") return;

        const newUser = {
            id: users.length + 1,
            name: newUserName,
            role: newUserRole,
            status: "Active",
            profilePic: `https://i.pravatar.cc/40?img=${users.length + 1}`,
            social: "https://twitter.com",
            promoted: false,
            rating: 4,
            lastLogin: new Date().toLocaleString()
        };

        setUsers([...users, newUser]);
        setNewUserName("");
        setNewUserRole("Viewer");
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>All Users: {users.length}</h2>
            {/* Add User Form */}
            <div style={styles.formContainer}>
                <input
                    type="text"
                    placeholder="Enter user name"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    style={styles.input}
                />
                <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    style={styles.select}
                >
                    <option value="Viewer">Viewer</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Administrator">Administrator</option>
                </select>
                <button onClick={addUser} style={styles.addButton}>+ Add User</button>
            </div>
            {/* Users Table */}
            <table style={styles.table}>
                <thead>
                    <tr style={styles.headerRow}>
                        <th style={styles.th}>USER</th>
                        <th style={styles.th}>ROLE</th>
                        <th style={styles.th}>STATUS</th>
                        <th style={styles.th}>SOCIAL PROFILE</th>
                        <th style={styles.th}>PROMOTE</th>
                        <th style={styles.th}>RATING</th>
                        <th style={styles.th}>LAST LOGIN</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} style={styles.row}>
                            <td style={styles.userCell}>
                                <img src={user.profilePic} alt="profile" style={styles.avatar} />
                                {user.name}
                            </td>
                            <td style={{ ...styles.td, ...styles.role(user.role) }}>{user.role}</td>
                            <td style={styles.td}>{user.status}</td>
                            <td style={styles.td}>
                                <a href={user.social} target="_blank" rel="noopener noreferrer" style={styles.socialIcon}>🔗</a>
                            </td>
                            <td style={styles.td}>
                                <input type="checkbox" checked={user.promoted} onChange={() => {}} />
                            </td>
                            <td style={styles.td}>
                                {"⭐".repeat(user.rating)}
                            </td>
                            <td style={styles.td}>{user.lastLogin}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Inline CSS Styles
const styles = {
    container: {
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f8f9fa"
    },
    title: {
        fontSize: "18px",
        marginBottom: "10px",
    },
    formContainer: {
        display: "flex",
        gap: "10px",
        marginBottom: "15px"
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        flex: "1"
    },
    select: {
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "5px"
    },
    addButton: {
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "5px",
        cursor: "pointer"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)"
    },
    headerRow: {
        backgroundColor: "#f1f3f5",
        textAlign: "left",
    },
    th: {
        padding: "10px",
        fontWeight: "bold",
        borderBottom: "2px solid #e0e0e0",
    },
    row: {
        borderBottom: "1px solid #e0e0e0",
    },
    td: {
        padding: "10px",
    },
    userCell: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
    },
    avatar: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
    },
    socialIcon: {
        textDecoration: "none",
        fontSize: "20px",
    },
    role: (role) => ({
        color: role === "Administrator" ? "blue" : role === "Moderator" ? "purple" : "black",
        fontWeight: "bold",
    })
};

export default UsersTable;
