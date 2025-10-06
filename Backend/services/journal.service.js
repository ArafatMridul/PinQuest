import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable, journalTable } from "../db/schema.js";

export const insertIntoJourna = async (userId, city, country, description) => {
    const [result] = await db
        .insert(journalTable)
        .values({ userId, city, country, description })
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
