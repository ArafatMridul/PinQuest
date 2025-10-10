import db from "../db/index.js";
import { userInfoTable, usersTable } from "../db/schema.js";
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

export const getProfile = async (userId) => {
    const [result] = await db
        .select()
        .from(userInfoTable)
        .where(eq(userInfoTable.userId, userId));

    return result;
};

export const setOrUpdateProfile = async ({
    userId,
    dob,
    nationality,
    address,
    phoneNo,
    gender,
}) => {
    // check if row exists
    const existing = await db
        .select({ id: userInfoTable.id })
        .from(userInfoTable)
        .where(eq(userInfoTable.userId, userId));

    if (existing.length > 0) {
        // update
        const [result] = await db
            .update(userInfoTable)
            .set({ dob, nationality, address, phoneNo, gender })
            .where(eq(userInfoTable.userId, userId))
            .returning({ id: userInfoTable.id });
        return result;
    } else {
        // insert new profile
        const [result] = await db
            .insert(userInfoTable)
            .values({ userId, dob, nationality, address, phoneNo, gender })
            .returning({ id: userInfoTable.id });
        return result;
    }
};
