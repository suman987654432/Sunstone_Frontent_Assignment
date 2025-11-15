import {
    FiHome,
    FiBriefcase,
    FiUser,
    FiZap,
    FiCheckSquare,
} from "react-icons/fi";

const CategoryList = ({ onCategoryClick }) => {
    const categories = [
        { id: 'all', name: 'All Notes', icon: FiHome },
        { id: 'work', name: 'Work', icon: FiBriefcase },
        { id: 'personal', name: 'Personal', icon: FiUser },
        { id: 'ideas', name: 'Ideas', icon: FiZap },
        { id: 'tasks', name: 'Tasks', icon: FiCheckSquare },
    ];

    return (
        <nav className="mt-6 flex-1 overflow-y-auto">
            <h2 className="text-gray-500 dark:text-gray-400 text-xs uppercase mb-3 px-1">
                Categories
            </h2>

            <ul className="space-y-1 sm:space-y-2">
                {categories.map(category => {
                    const IconComponent = category.icon;
                    return (
                        <li
                            key={category.id}
                            onClick={() => onCategoryClick(category.id, category.name)}
                            className="flex items-center gap-3 text-gray-700 dark:text-gray-200 p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition text-sm sm:text-base"
                        >
                            <IconComponent className="text-lg flex-shrink-0" />
                            <span className="truncate">{category.name}</span>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default CategoryList;
