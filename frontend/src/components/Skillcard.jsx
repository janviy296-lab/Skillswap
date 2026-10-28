import React from 'react'


function SkillCard({ name, description, level, learners }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Icon */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
        ✨
      </div>

      {/* Skill Name */}
      <h3 className="text-xl font-bold text-gray-900">
        {name}
      </h3>

      {/* Description */}
      <p className="mt-2 leading-6 text-gray-600">
        {description}
      </p>

      {/* Skill Information */}
      <div className="mt-5 flex items-center justify-between">

        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
          {level}
        </span>

        <span className="text-sm text-gray-500">
          {learners} learners
        </span>

      </div>

      {/* Button */}
      <button className="mt-6 w-full rounded-xl bg-gray-900 px-4 py-3 font-semibold text-white transition hover:bg-indigo-600">
        Explore Skill
      </button>

    </article>
  );
}



export default SkillCard;


