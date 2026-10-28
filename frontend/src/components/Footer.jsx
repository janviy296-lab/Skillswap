import { Link } from 'react-router-dom';
import React from 'react'

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-950 px-5 py-12 text-gray-300">

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">
            SkillSwap
          </h2>

          <p className="mt-3 max-w-sm leading-6 text-gray-400">
            Learn what you love, share what you know, and grow together
            with a community of learners.
          </p>
        </div>


        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white">
            Quick Links
          </h3>

          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          <Link to="/skills" className="hover:text-white transition">
            Explore Skills
          </Link>

          <Link to="/about" className="hover:text-white transition">
            How It Works
          </Link>
        </div>


        {/* Connect */}
        <div>
          <h3 className="font-semibold text-white">
            Get Started
          </h3>

          <p className="mt-4 leading-6 text-gray-400">
            Ready to exchange your skills?
          </p>

          <Link
            to="/register"
            className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Join SkillSwap
          </Link>
        </div>

      </div>


      {/* Bottom */}
      <div className="mx-auto mt-10 max-w-6xl border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
        © 2026 SkillSwap. Learn • Share • Grow.
      </div>

    </footer>
  );
}

export default Footer;