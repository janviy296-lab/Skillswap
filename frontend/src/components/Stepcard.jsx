import React from 'react'

  function StepCard({ number, title, description }) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Step Number */}
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
        {number}
      </div>

      {/* Title */}
      <h3 className="mt-6 text-xl font-bold text-gray-900">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 leading-6 text-gray-600">
        {description}
      </p>

    </article>
  );
}

export default StepCard;