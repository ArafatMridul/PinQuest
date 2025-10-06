import express from "express";
import {
    createNewJournalEntry,
    getAllJournals,
} from "../controllers/journal.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createNewJournalEntry);
router.get("/:userId", getAllJournals);

export default router;
