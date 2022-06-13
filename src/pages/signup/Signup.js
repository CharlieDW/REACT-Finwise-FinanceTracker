import React, { useState } from 'react';
import { projectAuth } from '../../firebase/config';

import classes from './Signup.module.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
    setDisplayName('');
  };

  return (
    <form className={classes['signup-form']} onSubmit={handleSubmit}>
      <h2>Sign up</h2>
      <div>
        <label htmlFor="displayName">Username</label>
        <input
          type="text"
          id="displayName"
          placeholder="CharlieDW"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="charlie@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button className="btn" type="submit">
        Sign up
      </button>
    </form>
  );
};

export default Signup;
