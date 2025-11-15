import { FiX } from "react-icons/fi";

const CategoryModal = ({ showModal, onClose, categories, onCategorySelect }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-80 mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        Select Category
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    Choose a category for your new note
                </p>

                <div className="space-y-2">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <button
                                key={category.id}
                                onClick={() => onCategorySelect(category)}
                                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition text-left"
                            >
                                <IconComponent className="text-gray-600 dark:text-gray-400 text-lg" />
                                <span className="text-gray-800 dark:text-white font-medium">
                                    {category.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 flex gap-2">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2 text-gray-600 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onCategorySelect({ id: 'all', name: 'All Notes' })}
                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                        Quick Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryModal;
