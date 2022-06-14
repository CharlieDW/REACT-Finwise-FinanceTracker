import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

import classes from './Navbar.module.css';

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.title}>
          <i className="fa fa-solid fa-piggy-bank fa-lg"></i>
          <span>finwise</span>
        </li>
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
        <li>
          <button className="btn" type="button" onClick={logout}>
            Log out
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
