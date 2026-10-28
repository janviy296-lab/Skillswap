import { useState } from "react";
import api from "../api/api";

function Assessment() {
  const [skill, setSkill] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateAssessment = async (e) => {
    e.preventDefault();

    if (!skill) {
      alert("Please enter a skill");
      return;
    }

    try {
      setLoading(true);
      setResult(null);
      setAnswers({});

      const response = await api.post("/ai/assessment", {
        skill,
        level,
      });

      setQuestions(response.data.assessment.questions);
    } catch (error) {
      console.log(error);
      alert("Failed to generate assessment");
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionIndex, optionIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: optionIndex,
    });
  };

  const submitAssessment = () => {
    let score = 0;
    const weakTopics = [];

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      } else {
        weakTopics.push(question.topic);
      }
    });

    setResult({
      score,
      total: questions.length,
      weakTopics: [...new Set(weakTopics)],
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="text-center">
          <p className="font-semibold text-violet-600">
            🤖 AI Assessment
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Test Your Skills
          </h1>

          <p className="mt-3 text-gray-600">
            Test your knowledge and discover your weak topics.
          </p>
        </div>

        <form
          onSubmit={generateAssessment}
          className="mt-10 rounded-3xl bg-white p-6 shadow-lg"
        >
          <label className="font-semibold text-gray-700">
            Skill
          </label>

          <input
            type="text"
            placeholder="e.g. React"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3 outline-none focus:border-violet-500"
          />

          <label className="mt-5 block font-semibold text-gray-700">
            Level
          </label>

          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="mt-2 w-full rounded-xl border p-3"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
          >
            {loading ? "Generating..." : "Start Assessment"}
          </button>
        </form>

        {questions.length > 0 && !result && (
          <div className="mt-8 space-y-6">
            {questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="rounded-3xl bg-white p-6 shadow-lg"
              >
                <p className="text-sm font-semibold text-violet-600">
                  Question {questionIndex + 1}
                </p>

                <h2 className="mt-2 text-xl font-bold text-gray-900">
                  {question.question}
                </h2>

                <div className="mt-5 space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <button
                      key={optionIndex}
                      type="button"
                      onClick={() =>
                        selectAnswer(questionIndex, optionIndex)
                      }
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        answers[questionIndex] === optionIndex
                          ? "border-violet-600 bg-violet-50"
                          : "border-gray-200 hover:border-violet-400"
                      }`}
                    >
                      <span className="font-semibold">
                        {String.fromCharCode(65 + optionIndex)}.
                      </span>{" "}
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={submitAssessment}
              className="w-full rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white hover:bg-gray-800"
            >
              Submit Assessment
            </button>
          </div>
        )}

        {result && (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-lg">
            <p className="text-sm font-semibold text-violet-600">
              Assessment Complete 🎉
            </p>

            <h2 className="mt-3 text-4xl font-bold text-gray-900">
              {result.score} / {result.total}
            </h2>

            <p className="mt-2 text-gray-600">
              Your score is{" "}
              {Math.round((result.score / result.total) * 100)}%
            </p>

            <div className="mt-8 text-left">
              <h3 className="text-xl font-bold">
                Topics to Improve
              </h3>

              {result.weakTopics.length > 0 ? (
                <ul className="mt-3 list-disc pl-5 text-gray-600">
                  {result.weakTopics.map((topic, index) => (
                    <li key={index}>{topic}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-green-600">
                  Excellent! No weak topics found 🎉
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default Assessment;