import React, { useState } from 'react';

import classes from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    setEmail('');
    setPassword('');
  };

  return (
    <form className={classes['login-form']} onSubmit={handleSubmit}>
      <h2>Log in</h2>
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
        Log in
      </button>
    </form>
  );
};

export default Login;
