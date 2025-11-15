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
    return (
        <div
            className={`bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition cursor-pointer ${isSearching ? 'ring-1 ring-blue-200 dark:ring-blue-800' : ''
                }`}
            onClick={() => onNoteClick(note)}
        >
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 dark:text-white truncate flex items-center gap-2">
                        {note.title}
                        {isDuplicateTitle(note) && (
                          <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                            <FiAlertTriangle className="text-xs" />
                            Duplicate #{getDuplicateCount(note)}
                          </span>
                        )}
                    </h3>
                </div>
                <div className="flex gap-1 ml-2">
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onEditClick(note)
                        }}
                        className="text-gray-400 hover:text-blue-500 transition"
                    >
                        <FiEdit2 className="text-sm" />
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onDeleteNote && onDeleteNote(note.id)
                        }}
                        className="text-gray-400 hover:text-red-500 transition"
                    >
                        <FiTrash2 className="text-sm" />
                    </button>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-3">
                {note.description || 'No description'}
            </p>

            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <FiClock />
                <span>{formatNoteDate(note.createdAt)}</span>
                <span className="capitalize bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">
                    {note.category}
                </span>
            </div>
        </div>
    );
};

export default NoteCard;
