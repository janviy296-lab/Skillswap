import express from "express";
import getConversation from "../controllers/messageController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:partnerId", protect, getConversation);

export default router;