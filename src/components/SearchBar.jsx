import { useState } from "react";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const Sidebar2 = ({ className = "", notes = [], onSearchResults, selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      onSearchResults && onSearchResults([]);
      return;
    }



    const filteredNotes = notes.filter(note => {
      const matchesTitle = note.title.toLowerCase().includes(query.toLowerCase());
      const matchesDescription = note.description?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = note.category.toLowerCase().includes(query.toLowerCase());

      return matchesTitle || matchesDescription || matchesCategory;
    });
    onSearchResults && onSearchResults(filteredNotes);
  };

  const clearSearch = () => {
    setSearchQuery('');
    onSearchResults && onSearchResults([]);
  };



  return (
    <div
      className={`bg-white dark:bg-gray-900 h-full border-r dark:border-gray-700 p-3 sm:p-4 flex flex-col 
      ${className}
      w-full min-w-[160px] max-w-[240px]
      `}
    >
      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2.5 rounded-lg shadow-sm">
        <FiSearch className="text-gray-600 dark:text-gray-300 text-lg sm:text-xl flex-shrink-0" />

        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-full text-sm sm:text-base 
          placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />

        {searchQuery && (
          <button
            onClick={clearSearch}
            className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition"
          >
            <FiX className="text-lg" />
          </button>
        )}

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
        >
          <FiFilter className="text-lg" />
        </button>
      </div>


      {searchQuery && (
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          Searching in: <span className="font-medium capitalize">{selectedCategory?.name || 'All Notes'}</span>
        </div>
      )}


      {showFilters && (
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">Search in:</h4>
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Title</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Description</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <input type="checkbox" defaultChecked className="rounded" />
              <span>Category</span>
            </label>
          </div>
        </div>
      )}


    </div>
  );
};

export default Sidebar2;
