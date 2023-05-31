import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

const StyledButton = styled(Button)`
  background-color: #f50057;
  color: #ffffff;
  &:hover {
    background-color: #e91e63;
  }
`;

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <StyledButton variant="contained" onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </StyledButton>
  );
};

export default Logout;