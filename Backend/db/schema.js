import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({ length: 30 }).notNull(),
    lastName: varchar({ length: 30 }).notNull(),
    email: varchar({ length: 30 }).notNull().unique(),
    password: text().notNull(),
    salt: text().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const journalTable = pgTable("journal", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
        .notNull()
        .references(() => usersTable.id),
    city: varchar({ length: 20 }).notNull(),
    country: varchar({ length: 20 }).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
});
