import { useState, useEffect, useRef } from "react";
import { useReader } from "../../context/ReaderAuthContext";

function ReaderMenu() {
  const { reader, logout } = useReader();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={menuRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center bg-black px-4 py-2 text-white transition hover:bg-gray-600"
      >
        <span className="max-w-[10rem] truncate">{reader.name}</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 mt-2 w-56 border border-gray-200 bg-white text-black shadow-lg"
        >
          <p className="truncate border-b border-gray-200 px-4 py-3 text-xs font-normal text-gray-500">
            {reader.email}
          </p>
          <button
            type="button"
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await logout();
            }}
            className="w-full px-4 py-3 text-left text-sm font-normal hover:bg-gray-100"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default ReaderMenu;