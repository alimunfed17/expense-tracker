import { useEffect, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(query.trim());
    }, 500); // 500ms debounce
    return () => clearTimeout(delay);
  }, [query]);

  const handleReset = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div
      className="flex items-center bg-white border border-gray-300 rounded-full shadow-sm 
                 px-4 py-2 w-full md:w-1/2 mx-auto mb-6"
    >
      <FiSearch className="text-gray-400 text-xl mr-3" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search: category:food date:2025-10 amount>100 or just type food..."
        className="flex-1 focus:outline-none text-gray-700 placeholder-gray-400"
      />
      {query && (
        <button
          type="button"
          onClick={handleReset}
          className="ml-2 text-gray-400 hover:text-gray-600"
        >
          <FiX className="text-lg" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
