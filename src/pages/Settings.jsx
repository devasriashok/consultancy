import React from "react";

const Settings = () => {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", backgroundColor: "#f4f4f4" }}>
      <h2 style={{ color: "#333", borderBottom: "2px solid #007bff", paddingBottom: "10px" }}>
        ⚙️ Admin Settings
      </h2>

      {/* Profile Settings */}
      <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}>
        <h3 style={{ color: "#007bff" }}>👤 Profile Settings</h3>
        <p>Update your profile details, email, and password.</p>
        <button style={{ background: "#007bff", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Edit Profile
        </button>
      </div>

      {/* Security Settings */}
      <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}>
        <h3 style={{ color: "#dc3545" }}>🔒 Security</h3>
        <p>Manage passwords, enable two-factor authentication, and configure security settings.</p>
        <button style={{ background: "#dc3545", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Update Security
        </button>
      </div>

      {/* Notification Settings */}
      <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}>
        <h3 style={{ color: "#28a745" }}>📢 Notifications</h3>
        <p>Set email and SMS notifications for system updates.</p>
        <button style={{ background: "#28a745", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Manage Notifications
        </button>
      </div>

      {/* Backup & Restore */}
      <div style={{ background: "#fff", padding: "15px", borderRadius: "8px", marginBottom: "15px", boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}>
        <h3 style={{ color: "#ff9800" }}>💾 Backup & Restore</h3>
        <p>Backup data or restore previous versions.</p>
        <button style={{ background: "#ff9800", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Backup Now
        </button>
      </div>
    </div>
  );
};

export default Settings;
