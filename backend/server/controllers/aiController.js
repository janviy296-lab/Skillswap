import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
apiKey: process.env.GEMINI_API_KEY,
});

const generateRoadmap = async (req, res) => {
try {
const { currentSkill, learningGoal } = req.body;

if (!currentSkill || !learningGoal) {
  return res.status(400).json({
    message: "Please provide current skill and learning goal",
  });
}

const prompt = `

Create a personalized learning plan.

Current Skill: ${currentSkill}
Learning Goal: ${learningGoal}

Give the response in these 3 sections:

1. Learning Roadmap
   Give the topics in a logical order.

2. Suggested Study Plan
   Create a simple 30-day study plan for a beginner.

3. Recommended Projects
   Suggest 3 practical projects related to the learning goal.

Keep everything beginner-friendly, practical and concise.
`;

let response;

// Retry temporary errors up to 3 attempts
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    break;
  } catch (error) {
    const status = error.status || error.statusCode;

    const isTemporaryError =
      status === 503 ||
      status === 429 ||
      (status >= 500 && status < 600);

    console.error(
      `Gemini attempt ${attempt} failed:`,
      status,
      error.message
    );

    if (!isTemporaryError || attempt === 3) {
      throw error;
    }

    // Wait 2 seconds, then 4 seconds before retrying
    await new Promise((resolve) =>
      setTimeout(resolve, attempt * 2000)
    );
  }
}

if (!response?.text) {
  return res.status(503).json({
    message: "AI could not generate a roadmap. Please try again.",
  });
}

return res.status(200).json({
  message: "AI roadmap generated successfully",
  roadmap: response.text,
});

} catch (error) {
const status = error.status || error.statusCode;

console.error("Gemini API error:", error.message);
console.error("Gemini status:", status);

if (status === 503 || status === 429 || (status >= 500 && status < 600)) {
  return res.status(503).json({
    message:
      "AI is temporarily busy. Please try again in a minute.",
  });
}

return res.status(500).json({
  message: "Failed to generate roadmap. Please check the server configuration.",
});

}
};

export default generateRoadmap;