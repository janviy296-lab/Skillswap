import express from "express";
import generateAssessment from "../controllers/assessmentController.js";

const router = express.Router();

router.post("/", generateAssessment);

export default router;