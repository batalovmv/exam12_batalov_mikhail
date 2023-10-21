
import { Button, TextField, Grid, AppBar, Typography, Toolbar } from "@mui/material";

export const LoginForm = () => {
  return (
    <Grid container justifyContent="center" direction="column">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Login
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid item>
        <form>
          <TextField id="username" label="Username" margin="normal" />
          <TextField id="password" label="Password" type="password" margin="normal" />
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};