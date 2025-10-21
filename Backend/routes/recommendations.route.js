import express from "express";
import { getRecommendedLocations } from "../controllers/recommendation.controller.js";

const router = express.Router();

router.post("/", getRecommendedLocations);

export default router;
