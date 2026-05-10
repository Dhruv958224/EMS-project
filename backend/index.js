import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDatabase from "./db/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import departmentRoutes from "./routes/department.js";
import salaryRoutes from "./routes/salary.js";
import employeeRoutes from "./routes/employee.js";
import settingRoutes from "./routes/setting.js";
import leaveRoutes from "./routes/leave.js";
import dashboardRoutes from "./routes/dashboard.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({
  origin: 

    "https://ems-frontend-nu-coral.vercel.app",
  
  credentials: true
}));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/setting", settingRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`✅ Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect DB:", error.message);
    process.exit(1); // stop if DB fails
  }
};

startServer();