import { FiEdit2, FiTrash2, FiClock, FiAlertTriangle } from 'react-icons/fi';

const NoteCard = ({
    note,
    isSearching,
    isDuplicateTitle,
    getDuplicateCount,
    formatNoteDate,
    onNoteClick,
    onEditClick,
    onDeleteNote
}) => {
    const handleNoteClick = () => {
        if (onNoteClick && typeof onNoteClick === 'function') {
            onNoteClick(note);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation();
        if (onEditClick && typeof onEditClick === 'function') {
            onEditClick(note);
        }
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        if (onDeleteNote && typeof onDeleteNote === 'function') {
            onDeleteNote(note.id);
        }
    };

    return (
        <div
            className={`w-full bg-gray-50 dark:bg-gray-700 rounded-lg p-3 sm:p-4 hover:shadow-md transition cursor-pointer overflow-hidden ${isSearching ? 'ring-1 ring-blue-200 dark:ring-blue-800' : ''
                }`}
            onClick={handleNoteClick}
        >
            <div className="flex items-start justify-between mb-3 gap-2">
                <div className="flex-1 min-w-0 overflow-hidden">
                    <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base">
                        <div className="truncate break-words">{note.title}</div>
                        {isDuplicateTitle && typeof isDuplicateTitle === 'function' && isDuplicateTitle(note) && (
                            <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full mt-1">
                                <FiAlertTriangle className="text-xs" />
                                <span className="hidden sm:inline">
                                    Duplicate #{getDuplicateCount && typeof getDuplicateCount === 'function' ? getDuplicateCount(note) : '1'}
                                </span>
                                <span className="sm:hidden">
                                    Dup #{getDuplicateCount && typeof getDuplicateCount === 'function' ? getDuplicateCount(note) : '1'}
                                </span>
                            </span>
                        )}
                    </h3>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                    <button
                        onClick={handleEditClick}
                        className="text-gray-400 hover:text-blue-500 transition p-1 sm:p-0"
                    >
                        <FiEdit2 className="text-sm" />
                    </button>
                    <button
                        onClick={handleDeleteClick}
                        className="text-gray-400 hover:text-red-500 transition p-1 sm:p-0"
                    >
                        <FiTrash2 className="text-sm" />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 sm:line-clamp-3 break-words overflow-hidden">
                {note.description || 'No description'}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 flex-wrap sm:flex-nowrap overflow-hidden">
                <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                    <FiClock className="flex-shrink-0" />
                    <span className="truncate">
                        {formatNoteDate && typeof formatNoteDate === 'function' ? formatNoteDate(note.createdAt) : 'Unknown date'}
                    </span>
                </div>
                <span className="capitalize bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded flex-shrink-0 truncate">
                    {note.category}
                </span>
            </div>
        </div>
    );
};

export default NoteCard;
