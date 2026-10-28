import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkillCard from "../components/Skillcard";
import StepCard from "../components/Stepcard";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => Boolean(localStorage.getItem("token"))
  );

  useEffect(() => {
    const syncLoginStatus = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("token")));
    };

    window.addEventListener("skillswap-auth-changed", syncLoginStatus);
    window.addEventListener("storage", syncLoginStatus);

    return () => {
      window.removeEventListener("skillswap-auth-changed", syncLoginStatus);
      window.removeEventListener("storage", syncLoginStatus);
    };
  }, []);

  const skills = [
    {
      name: "JavaScript",
      description: "Learn JavaScript from other learners.",
      level: "Beginner",
      learners: 128,
    },
    {
      name: "React",
      description: "Exchange React knowledge with others.",
      level: "Intermediate",
      learners: 96,
    },
    {
      name: "UI/UX Design",
      description: "Learn design skills from the community.",
      level: "Beginner",
      learners: 74,
    },
    {
      name: "Node.js",
      description: "Learn backend development with Node.js.",
      level: "Intermediate",
      learners: 82,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Create Your Profile",
      description:
        "Tell the community what you know and what you want to learn.",
    },
    {
      number: "02",
      title: "Find Your Match",
      description:
        "Discover people whose skills match your learning goals.",
    },
    {
      number: "03",
      title: "Connect & Learn",
      description:
        "Exchange knowledge and grow together with your learning partner.",
    },
  ];

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-white via-violet-50/70 to-indigo-50/80 px-5 py-20 sm:px-8 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-violet-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 top-10 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-white/80 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
              <span>✦</span> Learn · Share · Grow
            </div>

            <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Exchange Skills.
              <span className="mt-2 block bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                Grow Together.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              SkillSwap connects you with people who want to learn what
              you know and teach what you want to learn.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/skills"
                className="rounded-xl bg-violet-600 px-7 py-4 text-center font-semibold text-white shadow-lg shadow-violet-200/70 transition duration-300 hover:-translate-y-1 hover:bg-violet-700 hover:shadow-xl"
              >
                Explore Skills <span className="ml-2">→</span>
              </Link>

              <Link
                to="/register"
                className="rounded-xl border border-slate-200 bg-white px-7 py-4 text-center font-semibold text-slate-700 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:bg-violet-50"
              >
                Join SkillSwap
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600">
              <span>✓ Share your skills</span>
              <span>✓ Find learners</span>
              <span>✓ Learn together</span>
            </div>
          </div>

          {/* JOURNEY PREVIEW */}
          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-violet-300/50 to-indigo-300/50 blur-3xl" />

            <div className="relative rotate-1 rounded-[2rem] border border-white/80 bg-white/90 p-5 shadow-2xl shadow-violet-200/50 backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    YOUR SKILL JOURNEY
                  </p>
                  <h2 className="mt-2 text-xl font-bold sm:text-2xl">
                    Learn something new
                  </h2>
                </div>
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-indigo-100 text-3xl">
                  🚀
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-purple-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    💡
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-violet-700">
                      You can teach
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Share what you already know
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["JavaScript", "React"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xl shadow-sm">
                    🎯
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-indigo-700">
                      You want to learn
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Discover your next skill
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Node.js", "MongoDB"].map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-blue-100 bg-white px-3 py-1.5 text-xs font-semibold text-indigo-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
                  🤝
                </div>
                <div>
                  <p className="font-bold">Your next skill match</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Learn from each other and grow together.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -right-3 top-12 hidden rounded-2xl border border-white bg-white p-4 text-2xl shadow-xl sm:block">
              💬
            </div>
            <div className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-white bg-white p-4 text-2xl shadow-xl sm:block">
              ✨
            </div>
          </div>
        </div>
      </section>

      {/* MY LEARNING - ONLY AFTER LOGIN */}
      {isLoggedIn && (
        <section className="bg-white px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Your Learning Space
            </p>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              My Learning 🎯
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Track your learning journey and discover opportunities
              to improve your skills.
            </p>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <Link
                to="/progress"
                className="group rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-3xl">
                  📈
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  My Progress
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  View your learning progress and track your journey.
                </p>

                <span className="mt-5 inline-block font-semibold text-violet-700 group-hover:text-indigo-700">
                  View Progress →
                </span>
              </Link>

              <Link
                to="/assessment"
                className="group rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-3xl">
                  🧠
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  Skill Assessment
                </h3>

                <p className="mt-2 leading-7 text-slate-600">
                  Test your knowledge and discover areas to improve.
                </p>

                <span className="mt-5 inline-block font-semibold text-indigo-700 group-hover:text-violet-700">
                  Start Assessment →
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* POPULAR SKILLS */}
      <section className="bg-slate-50/80 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
                Discover
              </p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Popular Skills
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Explore skills shared by the SkillSwap community.
              </p>
            </div>

            <Link
              to="/skills"
              className="font-semibold text-violet-700 transition hover:text-indigo-700"
            >
              View all skills →
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="group rounded-2xl border border-slate-100 bg-white p-1 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/70"
              >
                <SkillCard
                  name={skill.name}
                  description={skill.description}
                  level={skill.level}
                  learners={skill.learners}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Simple Process
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              How SkillSwap Works
            </h2>
            <p className="mt-4 leading-7 text-slate-600">
              Start learning and sharing your skills in three simple steps.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-100 bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg"
              >
                <StepCard
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI LEARNING ASSISTANT */}
      <section className="px-5 pb-20 sm:px-8 lg:pb-24">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-violet-600 to-indigo-700 p-7 text-white shadow-2xl shadow-violet-200/60 sm:p-10 lg:p-14">
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl" />

          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium">
                ✨ AI Learning Assistant
              </div>
              <h2 className="mt-6 text-3xl font-extrabold leading-tight sm:text-4xl">
                Your learning path,
                <span className="block text-violet-200">
                  personalized by AI.
                </span>
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-violet-100">
                Turn your learning goals into a clear roadmap. Discover
                what to learn next and move forward with confidence.
              </p>
              <Link
                to="/ai-assistant"
                className="mt-8 inline-flex items-center rounded-xl bg-white px-6 py-3.5 font-bold text-violet-700 shadow-lg transition hover:-translate-y-1 hover:bg-violet-50"
              >
                Build Your Learning Goal →
              </Link>
            </div>

            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-lg sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-violet-200">
                    Example roadmap
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    Frontend Developer
                  </h3>
                </div>
                <span className="text-3xl">🤖</span>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "JavaScript Fundamentals",
                  "ES6 & Modern JavaScript",
                  "React Fundamentals",
                  "Build a Real Project",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/10 p-4 transition hover:bg-white/15"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-sm font-bold">
                      0{index + 1}
                    </span>
                    <span className="text-sm font-medium sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MATCHES PREVIEW */}
      <section className="bg-slate-50/80 px-5 py-20 sm:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-600">
              Find Your People
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              Learn from someone.
              <span className="block text-violet-600">
                Teach someone.
              </span>
            </h2>
            <p className="mt-5 max-w-lg leading-8 text-slate-600">
              Meet people with complementary skills, exchange knowledge
              and make learning a shared experience.
            </p>
            <Link
              to="/matches"
              className="mt-8 inline-flex rounded-xl bg-violet-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-700"
            >
              View My Matches →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 text-xl font-bold text-white shadow-md shadow-violet-200">
                R
              </div>
              <h3 className="mt-5 text-lg font-bold">Rahul</h3>
              <p className="mt-2 text-sm text-slate-500">
                Can teach React & JavaScript
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  React
                </span>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                  JavaScript
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:mt-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-violet-500 text-xl font-bold text-white shadow-md shadow-pink-200">
                P
              </div>
              <h3 className="mt-5 text-lg font-bold">Priya</h3>
              <p className="mt-2 text-sm text-slate-500">
                Can teach UI/UX & Design
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-pink-700">
                  UI/UX
                </span>
                <span
                className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  Design
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}

export default Home;