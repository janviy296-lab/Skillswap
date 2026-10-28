import { Link } from 'react-router-dom';
import React from 'react'

function CTA() {
  return (
    <section className="px-5 py-20">

      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-indigo-600 px-6 py-16 text-center shadow-xl md:px-12">

        <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
          Start Your Journey
        </p>

        <h2 className="mt-3 text-3xl font-bold text-white md:text-5xl">
          Ready to Share What You Know?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-indigo-100">
          Join SkillSwap, connect with curious learners, and turn your
          knowledge into meaningful connections.
        </p>

        <Link
          to="/register"
          className="mt-8 inline-block rounded-xl bg-white px-7 py-3 font-semibold text-indigo-600 transition hover:bg-gray-100"
        >
          Join SkillSwap
        </Link>

      </div>

    </section>
  );
}

export default CTA;