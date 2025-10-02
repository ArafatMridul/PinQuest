import express from "express";
import {
    sigupNewUser,
    loginUser,
    getUserProfile,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/signup", sigupNewUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUserProfile);

export default router;
