import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <ul>
        <li className={classes.title}>
          <i class="fa fa-solid fa-piggy-bank fa-lg"></i>
          <span>finwise</span>
        </li>
        <li>
          <NavLink to="/login">Log in</NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign up</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
