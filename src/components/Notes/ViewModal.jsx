import { FiX, FiEdit2, FiTrash2, FiClock, FiAlertTriangle, FiEye } from 'react-icons/fi';

const ViewModal = ({
    showModal,
    viewingNote,
    onClose,
    onEditFromView,
    onDeleteFromView,
    isDuplicateTitle,
    formatDateTime
}) => {
    if (!showModal || !viewingNote) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl mx-auto max-h-[90vh] overflow-hidden flex flex-col">

                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                            Note Details
                        </h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    <div className="space-y-6">

                        <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Category:</span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 capitalize">
                                {viewingNote.category}
                            </span>
                            {isDuplicateTitle(viewingNote) && (
                                <span className="inline-flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded-full">
                                    <FiAlertTriangle className="text-xs" />
                                    <span className="hidden sm:inline">Duplicate Title</span>
                                    <span className="sm:hidden">Duplicate</span>
                                </span>
                            )}
                        </div>


                        <div>
                            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2 break-words leading-tight">
                                {viewingNote.title}
                            </h4>
                        </div>


                        <div className="flex items-start gap-2 text-gray-500 dark:text-gray-400">
                            <FiClock className="text-lg flex-shrink-0 mt-0.5" />
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                <span className="text-sm font-medium">Created:</span>
                                <span className="text-sm">
                                    {formatDateTime(new Date(viewingNote.createdAt))}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h5 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-3">
                                Description
                            </h5>
                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6 min-h-[120px] sm:min-h-[150px]">
                                {viewingNote.description ? (
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
                                        {viewingNote.description}
                                    </p>
                                ) : (
                                    <p className="text-gray-400 dark:text-gray-500 italic text-center py-8">
                                        No description provided
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>


                <div className="border-t border-gray-200 dark:border-gray-600 p-4 sm:p-6 flex-shrink-0">

                    <div className="hidden sm:flex gap-3">
                        <button
                            onClick={onEditFromView}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium"
                        >
                            <FiEdit2 className="text-sm" />
                            Edit Note
                        </button>
                        <button
                            onClick={onDeleteFromView}
                            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium"
                        >
                            <FiTrash2 className="text-sm" />
                            Delete Note
                        </button>
                        <button
                            onClick={onClose}
                            className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium"
                        >
                            <FiEye className="text-sm" />
                            Close
                        </button>
                    </div>

                    <div className="sm:hidden space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={onEditFromView}
                                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 font-medium text-sm"
                            >
                                <FiEdit2 className="text-sm" />
                                Edit
                            </button>
                            <button
                                onClick={onDeleteFromView}
                                className="flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-medium text-sm"
                            >
                                <FiTrash2 className="text-sm" />
                                Delete
                            </button>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-medium text-sm"
                        >
                            <FiEye className="text-sm" />
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
