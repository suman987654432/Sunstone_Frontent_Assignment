import { FiX } from 'react-icons/fi';

const EditModal = ({
    showModal,
    editingNote,
    editForm,
    duplicateWarning,
    onClose,
    onSubmit,
    onTitleChange,
    setEditForm
}) => {
    if (!showModal || !editingNote) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-96 mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Edit Note
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <div className="mb-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        Category: <span className="font-medium text-blue-600 dark:text-blue-400 capitalize">
                            {editingNote.category}
                        </span>
                    </span>
                </div>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={editForm.title}
                            onChange={onTitleChange}
                            placeholder="Enter note title..."
                            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${duplicateWarning
                                    ? 'border-yellow-500 dark:border-yellow-400'
                                    : 'border-gray-300 dark:border-gray-600'
                                }`}
                            required
                            autoFocus
                        />
                        {duplicateWarning && (
                            <p className="text-yellow-600 dark:text-yellow-400 text-xs mt-1 flex items-center gap-1">
                                {duplicateWarning}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Description
                        </label>
                        <textarea
                            value={editForm.description}
                            onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="Enter note description..."
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Update Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditModal;
