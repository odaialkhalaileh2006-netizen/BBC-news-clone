import { useState } from "react";

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

function SearchBar() {
  const [search, setSearch] = useState("");

  function handleSearch() {
    if (!search.trim()) return;

    console.log("Searching for:", search);

    // Add your search API/navigation logic here
    // Example:
    // navigate(`/search?q=${search}`)
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <div className="flex items-center border border-gray-300">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search news, topics and more"
        className="flex-1 min-w-0 px-3 py-2 text-sm outline-none placeholder:text-gray-500"
      />

      <button
        onClick={handleSearch}
        className="bg-black text-white w-10 h-9 flex items-center justify-center shrink-0"
        aria-label="Search"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

export default SearchBar;