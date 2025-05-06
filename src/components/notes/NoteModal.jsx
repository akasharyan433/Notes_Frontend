/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import MDEditor from '@uiw/react-md-editor';
import Button from '../ui/Button';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { createNote, updateNote } from '../../services/noteService';
import MarkdownGuide from './MarkdownGuide';
import MarkdownPreview from './MarkdownPreview';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 0 15px;
  
  @media (max-width: 480px) {
    align-items: flex-start;
    padding: 20px 10px;
  }
`;

const ModalContent = styled.div`
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  
  @media (max-width: 480px) {
    width: 100%;
    max-height: 85vh;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--bg-tertiary);
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PinButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.isPinned ? 'var(--accent)' : 'var(--text-secondary)'};
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: var(--accent);
  }
`;

const ModalTitle = styled.h3`
  font-size: 20px;
  color: var(--text-primary);
  
  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: var(--text-secondary);
  font-size: 20px;
  cursor: pointer;
  
  &:hover {
    color: var(--text-primary);
  }
`;

const ModalBody = styled.div`
  padding: 16px;
  flex: 1;
  
  @media (max-width: 480px) {
    padding: 12px;
  }
`;

const TitleInput = styled.input`
  width: 100%;
  margin-bottom: 16px;
  padding: 12px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--bg-tertiary);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 16px;
  
  &:focus {
    border-color: var(--accent);
    outline: none;
  }
  
  @media (max-width: 480px) {
    padding: 10px;
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const EditorContainer = styled.div`
  .w-md-editor {
    background-color: var(--bg-tertiary);
    color: var(--text-primary);
    box-shadow: none;
  }
  
  .w-md-editor-text {
    color: var(--text-primary);
  }
  
  .w-md-editor-toolbar {
    background-color: var(--bg-tertiary);
    border-bottom: 1px solid var(--bg-secondary);
    
    @media (max-width: 480px) {
      flex-wrap: wrap;
      justify-content: center;
    }
  }
  
  .w-md-editor-toolbar li button {
    color: var(--text-secondary);
    
    @media (max-width: 480px) {
      padding: 3px;
    }
  }
  
  .w-md-editor-toolbar li button:hover {
    color: var(--text-primary);
  }
  
  .w-md-editor-content {
    background-color: var(--bg-tertiary);
  }
`;

const ModalFooter = styled.div`
  padding: 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid var(--bg-tertiary);
  gap: 10px;
  
  @media (max-width: 480px) {
    padding: 12px;
    flex-direction: column;
  }
`;

const EditorFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid var(--bg-tertiary);
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
`;

const PreviewToggle = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? 'var(--accent)' : 'var(--text-secondary)'};
  cursor: pointer;
  padding: 5px;
  margin-right: 10px;
  font-size: 14px;
  
  &:hover {
    color: var(--accent);
  }
`;

const PreviewContainer = styled.div`
  background-color: var(--bg-tertiary);
  padding: 16px;
  border-radius: var(--border-radius);
  height: 300px;
  overflow-y: auto;
  
  @media (max-width: 480px) {
    padding: 12px;
    height: 250px;
  }
`;

const ActionButton = styled(Button)`
  @media (max-width: 480px) {
    width: 100%;
  }
`;

const NoteModal = ({ isOpen, closeModal, currentNote, refetchNotes }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [pinned, setPinned] = useState(false);
    const [loading, setLoading] = useState(false);
    const [previewMode, setPreviewMode] = useState(false);
    
    useEffect(() => {
      if (currentNote) {
        setTitle(currentNote.title || '');
        setContent(currentNote.content || '');
        setPinned(currentNote.pinned || false);
      } else {
        setTitle('');
        setContent('');
        setPinned(false);
      }
      setPreviewMode(false);
    }, [currentNote, isOpen]);
    
    const handleSubmit = async () => {
      if (!title.trim()) {
        toast.error('Title is required');
        return;
      }
      
      try {
        setLoading(true);
        
        if (currentNote) {
          await updateNote(currentNote.id, { title, content, pinned });
          toast.success('Note updated successfully');
        } else {
          await createNote({ title, content, pinned });
          toast.success('Note created successfully');
        }
        
        refetchNotes();
        closeModal();
      } catch (error) {
        toast.error('Failed to save note');
      } finally {
        setLoading(false);
      }
    };
    
    const togglePin = () => {
      setPinned(!pinned);
    };
    
    if (!isOpen) return null;
    
    return (
      <ModalOverlay onClick={closeModal}>
        <ModalContent onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <HeaderLeft>
              <PinButton isPinned={pinned} onClick={togglePin} title={pinned ? "Unpin note" : "Pin note"}>
                {pinned ? <FaStar /> : <FaRegStar />}
              </PinButton>
              <ModalTitle>{currentNote ? 'Edit Note' : 'New Note'}</ModalTitle>
            </HeaderLeft>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
          </ModalHeader>
          <ModalBody>
            <TitleInput 
              placeholder="Note Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            
            {previewMode ? (
              <PreviewContainer>
                <MarkdownPreview content={content} />
              </PreviewContainer>
            ) : (
              <EditorContainer>
                <MDEditor
                  value={content}
                  onChange={setContent}
                  height={300}
                  preview="edit"
                />
              </EditorContainer>
            )}
            
            <EditorFooter>
              <div>
                <PreviewToggle 
                  active={!previewMode}
                  onClick={() => setPreviewMode(false)}
                >
                  Edit
                </PreviewToggle>
                <PreviewToggle 
                  active={previewMode}
                  onClick={() => setPreviewMode(true)}
                >
                  Preview
                </PreviewToggle>
              </div>
              <MarkdownGuide />
            </EditorFooter>
          </ModalBody>
          <ModalFooter>
            <ActionButton 
              variant="secondary" 
              onClick={closeModal}
              disabled={loading}
            >
              Cancel
            </ActionButton>
            <ActionButton 
              variant="primary" 
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Note'}
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    );
  };
  
  export default NoteModal;