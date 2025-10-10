import path from "node:path";
import {
    deleteJournalEntry,
    getJournalById,
    getJournals,
    insertIntoJourna,
    updateJournalEntry,
} from "../services/journal.service.js";
import { fileURLToPath } from "node:url";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

export const createNewJournalEntry = async (req, res) => {
    const placeholderImageURL = "http://localhost:8000/assets/placeholder.jpg";
    const {
        title,
        story,
        city,
        country,
        visitedLocation,
        visitedDate,
        imageURL,
    } = req.body;
    const userId = req.user.id;

    if (!title || !story || !visitedLocation || !visitedDate || !country) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const result = await insertIntoJourna({
        userId,
        title,
        story,
        visitedLocation,
        visitedDate,
        imageURL: imageURL || placeholderImageURL,
        city,
        country,
    });

    if (!result) {
        return res
            .status(400)
            .json({ error: "something went wrong during insertion" });
    }

    return res
        .status(201)
        .json({ message: "Journal added successfully.", id: result.id });
};

export const getAllJournals = async (req, res) => {
    const { userId } = req.params;

    const result = await getJournals(userId);

    if (result.length === 0) {
        return res.status(400).json({
            error: "No journal entry found. Add journal entries to see them.",
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
        .json({ message: "Journal updated successfully.", id: result.id });
};

export const deleteJournal = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
    if (!id) {
        return res.status(400).json({ error: "Journal ID is required" });
    }

    const Journal = await getJournalById(id);
    if (!Journal) {
        return res.status(404).json({ error: "Journal not found" });
    }

    const imageURL = Journal.imageURL;
    const fileName = path.basename(imageURL);
    const filePath = path.join(rootDir, "uploads", fileName);
    if (fs.existsSync(filePath) && !imageURL.includes("placeholder.jpg")) {
        try {
            await fs.promises.unlink(filePath);
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    }

    const result = await deleteJournalEntry(id, userId);

    if (!result) {
        return res
            .status(400)
            .json({ error: "something went wrong during deletion" });
    }
    return res.status(200).json({
        message: "Journal entry deleted successfully.",
        id: result.id,
    });
};

export const updateisFavourite = async (req, res) => {
    const { id } = req.params;
    const { isFavourite } = req.body;
    const userId = req.user.id;
    if (typeof isFavourite !== "boolean") {
        return res
            .status(400)
            .json({ error: "isFavourite field must be a boolean" });
    }
    const journal = await getJournalById(id);
    if (!journal) {
        return res.status(404).json({ error: "Journal not found" });
    }
    if (journal.userId !== userId) {
        return res.status(403).json({ error: "Unauthorized action" });
    }

    const result = await updateJournalEntry(id, { isFavourite });
    if (!result) {
        return res.status(400).json({
            error: "something went wrong during updating isFavourite",
        });
    }
    return res
        .status(200)
        .json({ message: "isFavourite updated successfully.", id: result.id });
};

export const searchJournals = async (req, res) => {
    try {
        const userId = req.user.id;
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const allJournals = await getJournals(userId);
        const q = query.toLowerCase();

        const filteredJournals = allJournals
            .filter((journal) => {
                const inTitle = journal.title?.toLowerCase().includes(q);
                const inStory = journal.story?.toLowerCase().includes(q);
                const inCity = journal.city?.toLowerCase().includes(q);

                const inVisited = Array.isArray(journal.visitedLocation)
                    ? journal.visitedLocation.some((loc) =>
                          loc.toLowerCase().includes(q)
                      )
                    : false;

                return inTitle || inStory || inCity || inVisited;
            })
            .sort((a, b) => {
                if (a.isFavourite === b.isFavourite) return 0;
                return a.isFavourite ? -1 : 1;
            });

        if (filteredJournals.length === 0) {
            return res
                .status(404)
                .json({ error: "No matching journal entries found" });
        }

        return res.json(filteredJournals);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to search journals" });
    }
};

export const filterTravelJournals = async (req, res) => {
    try {
        const userId = req.user.id;
        const { startDate, endDate } = req.body;
        if (!startDate || !endDate) {
            return res
                .status(400)
                .json({ error: "Both startDate and endDate are required" });
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (isNaN(start) || isNaN(end)) {
            return res
                .status(400)
                .json({ error: "Invalid date format. Use YYYY-MM-DD." });
        }
        if (start > end) {
            return res
                .status(400)
                .json({ error: "startDate cannot be after endDate" });
        }
        const allJournals = await getJournals(userId);
        const filteredJournals = allJournals
            .filter((journal) => {
                const visitedDate = new Date(journal.visitedDate);
                return visitedDate >= start && visitedDate <= end;
            })
            .sort((a, b) => {
                if (a.isFavourite === b.isFavourite) return 0;
                return a.isFavourite ? -1 : 1;
            });
        if (filteredJournals.length === 0) {
            return res
                .status(404)
                .json({
                    error: "No journal entries found in the given date range",
                });
        }
        return res.json(filteredJournals);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to filter journals" });
    }
};
