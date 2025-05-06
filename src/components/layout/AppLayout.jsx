import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { FaBars } from 'react-icons/fa';

const LayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  position: relative;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  margin-left: ${props => props.isMobileView ? '0' : '200px'};
  transition: margin-left 0.3s ease;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 15px;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  z-index: 100;
  background: var(--bg-tertiary);
  border: none;
  color: var(--text-primary);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    display: flex;
  }
`;

const Overlay = styled.div`
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 90;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
  }
`;

const AppLayout = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileView = window.innerWidth <= 768;
      setIsMobileView(mobileView);
      if (!mobileView) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <Sidebar isMobileView={isMobileView} isOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
      <Overlay isOpen={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
      
      <MobileMenuToggle onClick={toggleSidebar}>
        <FaBars />
      </MobileMenuToggle>
      
      <MainContent isMobileView={isMobileView}>
        <Outlet />
      </MainContent>
    </LayoutContainer>
  );
};

export default AppLayout;