const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { 
        type: String, 
        enum: ["Ongoing", "Completed"], 
        required: true 
    },
    employees: { type: Number, required: true },
    location: { type: String, required: true },
    estimation: { type: Number, required: true } // Estimated cost or duration
});

module.exports = mongoose.model("Project", ProjectSchema);