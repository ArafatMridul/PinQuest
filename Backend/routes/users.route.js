import express from "express";
import { sigupNewUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", sigupNewUser);
router.post("/login", loginUser);

export default router;
