import express from "express";
import "dotenv/config";
import userRouter from "./routes/users.route.js";
import journalRouter from "./routes/journal.route.js";

import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());

// Image upload middleware setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Routes
app.use("/users", userRouter);
app.use("/journal", journalRouter);

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
