import { randomBytes, createHmac } from "node:crypto";

export function hashPassword(password, salt = undefined) {
    salt = salt || randomBytes(16).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
        .update(password)
        .digest("hex");
    return { salt, password: hashedPassword };
}
