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
    country,
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
            country,
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

export const getJournalById = async (id) => {
    const [result] = await db
        .select()
        .from(journalTable)
        .where(eq(journalTable.id, id));
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

export const deleteJournalEntry = async (id, userId) => {
    const result = await db
        .delete(journalTable)
        .where(eq(journalTable.id, id), eq(journalTable.userId, userId))
        .returning();
    return result;
};
