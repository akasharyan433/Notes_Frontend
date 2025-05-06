import { useMemo } from 'react';
import styled from 'styled-components';
import NoteCard from './NoteCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import { FaStar } from 'react-icons/fa';

const NotesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h3`
  font-size: 16px;
  color: var(--text-secondary);
  margin-top: 20px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  
  svg {
    color: var(--accent);
    margin-right: 8px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 0;
  color: var(--text-secondary);
`;

const NotesList = ({ notes, loading, onEditNote, refetchNotes }) => {
  const { pinnedNotes, unpinnedNotes } = useMemo(() => {
    if (!notes) return { pinnedNotes: [], unpinnedNotes: [] };
    
    return {
      pinnedNotes: notes.filter(note => note.pinned),
      unpinnedNotes: notes.filter(note => !note.pinned)
    };
  }, [notes]);
  
  if (loading) {
    return <LoadingSpinner fullHeight={false} />;
  }
  
  if (!notes || notes.length === 0) {
    return (
      <EmptyState>
        <h3>No notes yet</h3>
        <p>Create a new note to get started</p>
      </EmptyState>
    );
  }
  
  return (
    <NotesContainer>
      {pinnedNotes.length > 0 && (
        <>
          <SectionTitle>
            <FaStar /> Pinned Notes
          </SectionTitle>
          {pinnedNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={onEditNote}
              refetchNotes={refetchNotes}
            />
          ))}
        </>
      )}
      
      {unpinnedNotes.length > 0 && (
        <>
          {pinnedNotes.length > 0 && (
            <SectionTitle>Other Notes</SectionTitle>
          )}
          {unpinnedNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note} 
              onEdit={onEditNote}
              refetchNotes={refetchNotes}
            />
          ))}
        </>
      )}
    </NotesContainer>
  );
};

export default NotesList;