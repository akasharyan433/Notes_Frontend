import styled from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../hooks/useTheme';

const ToggleButton = styled.button`
  background-color: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  
  &:hover {
    background-color: var(--bg-tertiary);
  }
`;

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <ToggleButton onClick={toggleTheme} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}>
      {darkMode ? <FaSun /> : <FaMoon />}
    </ToggleButton>
  );
};

export default ThemeToggle;