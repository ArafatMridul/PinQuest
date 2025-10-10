import {
    boolean,
    date,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({ length: 30 }).notNull(),
    lastName: varchar({ length: 30 }).notNull(),
    country: varchar({ length: 50 }).notNull(),
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
    title: varchar({ length: 100 }).notNull(),
    story: text().notNull(),
    city: varchar({ length: 50 }).notNull(),
    country: varchar({ length: 50 }).notNull(),
    visitedLocation: text().array().default([]).notNull(),
    isFavourite: boolean().default(false).notNull(),
    imageURL: text()
        .notNull()
        .$default("http://localhost:8000/assets/placeholder.jpg"),
    visitedDate: date().notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().$onUpdate(() => new Date()),
});

export const userInfoTable = pgTable("userInfo", {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid()
        .notNull()
        .references(() => usersTable.id),
    dob: date(),
    nationality: varchar({ length: 100 }),
    address: text(),
    phoneNo: varchar({ length: 15 }),
    gender: varchar({ length: 10 }),
});
