import express from "express";

import {
  createSession,
  getSessions,
  updateSessionStatus,
} from "../controllers/sessionController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createSession);

router.get("/", protect, getSessions);

router.put("/:id", protect, updateSessionStatus);

export default router;