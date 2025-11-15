import { FiSearch, FiFilter, FiX } from "react-icons/fi";

const SearchBar = ({
    searchQuery,
    onSearch,
    onClearSearch,
    showFilters,
    setShowFilters,
    selectedCategory
}) => {
    return (
        <div className="mt-4">
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-2.5 rounded-lg shadow-sm">
                <FiSearch className="text-gray-600 dark:text-gray-300 text-lg flex-shrink-0" />

                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => onSearch(e.target.value)}
                    className="bg-transparent outline-none text-gray-700 dark:text-gray-200 w-full text-sm placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-0 border-0"
                    style={{ boxShadow: 'none' }}
                />

                {searchQuery && (
                    <button
                        onClick={onClearSearch}
                        className="text-gray-600 dark:text-gray-300 hover:text-red-500 transition focus:outline-none"
                    >
                        <FiX className="text-sm" />
                    </button>
                )}

                <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none"
                >
                    <FiFilter className="text-sm" />
                </button>
            </div>

            {searchQuery && (
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    Searching in: <span className="font-medium capitalize">{selectedCategory?.name || 'All Notes'}</span>
                </div>
            )}


            {showFilters && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
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

export default SearchBar;
