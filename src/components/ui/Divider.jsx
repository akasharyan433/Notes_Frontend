import styled from 'styled-components';

const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const Line = styled.div`
  flex: 1;
  height: 1px;
  background-color: var(--text-secondary);
  opacity: 0.3;
`;

const Text = styled.span`
  padding: 0 15px;
  color: var(--text-secondary);
  font-size: 12px;
`;

const Divider = ({ text }) => {
  return (
    <DividerContainer>
      <Line />
      {text && <Text>{text}</Text>}
      {text && <Line />}
    </DividerContainer>
  );
};

export default Divider;