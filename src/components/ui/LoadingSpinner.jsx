import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props => props.fullHeight ? '100vh' : '100%'};
  width: 100%;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  border-top: 4px solid var(--accent);
  animation: ${spin} 1s linear infinite;
`;

const LoadingSpinner = ({ fullHeight = true }) => {
  return (
    <SpinnerContainer fullHeight={fullHeight}>
      <Spinner />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;