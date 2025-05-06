/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { FaPlus } from 'react-icons/fa';
import { getNotes } from '../services/noteService';
import NotesList from '../components/notes/NotesList';
import NoteModal from '../components/notes/NoteModal';
import Button from '../components/ui/Button';
import SearchBar from '../components/notes/SearchBar';

const NotesContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 15px;
  
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const NotesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  
  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
`;

const NewNoteButton = styled(Button)`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await getNotes();
      const sortedNotes = response.data.sort((a, b) => {
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        return new Date(b.updated_at) - new Date(a.updated_at);
      });
      setNotes(sortedNotes);
      setFilteredNotes(sortedNotes);
    } catch (error) {
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchNotes();
  }, []);
  
  const handleOpenModal = (note = null) => {
    setCurrentNote(note);
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentNote(null);
  };
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredNotes(notes);
      return;
    }
    
    const filtered = notes.filter(note => 
      note.title.toLowerCase().includes(term.toLowerCase()) ||
      note.content.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredNotes(filtered);
  };
  
  return (
    <NotesContainer>
      <NotesHeader>
        <Title>Notes</Title>
        <NewNoteButton
          variant="primary"
          onClick={() => handleOpenModal()}
        >
          <FaPlus /> New Note
        </NewNoteButton>
      </NotesHeader>
      
      <TopSection>
        <SearchBar onSearch={handleSearch} />
      </TopSection>
      
      <NotesList 
        notes={filteredNotes} 
        loading={loading} 
        onEditNote={handleOpenModal}
        refetchNotes={fetchNotes}
      />
      
      <NoteModal 
        isOpen={modalOpen}
        closeModal={handleCloseModal}
        currentNote={currentNote}
        refetchNotes={fetchNotes}
      />
    </NotesContainer>
  );
};

export default NotesPage;