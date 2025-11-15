import NoteCard from './NoteCard';
import {
    FiPlus,
} from "react-icons/fi";
const NotesGrid = ({
    notes,
    isSearching,
    isDuplicateTitle,
    getDuplicateCount,
    formatNoteDate,
    onNoteClick,
    onEditClick,
    onDeleteNote,
    onAddNoteClick
}) => {
    if (notes.length === 0) {
        return (
            <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                {isSearching ? (
                    <>
                        <p className="text-lg">No notes found</p>
                        <p className="text-sm mt-2">Try different search terms or check other categories</p>
                    </>
                ) : (
                    <>
                        <p className="text-lg">No notes available</p>
                        <div className="mt-4">
                            <p className="text-sm mb-4">Create your first note to get started</p>
                            <button
                                onClick={onAddNoteClick}
                                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2.5 px-4 rounded-lg transition-all duration-200 text-sm font-medium shadow-md hover:shadow-lg"
                            >
                                <FiPlus className="text-lg" />
                                <span>Add Your First Note</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map(note => (
                <NoteCard
                    key={note.id}
                    note={note}
                    isSearching={isSearching}
                    isDuplicateTitle={isDuplicateTitle}
                    getDuplicateCount={getDuplicateCount}
                    formatNoteDate={formatNoteDate}
                    onNoteClick={onNoteClick}
                    onEditClick={onEditClick}
                    onDeleteNote={onDeleteNote}
                />
            ))}
        </div>
    );
};

export default NotesGrid;
