import express from "express";
import {
    sigupNewUser,
    loginUser,
    getUserProfile,
    getProfileInfoInDashboard,
    setOrEditProfileInfoInDashboard,
} from "../controllers/user.controller.js";

import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.post("/signup", sigupNewUser);
router.post("/login", loginUser);
router.get("/user", authMiddleware, getUserProfile);
router.get("/profile", authMiddleware, getProfileInfoInDashboard);
router.post("/profile/insert", authMiddleware, setOrEditProfileInfoInDashboard);

export default router;
