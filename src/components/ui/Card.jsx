import styled from 'styled-components';

const Card = styled.div`
  background-color: var(--bg-secondary);
  border-radius: var(--border-radius);
  padding: ${props => props.padding || '20px'};
  box-shadow: var(--shadow);
  width: 100%;
`;

export default Card;