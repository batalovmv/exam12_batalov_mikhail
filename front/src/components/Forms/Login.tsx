import React from "react";
import { Button, TextField, Grid, AppBar, Typography, Toolbar, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginUser } from "../../features/UserSlice";

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.users.user); 

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    dispatch(loginUser({ username, password }));
  };

  return (
    <Grid container justifyContent="center">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <TextField id="username" label="Username" margin="normal" />
            <TextField id="password" label="Password" type="password" margin="normal" />
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
