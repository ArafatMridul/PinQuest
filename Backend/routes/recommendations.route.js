import express from "express";
import { getRecommendedLocations } from "../controllers/recommendation.controller.js";

const router = express.Router();

router.get("/", getRecommendedLocations);

export default router;
