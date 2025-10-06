import jwt from "jsonwebtoken";
import "dotenv/config";

export function generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET);
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
}
