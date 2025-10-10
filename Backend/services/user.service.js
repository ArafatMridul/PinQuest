import db from "../db/index.js";
import { userInfoTable, usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

// <--------- GET USER BY EMAIL --------->
export const getUserByEmail = async (email) => {
    const [user] = await db
        .select({
            firstName: usersTable.firstName,
            lastName: usersTable.lastName,
            email: usersTable.email,
            createdAt: usersTable.createdAt,
            updatedAt: usersTable.updatedAt,
        })
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

export const setProfile = async ({
    userId,
    dob,
    nationality,
    address,
    phoneNo,
    gender,
}) => {
    const [result] = await db
        .insert(userInfoTable)
        .values({ userId, dob, nationality, address, phoneNo, gender })
        .returning({ id: userInfoTable.id });

    return result;
};
