import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

// <--------- GET USER BY EMAIL --------->
export const getUserByEmail = async (email) => {
    const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));
    return user;
};

// <--------- CREATE NEW USER --------->
export const createUser = async (
    firstName,
    lastName,
    email,
    hashedPassword,
    salt
) => {
    const [result] = await db
        .insert(usersTable)
        .values({ firstName, lastName, email, password: hashedPassword, salt })
        .returning({ id: usersTable.id });
    return result;
};
