import type { FC } from "react";

interface SearchBarProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  loading: boolean;
}

const SearchBar: FC<SearchBarProps> = ({ query, setQuery, onSearch, loading }) => {
  return (
    <div className="flex w-full rounded-lg overflow-hidden shadow-sm border border-gray-300">
      <input
        type="text"
        className="flex-1 px-3 py-2 text-sm focus:outline-none"
        placeholder="Search GitHub users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
          if (e.key === "Escape") setQuery("");
        }}
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
        onClick={onSearch}
        disabled={loading}
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
};

export default SearchBar;
