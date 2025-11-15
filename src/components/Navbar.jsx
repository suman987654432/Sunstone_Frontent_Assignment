import { FiUser, FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";
import logo from "../assets/logo.png";

const Navbar = ({ onMobileMenuToggle }) => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <nav className="w-full px-3 sm:px-4 md:px-6 py-2 sm:py-3 bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-700 flex items-center justify-between transition-colors duration-300">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">

                <button
                    onClick={onMobileMenuToggle}
                    className="md:hidden text-lg sm:text-xl p-1.5 sm:p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 flex-shrink-0"
                >
                    <FiMenu className="text-gray-800 dark:text-white" />
                </button>
                <img
                    src={logo}
                    alt="Logo"
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-md shadow-sm flex-shrink-0"
                />

                <h1 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-gray-800 dark:text-white tracking-wide">
                    Sunstone<span className="text-blue-600 dark:text-blue-400">Notes</span>
                </h1>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-5 text-gray-700 dark:text-gray-200 flex-shrink-0">

                <button
                    onClick={toggleTheme}
                    className="relative text-base sm:text-lg md:text-xl p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300 group"
                    title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                    <div className="relative">
                        {isDarkMode ? (
                            <FiSun className="text-yellow-500 transform transition-transform duration-300 group-hover:rotate-12" />
                        ) : (
                            <FiMoon className="text-gray-600 dark:text-gray-300 transform transition-transform duration-300 group-hover:-rotate-12" />
                        )}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"></div>
                    </div>
                </button>
                <button
                    className="text-base sm:text-lg md:text-xl lg:text-2xl p-1.5 sm:p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-200 group"
                    aria-label="Profile Menu"
                >
                    <FiUser className="group-hover:scale-110 transition-transform duration-200" />
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
