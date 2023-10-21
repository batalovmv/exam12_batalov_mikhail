import React from "react";
import { Button, TextField, Grid, AppBar, Typography, Toolbar, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { registerUser } from "../../features/UserSlice";
import { useNavigate } from "react-router-dom";

export const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.users.user);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const resultAction = await dispatch(registerUser({ username, password }));

    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/establishments');
    }
  };


  return (
    <Grid container justifyContent="center">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Register
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" spacing={2}>
            <TextField id="username" label="Username" margin="normal" />
            <TextField id="password" label="Password" type="password" margin="normal" />
            <Button variant="contained" color="primary" type="submit">
              Register
            </Button>
          </Stack>
        </form>
      </Grid>
    </Grid>
  );
};
