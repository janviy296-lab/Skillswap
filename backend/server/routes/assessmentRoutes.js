import express from "express";
import generateAssessment from "../controllers/assessmentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, generateAssessment);

export default router;