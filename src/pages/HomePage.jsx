import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const WelcomeMessage = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  line-height: 1.6;
`;

const HomePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/notes');
  }, [navigate]);
  
  return (
    <HomeContainer>
      <Title>Welcome, {currentUser?.name || 'User'}!</Title>
      <WelcomeMessage>
        This is your personal notes dashboard. You can create, edit, and manage your notes here.
      </WelcomeMessage>
    </HomeContainer>
  );
};

export default HomePage;