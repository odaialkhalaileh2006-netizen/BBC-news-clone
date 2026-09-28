import React from "react";
import { useContent } from "../../context/ContentContext";

function Health() {
    const { HealthSec } = useContent();

    return(
    <section className="max-w-auto p-16">

      <div className="border-t-2 border-black pt-3 mb-8">
        <a
          href={HealthSec.sectionHref}
          className="inline-flex items-center gap-1 text-lg font-bold uppercase hover:underline"
        >
          {HealthSec.section}

          <svg
            viewBox="0 0 32 32"
            className="w-4 h-4"
            fill="currentColor"
          >
            <path d="M21.6 14.3 5.5 31h6.4l14.6-15L11.9 1H5.5l16.1 16.7v-3.4z" />
          </svg>
        </a>
      </div>

      <a
        href={HealthSec.href}
        className="grid md:grid-cols-12 gap-8 items-center group"
      >
        <div className="md:col-span-8">
          <img
            src={HealthSec.imageUrl}
            alt={HealthSec.title}
            className="w-full object-cover"
          />
        </div>

        <div className="md:col-span-4">
          <h2 className="text-2xl font-semibold leading-tight group-hover:underline">
            {HealthSec.title}
          </h2>

          <p className="mt-6 text-sm text-gray-700 leading-7">
            {HealthSec.summary}
          </p>
        </div>
      </a>
    </section>
  
    )
}

export default Health;