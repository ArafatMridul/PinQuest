import path from "node:path";
import {
    getJournals,
    insertIntoJourna,
    updateJournalEntry,
} from "../services/journal.service.js";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

export const createNewJournalEntry = async (req, res) => {
    const { title, story, city, visitedLocation, visitedDate, imageURL } =
        req.body;
    const userId = req.user.id;

    if (!title || !story || !visitedLocation || !visitedDate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const result = await insertIntoJourna({
        userId,
        title,
        story,
        visitedLocation,
        visitedDate,
        imageURL,
        city,
    });

    if (!result) {
        return res
            .status(400)
            .json({ error: "something went wrong during insertion" });
    }

    return res
        .status(201)
        .json({ message: "Story is added successfully.", id: result.id });
};

export const getAllJournals = async (req, res) => {
    const { userId } = req.params;

    const result = await getJournals(userId);

    if (result.length === 0) {
        return res.status(400).json({
            error: "something went wrong during getting all journal records",
        });
    }

    return res.json(result);
};

export const imageUpload = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No image file uploaded" });
    }
    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;
    return res.status(201).json({ imageUrl });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

export const deleteImages = async (req, res) => {
    const { imageURL } = req.query;
    if (!imageURL) {
        return res.status(400).json({ error: "No image URL provided" });
    }

    try {
        const filename = path.basename(imageURL);
        const filePath = path.join(rootDir, "uploads", filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: "File not found" });
        }
        await fs.promises.unlink(filePath);
        return res.json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting file:", error);
        return res.status(500).json({ error: "Error deleting file" });
    }
};

export const editJournalStory = async (req, res) => {
    const { id } = req.params;
    const { title, story, city, visitedLocation, visitedDate, imageURL } =
        req.body;
    const userId = req.user.id;

    if (!title || !story || !visitedLocation || !visitedDate) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const placeholderImageURL = "http://localhost:8000/assets/placeholder.jpg";
    const result = await updateJournalEntry(id, {
        userId,
        title,
        story,
        visitedLocation,
        visitedDate,
        imageURL: imageURL || placeholderImageURL,
        city,
    });

    if (!result) {
        return res
            .status(400)
            .json({ error: "something went wrong during updating" });
    }

    return res
        .status(200)
        .json({ message: "Story is updated successfully.", id: result.id });
};
