import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { journalTable } from "../db/schema.js";

export const insertIntoJourna = async ({
    userId,
    title,
    story,
    visitedLocation,
    visitedDate,
    imageURL,
    city,
}) => {
    const [result] = await db
        .insert(journalTable)
        .values({
            userId,
            title,
            story,
            visitedLocation,
            visitedDate,
            imageURL,
            city,
        })
        .returning({ id: journalTable.id });

    return result;
};

export const getJournals = async (userId) => {
    const result = await db
        .select()
        .from(journalTable)
        .where(eq(journalTable.userId, userId));

    return result;
};

export const updateJournalEntry = async (id, updatedFields) => {
    const result = await db
        .update(journalTable)
        .set(updatedFields)
        .where(eq(journalTable.id, id))
        .returning();
    return result;
};
