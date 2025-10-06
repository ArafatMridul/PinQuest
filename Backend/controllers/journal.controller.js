import { getJournals, insertIntoJourna } from "../services/journal.service.js";

export const createNewJournalEntry = async (req, res) => {
    const { userId, city, country, description } = req.body;

    const result = await insertIntoJourna(userId, city, country, description);

    if (!result) {
        return res
            .status(400)
            .json({ error: "something went wrong during insertion" });
    }

    return res.json({ message: "Insertion successfull", id: result.id });
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
