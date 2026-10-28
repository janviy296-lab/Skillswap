import express from "express";
import { addSkill, getSkills , updateSkill , deleteSkill , getSingleSkill} from "../controllers/skillController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addSkill);

router.get("/", getSkills);
 
router.put("/:id" , protect , updateSkill)

router.delete("/:id", protect , deleteSkill)

router.get("/:id", getSingleSkill)

export default router;