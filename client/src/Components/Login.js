import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Stack spacing={2} direction="row">
      <Button onClick={() => loginWithRedirect()}>Log In</Button>
    </Stack>
  );
};

export default Login;