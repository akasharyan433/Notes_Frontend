/* eslint-disable no-unused-vars */
import { useState } from 'react';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { FaEllipsisV, FaStar, FaRegStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteNote, updateNote } from '../../services/noteService';
import MarkdownPreview from './MarkdownPreview';

const Card = styled.div`
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: 16px;
  margin-bottom: 16px;
  position: relative;
  border-left: ${props => props.isPinned ? '4px solid var(--accent)' : 'none'};
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  font-size: 18px;
  color: var(--text-primary);
  padding-right: 30px; 
  flex-grow: 1;
  word-break: break-word;
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const PinButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.isPinned ? 'var(--accent)' : 'var(--text-secondary)'};
  cursor: pointer;
  padding: 5px;
  margin-right: 8px;
  
  &:hover {
    color: var(--accent);
  }
`;

const TimeStamp = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 10px;
`;

const Content = styled.div`
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
  overflow: hidden;
  max-height: 4.5em;
  
  /* Markdown styles */
  p {
    margin-bottom: 0.5em;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }
  
  a {
    color: var(--accent);
    text-decoration: underline;
  }
  
  code {
    background-color: var(--bg-tertiary);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: monospace;
    word-break: break-word;
    white-space: pre-wrap;
  }
  
  blockquote {
    border-left: 3px solid var(--text-secondary);
    padding-left: 1em;
    margin-left: 0;
    opacity: 0.8;
  }
  
  ul, ol {
    padding-left: 1.5em;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }
`;

const MenuButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const MenuDropdown = styled.div`
  position: absolute;
  top: 40px;
  right: 12px;
  background-color: var(--bg-tertiary);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  z-index: 10;
  width: 120px;
  overflow: hidden;
  
  @media (max-width: 480px) {
    right: 5px;
    width: 110px;
  }
`;

const MenuItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 15px;
  background: transparent;
  border: none;
  color: ${props => props.danger ? 'var(--danger)' : 'var(--text-primary)'};
  font-size: 14px;
  cursor: pointer;
  
  &:hover {
    background-color: var(--bg-secondary);
  }
  
  @media (max-width: 480px) {
    padding: 8px 12px;
    font-size: 13px;
  }
`;

const ContentWrapper = styled.div`
  max-height: 4.5em;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1.5em;
    background: linear-gradient(transparent, var(--bg-secondary));
    pointer-events: none;
  }
`;

const NoteCard = ({ note, onEdit, refetchNotes }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    
    const handleEdit = () => {
      onEdit(note);
      setMenuOpen(false);
    };
    
    const handleDelete = async () => {
      try {
        await deleteNote(note.id);
        toast.success('Note deleted successfully');
        refetchNotes();
      } catch (error) {
        toast.error('Failed to delete note');
      }
      setMenuOpen(false);
    };
    
    const togglePin = async () => {
      try {
        await updateNote(note.id, { 
          title: note.title,
          content: note.content,
          pinned: !note.pinned 
        });
        toast.success(note.pinned ? 'Note unpinned' : 'Note pinned');
        refetchNotes();
      } catch (error) {
        toast.error('Failed to update note');
      }
    };
    
    const timeAgo = formatDistanceToNow(new Date(note.updated_at), { addSuffix: true });
    
    return (
      <Card isPinned={note.pinned}>
        <TitleContainer>
          <PinButton isPinned={note.pinned} onClick={togglePin}>
            {note.pinned ? <FaStar /> : <FaRegStar />}
          </PinButton>
          <Title>{note.title || 'Untitled Note'}</Title>
        </TitleContainer>
        <TimeStamp>Today | {timeAgo}</TimeStamp>
        <ContentWrapper>
          <MarkdownPreview content={note.content} />
        </ContentWrapper>
        
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaEllipsisV />
        </MenuButton>
        
        {menuOpen && (
          <MenuDropdown>
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={togglePin}>
              {note.pinned ? 'Unpin' : 'Pin'} Note
            </MenuItem>
            <MenuItem danger onClick={handleDelete}>Delete</MenuItem>
          </MenuDropdown>
        )}
      </Card>
    );
  };
  
  export default NoteCard;