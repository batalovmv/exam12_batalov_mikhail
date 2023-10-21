
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import { logoutUser } from '../features/UserSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';

const NavBar = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(state => state.users);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/establishments');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Home</Button>
        {userState.user ? (
          <>
            <Typography variant="h6" color="inherit">
              {userState.user.username}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
            <Button color="inherit" component={Link} to="/new-establishment">New Establishment</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Register</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};


export default NavBar;