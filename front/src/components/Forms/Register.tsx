import React from "react";
import { Button, TextField, Grid, AppBar, Typography, Toolbar } from "@mui/material";

export const RegisterForm = () => {
  return (
    <Grid container justifyContent="center" direction="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Register
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item>
        <form>
          <TextField id="username" label="Username" margin="normal" />
          <TextField id="email" label="Email" type="email" margin="normal" />
          <TextField id="password" label="Password" type="password" margin="normal" />
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};