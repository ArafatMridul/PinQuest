import express from "express";
import {
    createNewJournalEntry,
    getAllJournals,
    imageUpload,
} from "../controllers/journal.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/", authMiddleware, createNewJournalEntry);
router.get("/:userId", authMiddleware, getAllJournals);
router.post("/images-upload", upload.single("image"), imageUpload);

export default router;
