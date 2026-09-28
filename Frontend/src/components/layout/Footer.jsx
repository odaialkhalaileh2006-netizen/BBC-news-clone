import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useContent } from "../../context/ContentContext";
import { CATEGORIES, pathFor, SOCIAL_ITEMS } from "./footerConstants";

function Footer() {
  const { bbcLanguages, socialLinks, bbcTerms } = useContent();
  const [languagesOpen, setLanguagesOpen] = useState(false);
  const [activePlatform, setActivePlatform] = useState(null);

  const platformCategories = activePlatform ? socialLinks[activePlatform] : null;

  const handleLanguagesToggle = () => {
    setActivePlatform(null); 
    setLanguagesOpen((prev) => !prev);
  };

  const handleIconClick = (key) => {
    setLanguagesOpen(false); 
    setActivePlatform((prev) => (prev === key ? null : key));
  };

  return (
    <footer>
      <div className="border-t border-black p-16 pt-4">
        <div>
          <a href="/" className="flex shrink-0 gap-2" aria-label="BBC Home">
            {["B", "B", "C"].map((letter, i) => (
              <span
                key={i}
                className="w-8 h-8 text-2xl bg-black text-white flex items-center justify-center font-black mr-0.5 last:mr-0"
              >
                {letter}
              </span>
            ))}
          </a>
        </div>

        <div className="gap-4 pt-5">
          {CATEGORIES.map((category) => (
            <a
              href={pathFor(category)}
              className="inline-block pr-4 py-2 text-sm font-semibold transition-colors text-black hover:underline"
              key={category}
            >
              {category}
            </a>
          ))}
        </div>

        <div className="border-t border-gray-300 mt-4">
          <button
            onClick={handleLanguagesToggle}
            className="flex w-full items-center justify-between px-4 py-3 bg-gray-200 hover:bg-gray-300"
          >
            <span>BBC in other languages</span>
            {languagesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {languagesOpen && (
            <div className="bg-gray-100 py-12">
              <div className="mx-auto max-w-6xl px-8">
                <h2 className="text-center font-semibold text-2xl">
                  The BBC is in multiple languages
                </h2>
                <p className="mt-4 text-center text-gray-600">
                  Read the BBC in your own language
                </p>
                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {bbcLanguages.map((language) => (
                    <a key={language.id} href={language.href} className="text-sm hover:underline">
                      {language.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="w-full bg-white font-sans mt-6 pt-4 border-t border-[#E5E5E5]">
          <div className="flex items-center gap-4">
            <span className="text-[15px] font-bold text-black">Follow BBC on:</span>
            {SOCIAL_ITEMS.map(({ key, label, Icon }) => {
              const isActive = activePlatform === key;
              return (
                <button
                  key={key}
                  onClick={() => handleIconClick(key)}
                  aria-label={`Follow BBC on ${label}`}
                  aria-pressed={isActive}
                  className={`flex items-center justify-center pb-1 border-b-2 transition-colors ${
                    isActive ? "border-black" : "border-transparent hover:opacity-70"
                  }`}
                >
                  <Icon />
                </button>
              );
            })}
          </div>

          {platformCategories && (
            <div className="bg-[#EBEBEB] mt-3">
              <div className="flex items-center px-4">
                {Object.entries(platformCategories).map(([cat, url]) => (
                  <a
                    key={cat}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-semibold py-2.5 mr-6 whitespace-nowrap  hover:underline"
                  >
                    {cat}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="font-sans text-sm text-gray-900 bg-white pt-5">
      
      <div className="flex flex-wrap gap-x-4 gap-y-3 mb-4">
        {bbcTerms.navigation_links.map((link, index) => (
          <a key={index} href={link.href} className="hover:underline">
            {link.text}
          </a>
        ))}
      </div>

      <div className="mb-4">
        <a href={bbcTerms.preferences.href} className="hover:underline">
          {bbcTerms.preferences.text}
        </a>
      </div>

      <div>
        <span>{bbcTerms.copyright_and_disclaimer.text} </span>
        <a 
          href={bbcTerms.copyright_and_disclaimer.policy_link.href} 
          className="font-bold hover:underline"
        >
          {bbcTerms.copyright_and_disclaimer.policy_link.text}
        </a>
      </div>
      
    </div>
      </div>
    </footer>
  );
}

export default Footer;