import React from "react";
import { Link } from "react-router-dom";

function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Create Your Profile",
      description:
        "Tell SkillSwap about yourself, the skills you can teach, and the skills you want to learn.",
      color: "bg-violet-100 text-violet-600",
    },
    {
      number: "02",
      icon: "🔎",
      title: "Discover Skills",
      description:
        "Explore different skills and find people who can help you reach your learning goals.",
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      number: "03",
      icon: "🤝",
      title: "Find Your Match",
      description:
        "SkillSwap matches your learning goals with skills offered by other users.",
      color: "bg-purple-100 text-purple-600",
    },
    {
      number: "04",
      icon: "🚀",
      title: "Learn & Share",
      description:
        "Connect, exchange knowledge, and grow together through meaningful skill sharing.",
      color: "bg-fuchsia-100 text-fuchsia-600",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-white">

      {/* HERO */}
      <section className="px-6 py-20 text-center md:py-28">

        <div className="mx-auto max-w-3xl">

          <div className="mb-5 inline-flex rounded-full border border-violet-200 bg-white px-4 py-2 text-sm font-semibold text-violet-600 shadow-sm">
            ✨ The SkillSwap Journey
          </div>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            Learn differently.
            <span className="block text-violet-600">
              Grow together.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600">
            SkillSwap makes it simple to share what you know, discover new
            skills, and connect with people who are learning just like you.
          </p>

        </div>

      </section>


      {/* JOURNEY */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-5xl">

          <div className="relative">

            {/* Vertical Line */}
            <div className="absolute left-6 top-8 hidden h-[calc(100%-60px)] w-px bg-violet-200 md:block" />

            <div className="space-y-8">

              {steps.map((step) => (
                <div
                  key={step.number}
                  className="relative flex flex-col gap-6 md:flex-row md:items-start"
                >

                  {/* Number */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 font-bold text-white shadow-lg shadow-violet-200">
                    {step.number}
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl md:p-8">

                    <div className="flex flex-col gap-5 sm:flex-row">

                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-2xl ${step.color}`}
                      >
                        {step.icon}
                      </div>

                      <div>

                        <p className="text-sm font-semibold uppercase tracking-widest text-violet-500">
                          Step {step.number}
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-gray-900">
                          {step.title}
                        </h2>

                        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
                          {step.description}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

        </div>

      </section>


      {/* AI SECTION */}
      <section className="px-6 pb-24">

        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-xl md:p-12">

          <div className="grid items-center gap-10 md:grid-cols-2">

            <div>

              <p className="text-sm font-bold uppercase tracking-widest text-violet-200">
                Coming Into Your Journey
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Learn with a roadmap made for you.
              </h2>

              <p className="mt-5 leading-7 text-violet-100">
                SkillSwap's AI Learning Assistant can use your current skill
                and learning goal to create a personalized learning path.
              </p>

              <Link
                to="/profile"
                className="mt-7 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Set Your Learning Goal →
              </Link>

            </div>

            <div className="rounded-3xl bg-white/10 p-6 backdrop-blur">

              <p className="text-sm text-violet-200">
                Example learning path
              </p>

              <div className="mt-5 space-y-3">

                <div className="rounded-xl bg-white/10 p-4">
                  JavaScript Fundamentals
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  Modern JavaScript & ES6
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  React Fundamentals
                </div>

                <div className="rounded-xl bg-white/10 p-4">
                  Build a Real Project
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="px-6 pb-24 text-center">

        <div className="mx-auto max-w-3xl">

          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Ready to start your SkillSwap journey?
          </h2>

          <p className="mt-4 text-gray-600">
            Create your profile and start learning from the community.
          </p>

          <Link
            to="/register"
            className="mt-7 inline-block rounded-xl bg-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
          >
            Join SkillSwap →
          </Link>

        </div>

      </section>

    </main>
  );
}

export default HowItWorks;