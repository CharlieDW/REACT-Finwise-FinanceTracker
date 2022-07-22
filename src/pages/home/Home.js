import React from 'react';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

import classes from './Home.module.css';

const Home = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection('transaction', ['uid', '==', user.uid], ['createdAt']);
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h3 className={classes.title}>List of transactions</h3>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={classes.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
};

export default Home;
