import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
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
`;

export default Input;