import { useState } from "react";
import api from "../api/api";

function AIAssistant() {
  const [currentSkill, setCurrentSkill] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [roadmap, setRoadmap] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!currentSkill.trim() || !learningGoal.trim()) {
      alert("Please enter your current skill and learning goal.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/ai/roadmap", {
        currentSkill,
        learningGoal,
      });

      setRoadmap(response.data.roadmap);
    } catch (error) {
      console.log(error.response?.data);
      alert("Failed to generate roadmap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-5xl">

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-purple-300/10" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              ✨ Powered by AI
            </span>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
              Your goals.
              <br />
              Your roadmap.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-violet-100 sm:text-base">
              Turn your learning goals into a personalized step-by-step path.
              Tell us where you're starting and where you want to go.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                🎯 Personalized learning
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
                🪜 Step-by-step guidance
              </span>
            </div>
          </div>
        </section>

        {/* Main form layout */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

          {/* Tips panel */}
          <aside className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100 text-2xl">
              🧠
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              Learn smarter
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              A good learning roadmap starts with a clear goal. Be specific
              about what you already know and what you want to achieve.
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50">
                  💡
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Start with your skills
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Mention your current knowledge honestly.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-indigo-50">
                  🚀
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Set a clear goal
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Choose one skill or outcome to focus on.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-50">
                  📚
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">
                    Follow your plan
                  </h3>
                  <p className="mt-1 text-sm leading-5 text-gray-500">
                    Use your roadmap to guide your practice.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-2xl bg-gradient-to-br from-violet-50 to-indigo-50 p-4">
              <p className="text-sm font-semibold text-violet-800">
                Example
              </p>
              <p className="mt-2 text-sm text-gray-600">
                I know <span className="font-semibold">HTML and CSS</span> and
                want to learn <span className="font-semibold">React</span>.
              </p>
            </div>
          </aside>

          {/* Form */}
          <section className="rounded-3xl border border-violet-100 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
                Your learning journey
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Build your roadmap
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                Fill in the details below and let AI help you plan your next
                steps.
              </p>
            </div>

            <form onSubmit={handleGenerate} className="mt-7 space-y-6">
              <div>
                <label
                  htmlFor="currentSkill"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  <span className="mr-2">🌱</span>
                  What do you already know?
                </label>

                <input
                  id="currentSkill"
                  type="text"
                  placeholder="e.g. HTML, CSS, JavaScript"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:opacity-60"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Your current knowledge or experience.
                </p>
              </div>

              <div>
                <label
                  htmlFor="learningGoal"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  <span className="mr-2">🎯</span>
                  What do you want to learn?
                </label>

                <input
                  id="learningGoal"
                  type="text"
                  placeholder="e.g. React, Node.js, UI design"
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  disabled={loading}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:bg-white focus:ring-4 focus:ring-violet-100 disabled:opacity-60"
                />
                <p className="mt-2 text-xs text-gray-400">
                  Choose the skill you want to work towards.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-4 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Creating your roadmap...
                  </>
                ) : (
                  <>✨ Generate my roadmap →</>
                )}
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-gray-400">
              Your personalized learning plan is just one step away.
            </p>
          </section>
        </div>

        {/* Roadmap result */}
        {roadmap && (
          <section className="mt-8 overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-lg">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-6 text-white sm:px-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-2xl">
                  🗺️
                </div>
                <div>
                  <p className="text-sm font-semibold text-violet-100">
                    YOUR AI-GENERATED PLAN
                  </p>
                  <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                    Your personalized roadmap
                  </h2>
                  <p className="mt-1 text-sm text-violet-100">
                    From {currentSkill} to {learningGoal}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <div className="whitespace-pre-wrap break-words text-sm leading-8 text-gray-700 sm:text-base">
                {roadmap}
              </div>

              <div className="mt-7 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => {
                    setRoadmap("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="rounded-xl border border-violet-200 px-5 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
                >
                  Create another roadmap
                </button>
              </div>
            </div>
          </section>
        )}

        <p className="mt-8 text-center text-sm text-gray-400">
          Small steps every day lead to big progress. 💜
        </p>
      </div>
    </main>
  );
}

export default AIAssistant;