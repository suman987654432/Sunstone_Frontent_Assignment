import { useState, useEffect } from "react";
import { FiPlus, FiX, FiLogOut } from "react-icons/fi";
import { showToast } from '../utils/toast';
import CategoryModal from './Sidebar/CategoryModal';
import NoteFormModal from './Sidebar/NoteFormModal';
import SearchBar from './Sidebar/SearchBar';
import CategoryList from './Sidebar/CategoryList';
import {
    FiHome,
    FiBriefcase,
    FiUser,
    FiZap,
    FiCheckSquare,
} from "react-icons/fi";

const Sidebar = ({ isOpen, onClose, onCategorySelect, onAddNote, checkDuplicateTitle, notes = [], onSearchResults, selectedCategory }) => {
    const [width] = useState(260);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showNoteForm, setShowNoteForm] = useState(false);
    const [selectedCategoryForNote, setSelectedCategoryForNote] = useState(null);
    const [noteForm, setNoteForm] = useState({ title: '', description: '' });
    const [duplicateWarning, setDuplicateWarning] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showFilters, setShowFilters] = useState(false);


    const categories = [
        { id: 'all', name: 'All Notes', icon: FiHome },
        { id: 'work', name: 'Work', icon: FiBriefcase },
        { id: 'personal', name: 'Personal', icon: FiUser },
        { id: 'ideas', name: 'Ideas', icon: FiZap },
        { id: 'tasks', name: 'Tasks', icon: FiCheckSquare },
    ];

    useEffect(() => {
        const categoryModel = () => {
            setShowCategoryModal(true);
        };

        window.addEventListener('openAddNoteModal', categoryModel);

        return () => {
            window.removeEventListener('openAddNoteModal', categoryModel);
        };
    }, []);


    const handleCategorySelect = (category) => {
        console.log('Selected category:', category);
        setShowCategoryModal(false);
        setSelectedCategoryForNote(category);
        setNoteForm({ title: '', description: '' });
        setShowNoteForm(true);
    };

    const handleCategoryClick = (categoryId, categoryName) => {
        const category = { id: categoryId, name: categoryName };
        onCategorySelect && onCategorySelect(category);
        if (window.innerWidth < 768) {
            onClose();
        }
    };

    const handleNoteSubmit = (e) => {
        e.preventDefault();
        if (noteForm.title.trim() && onAddNote) {
            const newNote = onAddNote({
                category: selectedCategoryForNote.id,
                title: noteForm.title.trim(),
                description: noteForm.description.trim(),
            });

            console.log('Created new note:', newNote);
            onCategorySelect && onCategorySelect(selectedCategoryForNote);
        }
        setShowNoteForm(false);
        setNoteForm({ title: '', description: '' });
        setDuplicateWarning('');
    };

    const handleNoteCancel = () => {
        setShowNoteForm(false);
        setNoteForm({ title: '', description: '' });
        setSelectedCategoryForNote(null);
        setDuplicateWarning('');
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setNoteForm(prev => ({ ...prev, title: newTitle }));
        if (duplicateWarning) {
            setDuplicateWarning('');
        }

        if (newTitle.trim() && selectedCategoryForNote && checkDuplicateTitle) {
            const duplicates = checkDuplicateTitle(newTitle.trim(), selectedCategoryForNote.id);
            if (duplicates && duplicates.length > 0) {
                setDuplicateWarning(`A note with this title already exists in ${selectedCategoryForNote.name}. It will be marked as duplicate.`);
                showToast.warning('Duplicate title detected - note will be marked as duplicate');
            }
        }
    };

    const handleSearch = (query) => {
        setSearchQuery(query);

        if (!query.trim()) {
            onSearchResults && onSearchResults([]);
            return;
        }

        const filteredNotes = notes.filter(note => {
            const matchesTitle = note.title.toLowerCase().includes(query.toLowerCase());
            const matchesDescription = note.description?.toLowerCase().includes(query.toLowerCase());
            const matchesCategory = note.category.toLowerCase().includes(query.toLowerCase());

            return matchesTitle || matchesDescription || matchesCategory;
        });

        onSearchResults && onSearchResults(filteredNotes);
    };

    const clearSearch = () => {
        setSearchQuery('');
        onSearchResults && onSearchResults([]);
    };

    return (
        <>
            <CategoryModal
                showModal={showCategoryModal}
                onClose={() => setShowCategoryModal(false)}
                categories={categories}
                onCategorySelect={handleCategorySelect}
            />

            <NoteFormModal
                showModal={showNoteForm}
                onClose={handleNoteCancel}
                onSubmit={handleNoteSubmit}
                noteForm={noteForm}
                setNoteForm={setNoteForm}
                selectedCategory={selectedCategoryForNote}
                duplicateWarning={duplicateWarning}
                onTitleChange={handleTitleChange}
            />


            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40 backdrop-blur-sm transition-all duration-300"
                ></div>
            )}


            <div>

                <aside
                    className={`fixed md:static top-0 left-0 h-full bg-white dark:bg-gray-900 border-r dark:border-gray-700 p-4 sm:p-5 flex flex-col z-50 transform transition-all duration-300 ease-in-out shadow-lg dark:shadow-gray-900/50
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
                    style={{
                        width: window.innerWidth < 768 ? '280px' : width,
                        maxWidth: '85vw'
                    }}
                >

                    <button
                        onClick={onClose}
                        className="md:hidden text-2xl mb-4 self-end text-gray-700 dark:text-gray-300 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                        <FiX />
                    </button>

                    <button
                        onClick={() => setShowCategoryModal(true)}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2.5 px-3 rounded-lg transition-all duration-200 text-sm sm:text-base shadow-md hover:shadow-lg"
                    >
                        <FiPlus className="text-lg sm:text-xl" />
                        <span>Add Note</span>
                    </button>

                    <SearchBar
                        searchQuery={searchQuery}
                        onSearch={handleSearch}
                        onClearSearch={clearSearch}
                        showFilters={showFilters}
                        setShowFilters={setShowFilters}
                        selectedCategory={selectedCategory}
                    />

                    <CategoryList onCategoryClick={handleCategoryClick} />

                    <button className="flex items-center justify-center sm:justify-start gap-3 text-red-600 dark:text-red-400 p-2 sm:p-3 rounded-lg hover:bg-red-50 dark:hover:bg-gray-800 transition-all duration-200 text-sm sm:text-base">
                        <FiLogOut className="text-lg" />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </aside>


                <div

                    className="hidden md:block w-1 hover:w-2 cursor-ew-resize bg-transparent hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200 relative"
                    style={{ minHeight: '100vh' }}
                >
                    <div className="absolute top-1/2 left-0 w-full h-8 bg-gray-300 dark:bg-gray-700 rounded-r opacity-0 hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
