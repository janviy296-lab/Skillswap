import express from "express";
import {getProfile , updateProfile} from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import getMatches from "../controllers/matchingController.js";

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.get("/matches", protect, getMatches);

export default router;

