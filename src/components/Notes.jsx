import React, { useState, useEffect } from 'react'
import { showToast } from '../utils/toast';
import ViewModal from './Notes/ViewModal';
import EditModal from './Notes/EditModal';
import NotesHeader from './Notes/NotesHeader';
import NotesGrid from './Notes/NotesGrid';

const Notes = ({
    selectedCategory,
    notes,
    loading,
    onUpdateNote,
    onDeleteNote,
    getDuplicateTitleGroups,
    checkDuplicateTitle,
    isSearching = false,
    searchResultsCount = 0,
    onAddNoteClick
}) => {
    const [currentDateTime, setCurrentDateTime] = useState(new Date())
    const [duplicateGroups, setDuplicateGroups] = useState({})
    const [showEditForm, setShowEditForm] = useState(false)
    const [editingNote, setEditingNote] = useState(null)
    const [editForm, setEditForm] = useState({ title: '', description: '' })
    const [duplicateWarning, setDuplicateWarning] = useState('')
    const [showViewModal, setShowViewModal] = useState(false)
    const [viewingNote, setViewingNote] = useState(null)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDateTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        if (getDuplicateTitleGroups) {
            const duplicates = getDuplicateTitleGroups(notes);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            setDuplicateGroups(duplicates);
        }
    }, [notes, getDuplicateTitleGroups]);

    const formatDateTime = (date) => {
        return date.toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatNoteDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const isDuplicateTitle = (note) => {
        const normalizedTitle = note.title.toLowerCase().trim();
        return duplicateGroups[normalizedTitle]?.includes(note.id);
    };

    const getDuplicateCount = (note) => {
        const normalizedTitle = note.title.toLowerCase().trim();
        const duplicateIds = duplicateGroups[normalizedTitle] || [];
        
        if (duplicateIds.length <= 1) return 0;
        
        // Sort IDs to ensure consistent numbering
        const sortedIds = duplicateIds.sort((a, b) => a - b);
        const noteIndex = sortedIds.indexOf(note.id);
        
        return noteIndex + 1; // Start numbering from 1
    };

    const handleEditClick = (note) => {
        setEditingNote(note)
        setEditForm({ title: note.title, description: note.description })
        setDuplicateWarning('')
        setShowEditForm(true)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        if (editForm.title.trim() && onUpdateNote) {
            onUpdateNote(editingNote.id, {
                title: editForm.title.trim(),
                description: editForm.description.trim(),
            })

            setShowEditForm(false)
            setEditingNote(null)
            setEditForm({ title: '', description: '' })
            setDuplicateWarning('')
        }
    }

    const handleEditCancel = () => {
        setShowEditForm(false)
        setEditingNote(null)
        setEditForm({ title: '', description: '' })
        setDuplicateWarning('')
    }

    const handleTitleChange = (e) => {
        const newTitle = e.target.value
        setEditForm(prev => ({ ...prev, title: newTitle }))


        if (duplicateWarning) {
            setDuplicateWarning('')
        }

        if (newTitle.trim() && editingNote && checkDuplicateTitle) {
            const duplicates = checkDuplicateTitle(newTitle.trim(), editingNote.category, editingNote.id)
            if (duplicates && duplicates.length > 0) {
                setDuplicateWarning(`A note with this title already exists in this category. It will be marked as duplicate.`)
                showToast.warning('Duplicate title detected - note will be marked as duplicate');
            }
        }
    }

    const handleNoteClick = (note) => {
        setViewingNote(note)
        setShowViewModal(true)
    }

    const handleCloseViewModal = () => {
        setShowViewModal(false)
        setViewingNote(null)
    }

    const handleEditFromView = () => {
        if (viewingNote) {
            setShowViewModal(false)
            handleEditClick(viewingNote)
        }
    }

    const handleDeleteFromView = () => {
        if (viewingNote && onDeleteNote) {
            onDeleteNote(viewingNote.id)
            setShowViewModal(false)
            setViewingNote(null)
        }
    }



    if (loading) {
        return (
            <div className="h-full flex items-center justify-center">
                <div className="text-gray-500 dark:text-gray-400">Loading notes...</div>
            </div>
        )
    }

    return (
        <>
            <ViewModal
                showModal={showViewModal}
                viewingNote={viewingNote}
                onClose={handleCloseViewModal}
                onEditFromView={handleEditFromView}
                onDeleteFromView={handleDeleteFromView}
                isDuplicateTitle={isDuplicateTitle}
                formatDateTime={formatDateTime}
            />

            <EditModal
                showModal={showEditForm}
                editingNote={editingNote}
                editForm={editForm}
                duplicateWarning={duplicateWarning}
                onClose={handleEditCancel}
                onSubmit={handleEditSubmit}
                onTitleChange={handleTitleChange}
                setEditForm={setEditForm}
            />

            <div className="h-full p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <NotesHeader
                        selectedCategory={selectedCategory}
                        isSearching={isSearching}
                        searchResultsCount={searchResultsCount}
                        formatDateTime={formatDateTime}
                        currentDateTime={currentDateTime}
                    />

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 min-h-[60vh]">
                        <NotesGrid
                            notes={notes}
                            isSearching={isSearching}
                            isDuplicateTitle={isDuplicateTitle}
                            getDuplicateCount={getDuplicateCount}
                            formatNoteDate={formatNoteDate}
                            onNoteClick={handleNoteClick}
                            onEditClick={handleEditClick}
                            onDeleteNote={onDeleteNote}
                            onAddNoteClick={onAddNoteClick}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Notes