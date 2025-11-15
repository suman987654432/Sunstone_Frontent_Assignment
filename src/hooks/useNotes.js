import { useState, useEffect } from 'react';
import { showToast } from '../utils/toast';

const STORAGE_KEY = 'sunstone_notes';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadNotes();
  }, []);
  useEffect(() => {
    if (!loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  }, [notes, loading]);

  const loadNotes = async () => {
    try {
      const savedNotes = localStorage.getItem(STORAGE_KEY);

      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      } else {
        const response = await fetch('/data/notes.json');
        const initialNotes = await response.json();
        setNotes(initialNotes);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };

  const addNote = (noteData) => {
    const newNote = {
      id: Date.now(),
      title: noteData.title || 'Untitled',
      description: noteData.description || '',
      category: noteData.category || 'all',
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    showToast.success(`Note "${newNote.title}" created successfully!`);
    return newNote;
  };

  const updateNote = (id, updates) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === id ? { ...note, ...updates } : note
      )
    );
    showToast.success(`Note "${updates.title}" updated successfully!`);
  };

  const deleteNote = (id) => {
    const noteToDelete = notes.find(note => note.id === id);
    setNotes(prev => prev.filter(note => note.id !== id));
    showToast.success(`Note "${noteToDelete?.title}" deleted successfully!`);
  };

  const getNotesByCategory = (category) => {
    if (category === 'all') return notes;
    return notes.filter(note => note.category === category);
  };

  const checkDuplicateTitle = (title, category, excludeId = null) => {
    return notes.filter(note =>
      note.title.toLowerCase().trim() === title.toLowerCase().trim() &&
      note.category === category &&
      note.id !== excludeId
    );
  };




  const getDuplicateTitleGroups = (categoryNotes) => {
    const titleGroups = {};

    categoryNotes.forEach(note => {
      const normalizedTitle = note.title.toLowerCase().trim();
      if (!titleGroups[normalizedTitle]) {
        titleGroups[normalizedTitle] = [];
      }
      titleGroups[normalizedTitle].push(note.id);
    });
    const duplicateGroups = {};
    Object.keys(titleGroups).forEach(title => {
      if (titleGroups[title].length > 1) {
        duplicateGroups[title] = titleGroups[title];
      }
    });

    return duplicateGroups;
  };


  const searchNotes = (query, categoryNotes = notes) => {
    if (!query || !query.trim()) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();

    return categoryNotes.filter(note => {
      const matchesTitle = note.title.toLowerCase().includes(searchTerm);
      const matchesDescription = note.description?.toLowerCase().includes(searchTerm);
      const matchesCategory = note.category.toLowerCase().includes(searchTerm);

      return matchesTitle || matchesDescription || matchesCategory;
    });
  };

  return {
    notes,
    loading,
    addNote,
    updateNote,
    deleteNote,
    getNotesByCategory,
    checkDuplicateTitle,
    getDuplicateTitleGroups,
    searchNotes,
  };
};
