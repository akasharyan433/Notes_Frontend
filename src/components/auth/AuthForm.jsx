import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Card from '../ui/Card';
import Divider from '../ui/Divider';
import { useAuth } from '../../hooks/useAuth';
import LoadingSpinner from '../ui/LoadingSpinner';

const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const AuthCard = styled(Card)`
  max-width: 400px;
  width: 100%;
`;

const PageTitle = styled.h1`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 18px;
  color: var(--text-secondary);
`;

const FormTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;
`;

const BottomText = styled.p`
  text-align: center;
  color: var(--text-secondary);
  font-size: 14px;
  margin-top: 8px;
  
  a {
    color: var(--accent);
    font-weight: 500;
  }
`;

const AuthForm = ({ isLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const { login, register, loading } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isLogin) {
        await login({
          email: formData.email,
          password: formData.password
        });
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
      }
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <AuthContainer>
      <PageTitle>{isLogin ? 'Login' : 'Signup'}</PageTitle>
      <AuthCard>
        <FormTitle>
          {isLogin ? 'Login into your account' : 'Sign up'}
        </FormTitle>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <FormGroup>
              <Input
                type="text"
                name="name"
                placeholder="Username"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
          )}
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </FormGroup>
          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            size="lg"
          >
            {isLogin ? 'Log in' : 'Create Account'}
          </Button>
        </form>
        <Divider text="OR" />
        <BottomText>
          {isLogin 
            ? "Don't have an account? " 
            : "Already have an account? "}
          <Link to={isLogin ? '/register' : '/login'}>
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </BottomText>
      </AuthCard>
    </AuthContainer>
  );
};

export default AuthForm;