import styled from 'styled-components';

const Button = styled.button`
  background-color: ${props => props.variant === 'primary' ? 'var(--accent)' : 'transparent'};
  color: ${props => props.variant === 'primary' ? '#000' : 'var(--text-primary)'};
  padding: ${props => props.size === 'lg' ? '12px 24px' : '10px 16px'};
  font-size: ${props => props.size === 'lg' ? '16px' : '14px'};
  font-weight: 500;
  border-radius: var(--border-radius);
  border: ${props => props.variant === 'outline' ? '1px solid var(--accent)' : 'none'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  
  &:hover:not(:disabled) {
    background-color: ${props => 
      props.variant === 'primary' 
      ? 'var(--accent)' 
      : props.variant === 'outline' 
        ? 'rgba(255, 215, 0, 0.1)' 
        : 'var(--bg-tertiary)'};
  }
`;

export default Button;