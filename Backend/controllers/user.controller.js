import { hashPassword } from "../utils/hashPassword.utils.js";
import {
    userLoginSchema,
    userSignupSchema,
} from "../validations/user.validation.js";
import {
    createUser,
    getProfile,
    getUserByEmail,
    setOrUpdateProfile,
} from "../services/user.service.js";
import { generateToken } from "../utils/token.utils.js";

// <--------- SINGUP NEW USER --------->
export const sigupNewUser = async (req, res) => {
    const validationResult = await userSignupSchema.safeParseAsync(req.body);

    if (!validationResult.success) {
        const error = validationResult.error.issues[0].message;
        return res.status(400).json({ error });
    }

    const { firstName, lastName, email, password, country } =
        validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return res
            .status(409)
            .json({ error: `User with email ${email} already exists.` });
    }

    const { salt, password: hashedPassword } = hashPassword(password);

    const result = await createUser({
        firstName,
        lastName,
        email,
        hashedPassword,
        salt,
        country,
    });

    if (!result) {
        return res.status(500).json({ error: "Failed to create user." });
    }
    res.status(201).json({
        message: "User created successfully",
        id: result.id,
    });
};

// <--------- LOGIN USER --------->
export const loginUser = async (req, res) => {
    const validationResult = await userLoginSchema.safeParseAsync(req.body);
    if (!validationResult.success) {
        const error = validationResult.error.issues[0].message;
        return res.status(400).json({ error });
    }

    const { email, password } = validationResult.data;
    const user = await getUserByEmail(email);
    if (!user) {
        return res.status(401).json({ error: "Invalid email or password." });
    }

    const { password: hashedPassword } = hashPassword(password, user.salt);
    if (hashedPassword !== user.password) {
        return res.status(401).json({ error: "Invalid email or password." });
    }
    const token = generateToken({ id: user.id, email: user.email });
    res.status(200).json({ message: "Login successful.", token });
};

// <--------- GET USER PROFILE --------->
export const getUserProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await getUserByEmail(req.user.email);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
};

export const getProfileInfoInDashboard = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const user = await getUserByEmail(req.user.email);
    const profile = await getProfile(req.user.id);

    if (!user && !profile) {
        return res.status(404).json({ error: "User/Details not found" });
    }

    const filteredUser = {
        userId: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        country: user.country,
    };

    return res.json({ ...filteredUser, ...profile });
};

export const setOrEditProfileInfoInDashboard = async (req, res) => {
    const userId = req.user.id;
    const { dob, nationality, address, phoneNo, gender } = req.body;

    const result = await setOrUpdateProfile({
        address,
        dob,
        gender,
        nationality,
        phoneNo,
        userId,
    });

    if (!result) {
        return res
            .status(400)
            .json({ error: "failed to edit/inset profile information." });
    }

    return res.json({
        message:
            "Successfully edit/insertion of user deatils from profile dashboard.",
        id: result.id,
    });
};
