import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 120px;
  margin: 0;
  color: var(--accent);
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 16px;
  margin-bottom: 30px;
  max-width: 500px;
  color: var(--text-secondary);
`;

const NotFoundPage = () => {
  return (
    <NotFoundContainer>
      <Title>404</Title>
      <Subtitle>Page Not Found</Subtitle>
      <Message>
        The page you are looking for might have been removed, had its
        name changed, or is temporarily unavailable.
      </Message>
      <Link to="/">
        <Button variant="primary">Go Home</Button>
      </Link>
    </NotFoundContainer>
  );
};

export default NotFoundPage;