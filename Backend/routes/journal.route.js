import express from "express";
import {
    createNewJournalEntry,
    getAllJournals,
    imageUpload,
    deleteImages,
} from "../controllers/journal.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/", authMiddleware, createNewJournalEntry);
router.get("/:userId", authMiddleware, getAllJournals);
router.post("/images-upload", upload.single("image"), imageUpload);
router.delete("/delete-images", deleteImages);

export default router;
