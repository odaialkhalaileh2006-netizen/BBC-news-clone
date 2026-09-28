import React from "react";

function HeroSection({ title, summary, imageUrl, href = "/", section }) {
  return (
    <section >
      <a 
        href={href}
        className="inline-flex items-center gap-1 font-bold text-md uppercase hover:underline mb-6"
      >
        {section}

        <svg
          viewBox="0 0 32 32"
          className="w-4 h-4"
          fill="currentColor"
        >
          <path d="M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7v-3.4z" />
        </svg>
      </a>

      <a
        href={href}
        className="flex flex-col md:flex-row gap-8 items-center hover:opacity-90 "
      >
        <div className="flex-1 max-w-sm">
          <h1 className="text-2xl font-bold  hover:underline">
            {title}
          </h1>

          <p className="mt-4 text-gray-800 ">
            {summary}
          </p>
        </div>

        <div className="flex-1 overflow-hidden ">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition duration-300 hover:scale-105"
          />
        </div>
      </a>
    </section>
  );
}

export default HeroSection;