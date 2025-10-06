import express from "express";
import {
    createNewJournalEntry,
    getAllJournals,
    imageUpload,
    deleteImages,
    editJournalStory,
    deleteJournal,
    updateisFavourite,
    searchJournals,
} from "../controllers/journal.controller.js";
import { authMiddleware } from "../middlewares/user.middleware.js";
import { upload } from "../multer.js";

const router = express.Router();

router.post("/", authMiddleware, createNewJournalEntry);
router.get("/search", authMiddleware, searchJournals);
router.get("/:userId", authMiddleware, getAllJournals);
router.post("/images-upload", upload.single("image"), imageUpload);
router.delete("/delete-images", deleteImages);
router.put("/edit-story/:id", authMiddleware, editJournalStory);
router.delete("/delete-journal/:id", authMiddleware, deleteJournal);
router.put("/update-isFavorite/:id", authMiddleware, updateisFavourite);

export default router;
