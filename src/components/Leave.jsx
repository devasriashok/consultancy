import React, { useState } from "react";

const EmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const employees = [
    { name: "Ignatious Anto", img: "https://randomuser.me/api/portraits/men/1.jpg", leaves: [] },
    { name: "Joe Kuriyan", img: "https://randomuser.me/api/portraits/men/2.jpg", leaves: [] },
    { name: "Pavithra Orakkan", img: "https://randomuser.me/api/portraits/women/3.jpg", leaves: [] },
    { name: "Duke Silver", img: "https://randomuser.me/api/portraits/men/4.jpg", leaves: [] },
    { name: "Janani Iyer", img: "https://randomuser.me/api/portraits/women/5.jpg", leaves: [{ type: "Paid", start: 18, end: 19 }] },
    { name: "Manjuna Mohan", img: "https://randomuser.me/api/portraits/men/6.jpg", leaves: [] },
    { name: "Mammootty", img: "https://randomuser.me/api/portraits/men/7.jpg", leaves: [] },
    { name: "Sahane Nigam", img: "https://randomuser.me/api/portraits/women/8.jpg", leaves: [{ type: "Sick", start: 22, end: 22 }] },
    { name: "Dulquer Salman", img: "https://randomuser.me/api/portraits/men/9.jpg", leaves: [] },
    { name: "Fahadh Faasil", img: "https://randomuser.me/api/portraits/men/10.jpg", leaves: [] },
    { name: "Nazriya Nazim", img: "https://randomuser.me/api/portraits/women/11.jpg", leaves: [] },
    { name: "Prithvi Raj", img: "https://randomuser.me/api/portraits/men/12.jpg", leaves: [{ type: "Casual", start: 26, end: 26 }] },
    { name: "Antony Varghese", img: "https://randomuser.me/api/portraits/men/13.jpg", leaves: [{ type: "Paid", start: 27, end: 28 }] },
  ];

  const leaveTypes = {
    Bereavement: "#E57373",
    Casual: "#42A5F5",
    Paid: "#FFB74D",
    Sick: "#9575CD",
    Volunteer: "#F06292",
  };

  const leaveCounts = {
    Bereavement: 2,
    Casual: 3,
    Paid: 4,
    Sick: 2,
    Volunteer: 1,
  };

  // Filter employees based on search term
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={styles.heading}>Total Employees</h2>
        <p style={styles.bigText}>1832</p>
        <h3>No of working employees</h3>
        <p style={styles.bigText}>1796</p>
        <h3>Pending Approval</h3>
        <p style={styles.bigText}>39</p>

        {/* Leave Statistics Graph */}
        <h3>Leave Statistics</h3>
        <div style={styles.leaveStats}>
          {Object.entries(leaveCounts).map(([type, count]) => (
            <div key={type} style={{ marginBottom: "10px" }}>
              <p>{type}</p>
              <div
                style={{
                  ...styles.leaveBar,
                  backgroundColor: leaveTypes[type],
                  width: `${count * 20}px`,
                }}
              >
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main View */}
      <div style={styles.main}>
        <div style={styles.header}>
          <h2>Employee View | Jun 18-28, 2022</h2>
          <input
            style={styles.search}
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Timeline Grid */}
        <div style={styles.timeline}>
          {/* Employee List */}
          <div style={styles.employeeColumn}>
            {filteredEmployees.map((emp, index) => (
              <div key={index} style={styles.employee}>
                <img src={emp.img} alt={emp.name} style={styles.avatar} />
                <p>{emp.name}</p>
              </div>
            ))}
          </div>

          {/* Calendar View */}
          <div style={styles.calendar}>
            {[...Array(11)].map((_, day) => (
              <div key={day} style={styles.dayColumn}>
                <p>{18 + day} Jun</p>
                {filteredEmployees.map((emp, index) => {
                  const leave = emp.leaves.find(
                    (l) => l.start <= 18 + day && l.end >= 18 + day
                  );
                  return leave ? (
                    <div
                      key={index}
                      style={{
                        ...styles.leaveBlock,
                        backgroundColor: leaveTypes[leave.type],
                        left: `${(leave.start - 18) * 9}%`,
                        width: `${(leave.end - leave.start + 1) * 9}%`,
                      }}
                    />
                  ) : null;
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: { display: "flex", fontFamily: "Arial, sans-serif", height: "100vh" },
  sidebar: { width: "250px", padding: "20px", background: "#f8f9fa", borderRight: "1px solid #ddd" },
  heading: { fontSize: "18px", margin: "10px 0" },
  bigText: { fontSize: "24px", fontWeight: "bold" },
  leaveStats: { marginTop: "10px", paddingLeft: "10px" },
  leaveBar: { height: "20px", color: "#fff", textAlign: "center", borderRadius: "5px", padding: "2px 5px" },
  main: { flex: 1, padding: "20px" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  search: { padding: "8px", borderRadius: "4px", border: "1px solid #ddd", width: "200px" },
  timeline: { display: "flex", borderTop: "1px solid #ddd" },
  employeeColumn: { width: "200px", borderRight: "1px solid #ddd", padding: "10px" },
  employee: { display: "flex", alignItems: "center", marginBottom: "10px" },
  avatar: { width: "30px", height: "30px", borderRadius: "50%", marginRight: "10px" },
  calendar: { flex: 1, display: "flex" },
  dayColumn: { flex: 1, borderRight: "1px solid #ddd", padding: "10px", position: "relative" },
  leaveBlock: { position: "absolute", height: "20px", borderRadius: "4px", top: "50%", transform: "translateY(-50%)" },
};

export default EmployeeDashboard;
