import { useState } from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
  
  @media (max-width: 480px) {
    max-width: 100%;
    margin-bottom: 10px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 16px 10px 40px;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--bg-tertiary);
  border-radius: var(--border-radius);
  color: var(--text-primary);
  font-size: 14px;
  
  &:focus {
    border-color: var(--accent);
    outline: none;
  }
  
  &::placeholder {
    color: var(--text-secondary);
  }
  
  @media (max-width: 480px) {
    padding: 8px 16px 8px 36px;
    font-size: 13px;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  
  @media (max-width: 480px) {
    left: 10px;
    font-size: 14px;
  }
`;

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };
  
  return (
    <SearchContainer>
      <SearchIcon>
        <FaSearch />
      </SearchIcon>
      <SearchInput
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </SearchContainer>
  );
};

export default SearchBar;