import styled from 'styled-components';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/ui/Card';

const ProfileContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 30px;
`;

const ProfileCard = styled(Card)`
  padding: 30px;
`;

const ProfileInfo = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 18px;
  color: var(--text-primary);
  margin-bottom: 20px;
`;

const ProfilePage = () => {
  const { currentUser } = useAuth();
  
  if (!currentUser) {
    return <div>Loading...</div>;
  }
  
  return (
    <ProfileContainer>
      <Title>Your Profile</Title>
      <ProfileCard>
        <ProfileInfo>
          <Label>Username</Label>
          <Value>{currentUser.name}</Value>
        </ProfileInfo>
        <ProfileInfo>
          <Label>Email</Label>
          <Value>{currentUser.email}</Value>
        </ProfileInfo>
        <ProfileInfo>
          <Label>Account Created</Label>
          <Value>
            {new Date(currentUser.created_at).toLocaleDateString()}
          </Value>
        </ProfileInfo>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;