import express from "express";

import {
  createProgress,
  getProgress,
  updateProgress,
} from "../controllers/progressController.js";

import protect from "../middleware/authMiddleware.js";
import generateProgressInsight from "../controllers/progressInsightController.js";

const router = express.Router();

router.post("/", protect, createProgress);

router.get("/", protect, getProgress);

router.put("/:id", protect, updateProgress);

router.get("/:id/insight", protect, generateProgressInsight);

export default router;