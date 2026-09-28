import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

import 'swiper/css';
import 'swiper/css/navigation';

function EditorsPicks() {
  const { editorsPicks } = useContent();
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <div className="bg-gray-900 px-4 sm:p-16 text-[#e6e8ea]">
      <div className="flex items-center justify-between border-t-2 border-white pt-3 mb-6">
        <h2 className="font-display font-extrabold uppercase tracking-wide text-white text-sm">
          Editor&rsquo;s Picks
        </h2>
        <div className="flex items-center gap-1">
          <button
            ref={setPrevEl}
            type="button"
            aria-label="Previous"
            className="p-1 text-white/70 hover:text-white transition-colors disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={setNextEl}
            type="button"
            aria-label="Next"
            className="p-1 text-white/70 hover:text-white transition-colors disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{ prevEl, nextEl }}
        spaceBetween={16}
        slidesPerView={1.3}
        breakpoints={{
          480: { slidesPerView: 2.3 },
          768: { slidesPerView: 3.3 },
          1024: { slidesPerView: 4.3 },
          1280: { slidesPerView: 5 },
        }}
      >
        {editorsPicks.map((item) => (
          <SwiperSlide key={item.id}>
            <a href={item.href} className="group block hover:brightness-125">
              <div className="relative aspect-video overflow-hidden bg-gray-800">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <span className="absolute bottom-2 left-2 w-7 h-7 bg-black/70 flex items-center justify-center">
                  <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
                </span>
              </div>

              <h3 className="font-display font-extrabold  text-base leading-snug mt-3 line-clamp-2 group-hover:underline">
                {item.title}
              </h3>
              <p className=" text-sm mt-2 line-clamp-3">{item.summary}</p>
              <span className="block  text-sm font-semibold mt-2 text-gray-400">{item.source}</span>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default EditorsPicks;    