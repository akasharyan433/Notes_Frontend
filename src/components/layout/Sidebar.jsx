import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../hooks/useAuth';
import { FaHome, FaStickyNote, FaUser, FaSignOutAlt, FaTimes } from 'react-icons/fa';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import ThemeToggle from '../ui/ThemeToggle';

const SidebarContainer = styled.div`
  width: 200px;
  height: 100%;
  background-color: var(--bg-primary);
  border-right: 1px solid var(--bg-tertiary);
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px 0;
  z-index: 99;
  transition: transform 0.3s ease;
  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    box-shadow: ${props => props.isOpen ? '0 0 10px rgba(0, 0, 0, 0.1)' : 'none'};
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--bg-tertiary);
  
  svg {
    color: var(--accent);
    font-size: 24px;
    margin-right: 10px;
  }
  
  span {
    font-weight: 700;
    font-size: 18px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const NavItem = styled(NavLink)`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  color: var(--text-primary);
  margin: 2px 0;
  
  svg {
    margin-right: 10px;
    font-size: 18px;
  }
  
  &.active {
    background-color: var(--bg-tertiary);
    color: var(--accent);
  }
  
  &:hover:not(.active) {
    background-color: var(--bg-secondary);
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  background: transparent;
  border: none;
  color: var(--danger);
  cursor: pointer;
  margin-top: auto;
  text-align: left;
  width: 100%;
  
  svg {
    margin-right: 10px;
    font-size: 18px;
  }
  
  &:hover {
    background-color: var(--bg-secondary);
  }
`;

const ThemeToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  margin-top: 10px;
  border-top: 1px solid var(--bg-tertiary);
`;

const CloseButton = styled.button`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 20px;
  
  &:hover {
    color: var(--text-primary);
  }
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const Sidebar = ({ isMobileView, isOpen, closeSidebar }) => {
  const { logout } = useAuth();
  
  return (
    <SidebarContainer isOpen={isOpen}>
      {isMobileView && (
        <CloseButton onClick={closeSidebar}>
          <FaTimes />
        </CloseButton>
      )}
      
      <Logo>
        <BsJournalBookmarkFill />
        <span>MyNote</span>
      </Logo>
      <NavMenu>
        <NavItem to="/home" onClick={isMobileView ? closeSidebar : undefined}>
          <FaHome /> Home
        </NavItem>
        <NavItem to="/notes" onClick={isMobileView ? closeSidebar : undefined}>
          <FaStickyNote /> Notes
        </NavItem>
        <NavItem to="/profile" onClick={isMobileView ? closeSidebar : undefined}>
          <FaUser /> Profile
        </NavItem>
      </NavMenu>
      <ThemeToggleContainer>
        <ThemeToggle />
      </ThemeToggleContainer>
      <LogoutButton onClick={logout}>
        <FaSignOutAlt /> Logout
      </LogoutButton>
    </SidebarContainer>
  );
};

export default Sidebar;