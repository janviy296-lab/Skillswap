import { GoogleGenAI } from "@google/genai";
import Progress from "../models/progressModel.js";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateProgressInsight = async (req, res) => {
  try {
    const { id } = req.params;

    const progress = await Progress.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    const completedTopics = progress.topics
      .filter((topic) => topic.completed)
      .map((topic) => topic.name);

    const pendingTopics = progress.topics
      .filter((topic) => !topic.completed)
      .map((topic) => topic.name);

    const prompt = `
You are a learning coach.

Skill: ${progress.skill}

Completed topics:
${completedTopics.join(", ") || "None"}

Pending topics:
${pendingTopics.join(", ") || "None"}

Give a short learning progress analysis.

Include:
1. Current progress
2. What to learn next
3. What to revise
4. One practical tip

Keep it beginner-friendly and concise.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.status(200).json({
      message: "Progress insight generated successfully",
      insight: response.text,
    });
  } catch (error) {
    console.log("Progress AI Error:", error.message);

    res.status(500).json({
      message: "Failed to generate progress insight",
      error: error.message,
    });
  }
};

export default generateProgressInsight;