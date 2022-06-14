import React, { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import { PuffLoader } from 'react-spinners';

import classes from './Login.module.css';

const Login = () => {
  const { login, isPending, error } = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    login(email, password);

    // setEmail('');
    // setPassword('');
  };

  return (
    <form className={classes['login-form']} onSubmit={handleSubmit}>
      <h2>Log in</h2>
      <div>
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="johndoe@example.com"
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
      <button className="btn" type="submit" disabled={isPending}>
        {!isPending && <span>Log in</span>}
        {isPending && (
          <div className="btn-disabled">
            <PuffLoader className={classes.spinner} loading={isPending} color="#9c84ff" size={25} />
            <span>Loading...</span>
          </div>
        )}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default Login;
