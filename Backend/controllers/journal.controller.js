import { getJournals, insertIntoJourna } from "../services/journal.service.js";

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
