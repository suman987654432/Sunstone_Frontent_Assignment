import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Notes from '../components/Notes'
import { useNotes } from '../hooks/useNotes'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [, setIsMobile] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState({ id: 'all', name: 'All Notes' })
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const { loading, addNote, updateNote, deleteNote, getNotesByCategory, checkDuplicateTitle, getDuplicateTitleGroups } = useNotes()

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
            if (window.innerWidth >= 768) {
                setSidebarOpen(false)
            }
        }



        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    const handleMobileMenuToggle = () => {
        setSidebarOpen(!sidebarOpen)
    }

    const handleSidebarClose = () => {
        setSidebarOpen(false)
    }

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSearchResults([]);
        setIsSearching(false);
    }

    const handleAddNote = (noteData) => {
        const newNote = addNote(noteData)
        return newNote
    }

    const handleSearchResults = (results) => {
        setSearchResults(results);
        setIsSearching(true);
    };
    const displayNotes = isSearching ? searchResults : getNotesByCategory(selectedCategory.id);

    const handleAddNoteClick = () => {

        setSidebarOpen(true);
        const event = new CustomEvent('openAddNoteModal');
        window.dispatchEvent(event);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar onMobileMenuToggle={handleMobileMenuToggle} />

            <div className="flex flex-1 min-h-0 overflow-hidden">
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={handleSidebarClose}
                    onCategorySelect={handleCategorySelect}
                    onAddNote={handleAddNote}
                    checkDuplicateTitle={checkDuplicateTitle}
                    notes={getNotesByCategory(selectedCategory.id)}
                    onSearchResults={handleSearchResults}
                    selectedCategory={selectedCategory}
                />
                <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto transition-colors duration-300">
                    <Notes
                        selectedCategory={selectedCategory}
                        notes={displayNotes}
                        loading={loading}
                        onUpdateNote={updateNote}
                        onDeleteNote={deleteNote}
                        getDuplicateTitleGroups={getDuplicateTitleGroups}
                        checkDuplicateTitle={checkDuplicateTitle}
                        isSearching={isSearching}
                        searchResultsCount={searchResults.length}
                        onAddNoteClick={handleAddNoteClick}
                    />
                </main>
            </div>
        </div>
    )
}

export default Dashboard