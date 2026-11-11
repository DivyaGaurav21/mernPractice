import "dotenv/config";
import cors from "cors";
import express from "express";
// import authRoutes from "./routes/authRoutes";
// import todoRoutes from "./routes/todoRoutes";
import initDB from "./config/initDB";

const app = express();

app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// app.use("/todos", todoRoutes);

const PORT = Number(process.env.PORT || 5000);

const startServer = async (): Promise<void> => {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    await initDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exitCode = 1;
  }
};

void startServer();
