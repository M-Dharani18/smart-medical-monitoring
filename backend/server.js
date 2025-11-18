const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const patientRoutes = require("./routes/patients");
const doctorsRoutes = require('./routes/doctors');
const prescriptionRoutes = require('./routes/prescriptions');
const appointmentRoutes = require("./routes/appointments");
const caregiverRoutes = require('./routes/caregivers');
const vitalsRoutes = require('./routes/Vitals');

require("dotenv").config();

// Initialize app
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use('/api/vitals', vitalsRoutes); 

// app.use("/api", patientRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Smart Medical Monitoring API is running 🚀" });
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/smart-medical";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
