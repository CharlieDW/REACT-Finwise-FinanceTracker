import React, { useState } from 'react';
import useSignup from '../../hooks/useSignup';
import { PuffLoader } from 'react-spinners';

import classes from './Signup.module.css';

const Signup = () => {
  const { isPending, error, signup } = useSignup();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, displayName);

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
          placeholder="JohnDoe"
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
        {!isPending && <span>Sign up</span>}
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

export default Signup;
