import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Logout = () => {
  const { logout } = useAuth0();

  return (
    <Stack spacing={2} direction="row">
      <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Log Out
      </Button>
    </Stack>
  );
};

export default Logout;