import { z } from "zod";

export const userSignupSchema = z.object({
    firstName: z
        .string()
        .min(1, "First name is required")
        .max(30, "First name must be at most 30 characters"),
    lastName: z
        .string()
        .min(1, "Last name is required")
        .max(30, "Last name must be at most 30 characters"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .max(30, "Email must be at most 30 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be at most 100 characters"),
    country: z.string(),
});

export const userLoginSchema = z.object({
    email: z
        .email("Invalid email address")
        .max(30, "Email must be at most 30 characters"),
    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password must be at most 100 characters"),
});
