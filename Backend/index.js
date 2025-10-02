import express from "express";
import "dotenv/config";
import userRouter from "./routes/users.route.js";
import cors from "cors";

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

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
