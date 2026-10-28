import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateAssessment = async (req, res) => {
  try {
    const { skill, level } = req.body;

    if (!skill || !level) {
      return res.status(400).json({
        message: "Please provide skill and level",
      });
    }

    const prompt = `
Create a ${level} level assessment for ${skill}.

Generate exactly 5 multiple-choice questions.

Return ONLY valid JSON in this exact structure:

{
  "questions": [
    {
      "question": "Question text",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": 0,
      "explanation": "Short explanation",
      "topic": "Topic name"
    }
  ]
}

Rules:
- Generate exactly 5 questions.
- Each question must have exactly 4 options.
- correctAnswer must be 0, 1, 2, or 3.
- 0 means Option A, 1 means Option B, 2 means Option C, 3 means Option D.
- Questions should be practical and suitable for the selected level.
- Do not add any text outside the JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const assessment = JSON.parse(response.text);

    res.status(200).json({
      message: "Assessment generated successfully",
      assessment,
    });
  } catch (error) {
    console.log("Gemini Assessment Error:", error.message);

    res.status(500).json({
      message: "Failed to generate assessment",
      error: error.message,
    });
  }
};

export default generateAssessment;