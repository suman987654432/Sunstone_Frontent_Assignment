const NotesHeader = ({
    selectedCategory,
    isSearching,
    searchResultsCount,
    formatDateTime,
    currentDateTime
}) => {
    const getHeaderTitle = () => {
        if (isSearching) {
            return `Search Results (${searchResultsCount})`;
        }
        return selectedCategory?.name || 'All Notes';
    };

    const getHeaderSubtitle = () => {
        if (isSearching) {
            return `Found ${searchResultsCount} note${searchResultsCount !== 1 ? 's' : ''} matching your search`;
        }
        return formatDateTime(currentDateTime);
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
                    {getHeaderTitle()}
                </h1>
                {isSearching && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                        Active Search
                    </span>
                )}
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {getHeaderSubtitle()}
            </p>
            {isSearching && (
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                    Searching in: <span className="font-medium capitalize">{selectedCategory?.name || 'All Categories'}</span>
                </p>
            )}
        </div>
    );
};

export default NotesHeader;
