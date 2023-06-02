import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import theme from '../Theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">YourCannaBuddy!</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/stash">
              My Stash
            </Link>

            <Link className="navLink" to="/info">
              Info Page
            </Link>

            <Link className="navLink" to="/about">
              About
            </Link>
            <Link className="navLink" to="/user">
              My Profile
            </Link>
            <LogOutButton className="navLink" />

          </>
        )}

      </div>
    </div>
    </ThemeProvider>
  );
}

export default Nav;
