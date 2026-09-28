export function pathFor(category) {
  return category === "Home" ? "/" : `/${category.toLowerCase()}`;
}

export const CATEGORIES = [
  "Home",
  "News",
  "Football 2026",
  "Business",
  "Technology",
  "Health",
  "Culture",
  "Arts",
  "Travel",
  "Earth",
  "Sport",
  "Audio",
  "Video",
  "Live",
  "Weather",
  "BBC Shop",
  "BritBox",
];


const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#3F3F42]">
    <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.928l-5.4-6.5L4.5 22H1.24l8.02-9.17L1 2h7.13l4.88 5.94L18.244 2Zm-1.21 18h1.72L7.06 4H5.22l11.814 16Z" />
  </svg>
);

const FacebookGlyph = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[22px] fill-[#3F3F42]">
    <path d="M15 4h3V0h-3c-2.76 0-5 2.24-5 5v3H7v4h3v12h4V12h3l1-4h-4V5c0-.55.45-1 1-1Z" />
  </svg>
);

const InstagramBadge = () => (
  <div className="w-[26px] h-[26px] rounded-md bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] fill-none stroke-white stroke-[1.8]">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
    </svg>
  </div>
);

const TikTokBadge = () => (
  <div className="w-[26px] h-[26px] rounded-md bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
      <path d="M16.6 0h-3.3v15.4a3.1 3.1 0 1 1-2.6-3.06V8.9a6.4 6.4 0 1 0 5.9 6.38V6.9a8.1 8.1 0 0 0 4.8 1.56V5.16A4.8 4.8 0 0 1 16.6 0Z" />
    </svg>
  </div>
);

const LinkedInGlyph = () => (
  <div className="w-[22px] h-[22px] rounded-[3px] border border-[#3F3F42] flex items-center justify-center">
    <span className="text-[13px] font-bold leading-none text-[#3F3F42]">in</span>
  </div>
);

const YouTubeBadge = () => (
  <div className="w-[28px] h-[20px] rounded-md bg-black flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-[12px] h-[12px] fill-white">
      <path d="M8 5v14l11-7z" />
    </svg>
  </div>
);

export const SOCIAL_ITEMS = [
  { key: "x", label: "X", Icon: XIcon },
  { key: "facebook", label: "Facebook", Icon: FacebookGlyph },
  { key: "instagram", label: "Instagram", Icon: InstagramBadge },
  { key: "tiktok", label: "TikTok", Icon: TikTokBadge },
  { key: "linkedin", label: "LinkedIn", Icon: LinkedInGlyph },
  { key: "youtube", label: "YouTube", Icon: YouTubeBadge },
];