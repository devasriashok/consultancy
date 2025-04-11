const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  emp_id: {
    type: String,
    required: true,
    unique: true
  },
  emp_name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true,
    min: 18
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, "Please enter a valid email"]
  },
  contact_details: {
    primary: {
      type: String,
      required: true
    },
    emergency: {
      type: String,
      required: false
    }
  },
  position: {
    type: String,
    enum: [
      "Project Manager",
      "Site Manager",
      "Site Supervisor",
      "Site Engineer",
      "Worker"
    ],
    required: true
  }
});

module.exports = mongoose.model("Employee", employeeSchema);
