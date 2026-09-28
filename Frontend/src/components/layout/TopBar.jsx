import React, { useState } from "react";
import { useContent } from "../../context/ContentContext";
import SearchBar from "../Ui/SearchBar";

function ChevronDown() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        d="M6 9l6 6 6-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function TopBar() {
  const { navItems } = useContent();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative">


      <div className="flex items-center justify-between px-6 h-20 bg-white text-white border-b border-gray-200">

        
        <button
          className="flex items-center gap-2 hover:bg-gray-200 transition p-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <svg
          width="50"
          height="30"
          viewBox="0 0 80 48"
          fill="none"
        >
          <circle
            cx="56"
            cy="24"
            r="12"
            stroke="black"
            strokeWidth="4"
          />

          <line
            x1="65"
            y1="33"
            x2="72"
            y2="40"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <path
            d="M10 12H38M10 24H33M10 36H38"
            stroke="black"
            strokeWidth="4"
          />
        </svg>
        </button>


        <a
          href="/"
          className="flex shrink-0 gap-2 pl-28"
          aria-label="BBC Home"
        >
          {["B", "B", "C"].map((letter, i) => (
            <span
              key={i}
              className="w-8 h-8 text-2xl bg-black text-white flex items-center justify-center font-black"
            >
              {letter}
            </span>
          ))}
        </a>


       
        <div className="flex items-center gap-2 font-semibold text-sm">

          <button className="bg-black text-white px-4 py-2 hover:bg-gray-600 transition">
            Register
          </button>

          <button className="bg-white text-black px-4 py-2 hover:bg-gray-600 hover:text-white transition">
            Sign In
          </button>

        </div>

      </div>


      {menuOpen && (

        <div className="fixed inset-0 z-50 flex text-black">

          <div className="w-[300px] max-w-[80vw] h-full bg-white flex flex-col shadow-xl">


            <div className="flex items-center px-5 pt-4 pb-3">

              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-1 hover:bg-gray-100 rounded transition"
              >
                <CloseIcon />
              </button>

            </div>


            <div className="px-4 pb-4">
              <SearchBar />
            </div>



            <nav className="flex-1 overflow-y-auto">

              <ul>

                {navItems.map((item) => (

                  <li key={item.label}>

                    <button className="w-full flex items-center justify-between px-5 py-3 text-sm hover:bg-gray-50 transition">

                      <span
                        className={
                          item.active
                            ? "font-bold underline underline-offset-4"
                            : "font-normal"
                        }
                      >
                        {item.label}
                      </span>


                      {item.hasChevron && <ChevronDown />}

                    </button>

                  </li>

                ))}

              </ul>

            </nav>


          </div>


          <div
            className="flex-1 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />

        </div>

      )}

    </div>
  );
}

export default TopBar;