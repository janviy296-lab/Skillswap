import { useEffect, useState } from "react";
import api from "../api/api";

function Progress() {
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);

  const fetchProgress = async () => {
    try {
      const response = await api.get("/progress");
      setProgress(response.data.progress);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const updateTopic = async (id, topicName, completed) => {
    try {
      await api.put(`/progress/${id}`, {
        topicName,
        completed,
      });

      fetchProgress();
    } catch (error) {
      console.log(error);
    }
  };

  const getAIInsight = async (id) => {
    try {
      setInsightLoading(true);

      const response = await api.get(
        `/progress/${id}/insight`
      );

      setInsight(response.data.insight);
    } catch (error) {
      console.log(error);
      alert("Failed to generate AI insight");
    } finally {
      setInsightLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="text-center">
          <p className="font-semibold text-violet-600">
            📈 Learning Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            My Learning Progress
          </h1>

          <p className="mt-3 text-gray-600">
            Track your learning journey and get AI-powered guidance.
          </p>
        </div>

        {progress.length === 0 && (
          <div className="mt-10 rounded-3xl bg-white p-8 text-center shadow-lg">
            <h2 className="text-xl font-bold">
              No progress found
            </h2>

            <p className="mt-2 text-gray-500">
              Create a learning progress to start tracking.
            </p>
          </div>
        )}

        {progress.map((item) => {
          const completed = item.topics.filter(
            (topic) => topic.completed
          ).length;

          const percentage =
            item.topics.length > 0
              ? Math.round(
                  (completed / item.topics.length) * 100
                )
              : 0;

          return (
            <div
              key={item._id}
              className="mt-8 rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {item.skill}
                </h2>

                <span className="font-semibold text-violet-600">
                  {percentage}%
                </span>
              </div>

              <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-violet-600 transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                {completed} of {item.topics.length} topics completed
              </p>

              <div className="mt-6 space-y-3">
                {item.topics.map((topic) => (
                  <label
                    key={topic._id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border p-4"
                  >
                    <input
                      type="checkbox"
                      checked={topic.completed}
                      onChange={(e) =>
                        updateTopic(
                          item._id,
                          topic.name,
                          e.target.checked
                        )
                      }
                    />

                    <span
                      className={
                        topic.completed
                          ? "text-gray-400 line-through"
                          : "text-gray-700"
                      }
                    >
                      {topic.name}
                    </span>
                  </label>
                ))}
              </div>

              <button
                onClick={() => getAIInsight(item._id)}
                disabled={insightLoading}
                className="mt-6 w-full rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white hover:bg-violet-700 disabled:opacity-60"
              >
                {insightLoading
                  ? "AI is analyzing..."
                  : "🤖 Get AI Learning Advice"}
              </button>
            </div>
          );
        })}

        {insight && (
          <div className="mt-8 rounded-3xl border border-violet-100 bg-white p-6 shadow-lg">
            <p className="font-semibold text-violet-600">
              🤖 AI Learning Coach
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Your Personalized Advice
            </h2>

            <div className="mt-5 whitespace-pre-wrap leading-7 text-gray-600">
              {insight}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}

export default Progress;