import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Matches() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchMatches = async () => {
    try {
      setError("");
      const response = await api.get("/users/matches");
      setMatches(response.data.matches || []);
    } catch (error) {
      console.log(error);
      setError("We couldn't load your matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-violet-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-violet-200 border-t-violet-600" />
          <p className="mt-4 font-medium text-gray-600">
            Finding your skill partners...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:py-14">
      <div className="mx-auto max-w-6xl">

        {/* Hero section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-600 px-6 py-10 text-white shadow-xl sm:px-10 sm:py-14">
          <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 right-32 h-44 w-44 rounded-full bg-purple-300/10" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
              🤝 Your learning community
            </span>

            <h1 className="mt-5 max-w-2xl text-3xl font-extrabold leading-tight sm:text-5xl">
              Learn together.
              <br />
              Grow together.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-violet-100 sm:text-base">
              Meet people who can teach you something new while you share
              the skills you already know.
            </p>

            <div className="mt-7 inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-5 py-3">
              <span className="text-2xl">✨</span>
              <div>
                <p className="text-2xl font-bold">{matches.length}</p>
                <p className="text-sm text-violet-100">
                  {matches.length === 1 ? "Potential partner" : "Potential partners"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section heading */}
        <section className="mt-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-violet-600">
              Your community
            </p>
            <h2 className="mt-1 text-2xl font-bold text-gray-900 sm:text-3xl">
              People you can learn from
            </h2>
          </div>

          <button
            onClick={() => navigate("/skills")}
            className="w-fit rounded-xl border border-violet-200 bg-white px-4 py-2.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
          >
            + Explore skills
          </button>
        </section>

        {/* Error state */}
        {error && (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5 text-center">
            <p className="text-sm text-red-700">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                fetchMatches();
              }}
              className="mt-3 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!error && matches.length === 0 && (
          <div className="mt-8 rounded-3xl border border-violet-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-100 text-4xl">
              🌱
            </div>
            <h3 className="mt-5 text-xl font-bold text-gray-900">
              Your learning journey starts here
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              No matches yet. Add skills you can teach and skills you want
              to learn to help discover compatible partners.
            </p>
            <button
              onClick={() => navigate("/skills")}
              className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-violet-700"
            >
              Add your skills →
            </button>
          </div>
        )}

        {/* Match cards */}
        {!error && matches.length > 0 && (
          <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {matches.map((user) => (
              <article
                key={user._id}
                className="group flex flex-col rounded-3xl border border-violet-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-xl"
              >
                {/* User details */}
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-500 text-2xl font-bold text-white shadow-md">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-lg font-bold text-gray-900">
                      {user.name}
                    </h3>
                    <p className="mt-1 break-all text-sm text-gray-500">
                      {user.email}
                    </p>
                    <span className="mt-2 inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      ● Potential match
                    </span>
                  </div>
                </div>

                <div className="my-6 border-t border-gray-100" />

                {/* Skills to teach */}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
                      🎓
                    </span>
                    <h4 className="font-semibold text-gray-800">
                      Can teach
                    </h4>
                  </div>

                  <div className="mt-3 flex min-h-8 flex-wrap gap-2">
                    {user.skillsToTeach?.length > 0 ? (
                      user.skillsToTeach.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-medium text-violet-700 sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">Not specified</p>
                    )}
                  </div>
                </div>

                {/* Skills to learn */}
                <div className="mt-5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
                      📚
                    </span>
                    <h4 className="font-semibold text-gray-800">
                      Wants to learn
                    </h4>
                  </div>

                  <div className="mt-3 flex min-h-8 flex-wrap gap-2">
                    {user.skillsToLearn?.length > 0 ? (
                      user.skillsToLearn.map((skill, index) => (
                        <span
                          key={index}
                          className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700 sm:text-sm"
                        >
                          {skill}
                        </span>
                      ))
                    ) : (
                      <p className="text-sm text-gray-400">Not specified</p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-auto grid grid-cols-2 gap-3 pt-7">
                  <button
                    onClick={() => navigate(`/chat?partner=${user._id}`)}
                    className="rounded-xl bg-violet-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                  >
                    💬 Chat
                  </button>

                  <button
                    onClick={() => navigate(`/sessions?partner=${user._id}`)}
                    className="rounded-xl border border-violet-200 bg-white px-3 py-3 text-sm font-semibold text-violet-700 transition hover:bg-violet-50 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
                  >
                    📅 Schedule
                  </button>

                  <button
                    onClick={() => navigate(`/rating/${user._id}`)}
                    className="col-span-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2"
                  >
                    ⭐ Rate this user
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-sm text-gray-400">
          Great things happen when people learn from each other. 💜
        </p>
      </div>
    </main>
  );
}

export default Matches;