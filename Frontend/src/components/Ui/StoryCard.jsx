import { Play, AudioLines, Bookmark } from 'lucide-react';
import Tag from './Tag';

function StoryCard({
  title, summary, imageUrl, category, timestamp, eyebrow,
  variant = 'grid', size = 'default', theme = 'light',
  rank, duration, videoIcon = false, isVideo = false,
  bordered = true, href = '#', badge, source, live = false,
  saved, onToggleSave,
}) {

  if (variant === 'audio') {
    return (
      <div className="group">
        <a href={href} className="block">
          <div className="relative aspect-square overflow-hidden bg-gray-200">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
            <span className="absolute bottom-2 left-2 flex h-6 w-6 items-center justify-center bg-white">
              <AudioLines className="h-3.5 w-3.5 text-gray-900" />
            </span>
          </div>

          {eyebrow && <span className="mt-2 block text-xs text-gray-500">{eyebrow}</span>}

          <h3 className="mt-1 line-clamp-3 font-display text-sm font-extrabold leading-snug text-gray-900 group-hover:underline">
            {title}
          </h3>
        </a>

        {onToggleSave && (
          <button
            type="button"
            onClick={onToggleSave}
            aria-pressed={saved}
            className={`mt-3 flex items-center gap-1.5 text-xs transition-colors ${
              saved ? 'font-semibold text-black' : 'text-gray-600 hover:text-black'
            }`}
          >
            <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-black' : ''}`} />
            <span>{saved ? 'Saved' : 'Save'}</span>
            <span className="text-gray-400">&middot;</span>
            <span>{duration}</span>
          </button>
        )}
      </div>
    );
  }

  if (variant === 'photo') {
    return (
      <a href={href} className="group">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full object-cover group-hover:brightness-95 transition"
          />
          {videoIcon && (
            <div className="absolute bottom-0 left-0 bg-white p-2">
              <Play className="w-6 h-6 fill-black text-black" />
            </div>
          )}
        </div>

        <h3 className="mt-3 text-[20px] font-bold leading-tight group-hover:underline">
          {title}
        </h3>

        {summary && <p className="mt-3 text-gray-700 leading-6">{summary}</p>}
      </a>
    );
  }
  const isList = variant === 'list';
  const isText = variant === 'text';
  const isDark = theme === 'dark';
  const meta = [timestamp, category].filter(Boolean).join(' | ');
  const hoverEffect = isDark ? '' : 'hover:brightness-125';

  return (
    <a href={href} className={`group h-full transition-all duration-200 ${hoverEffect} ${bordered ? 'bg-white border border-gray-200 shadow-sm hover:shadow-md' : ''} ${isList ? 'flex items-center gap-3 p-2' : 'flex flex-col'}`}>
      {!isText && (
        <div className={`relative overflow-hidden bg-gray-200 shrink-0 ${isList ? 'w-24 h-16 sm:w-28 sm:h-20' : 'aspect-video'}`}>
          <img src={imageUrl} alt={title} className={`w-full h-full object-cover ${isDark ? 'transition-transform duration-300 group-hover:scale-105' : ''}`} />
          {badge && (
            <span className="absolute top-0 left-0 bg-green-500 text-black text-[11px] font-black uppercase px-3 py-1.5" style={{ clipPath: 'polygon(0 0, 100% 0, 82% 100%, 0% 100%)' }}>
              {badge}
            </span>
          )}
          {typeof rank === 'number' && (
            <span className="absolute top-2 left-2 w-6 h-6 flex items-center justify-center bg-black/80 text-white text-xs font-bold">{rank}</span>
          )}
          {duration && (
            <>
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <span className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                  <Play className="w-4 h-4 text-black fill-black ml-0.5" />
                </span>
              </div>
              <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-semibold px-1.5 py-0.5">{duration}</span>
            </>
          )}
          {videoIcon && !duration && (
            <span className="absolute bottom-2 left-2 w-7 h-7 bg-black/70 flex items-center justify-center">
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            </span>
          )}
        </div>
      )}

      <div className={`flex flex-col flex-1 ${bordered && !isText ? (isList ? 'py-1' : 'p-4') : 'py-0'}`}>
        {category && bordered && !isList && <Tag className="w-fit mb-1">{category}</Tag>}
        {live && (
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-red-600 motion-safe:animate-pulse" />
            <span className="text-red-600 text-xs font-bold uppercase">Live</span>
          </div>
        )}
        <div className="flex items-start gap-1.5 mb-1.5">
          {isVideo && isText && <Play className="w-3 h-3 fill-gray-900 text-gray-900 shrink-0 mt-1" />}
          <h3 className={`font-display font-extrabold leading-snug group-hover:underline ${isDark ? 'text-white' : 'text-gray-900'} ${isList ? 'text-sm line-clamp-2' : size === 'large' ? 'text-xl sm:text-2xl line-clamp-3' : 'text-base line-clamp-2'}`}>
            {title}
          </h3>
        </div>
        {summary && !isList && (
          <p className={`mb-2 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'} ${size === 'large' ? 'text-base' : 'text-sm'}`}>
            {summary}
          </p>
        )}
        {source ? (
          <span className={`text-sm font-semibold mt-auto pt-1 ${isDark ? 'text-sky-400' : 'text-blue-700'}`}>{source}</span>
        ) : (
          timestamp && <span className="text-xs text-gray-400 mt-auto pt-1">{bordered ? timestamp : meta}</span>
        )}
      </div>
    </a>
  );
}

export default StoryCard;