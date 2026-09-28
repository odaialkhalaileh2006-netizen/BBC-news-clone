import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StoryCard from "./StoryCard";

import "swiper/css";
import "swiper/css/navigation";

function AudioSlider({ title, href = "/", items }) {
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);
  const [savedIds, setSavedIds] = useState(new Set());

  function toggleSave(id) {
    setSavedIds((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  }

  return (
    <div >
      <div className="flex items-center justify-between border-t-2 border-black pt-3 mb-6">
        <a
          href={href}
          className="inline-flex items-center gap-1 font-bold text-sm uppercase hover:underline"
        >
          {title}
          <ChevronRight className="w-4 h-4" />
        </a>

        <div className="flex items-center gap-1">
          <button
            ref={setPrevEl}
            type="button"
            aria-label="Previous"
            className="p-1 text-gray-400 hover:text-black transition-colors hover:bg-gray-200"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            ref={setNextEl}
            type="button"
            aria-label="Next"
            className="p-1 text-gray-400 hover:text-black transition-colors hover:bg-gray-200"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl, nextEl }}
        spaceBetween={16}
        slidesPerView={2.3}
        slidesPerGroup={4}
        breakpoints={{
          640: { slidesPerView: 3.3 },
          1024: { slidesPerView: 4.3 },
          1280: { slidesPerView: 6 },
        }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <StoryCard
              variant="audio"
              title={item.title}
              imageUrl={item.imageUrl}
              eyebrow={item.show}
              duration={item.duration}
              href={item.href}
              saved={savedIds.has(item.id)}
              onToggleSave={() => toggleSave(item.id)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default AudioSlider;