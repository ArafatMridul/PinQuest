import express from "express";
import "dotenv/config";
import userRouter from "./routes/users.route.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(express.json());

app.use("/users", userRouter);

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
});
