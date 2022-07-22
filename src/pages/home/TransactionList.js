import React from 'react';
import useFirestore from '../../hooks/useFirestore';

import classes from './Home.module.css';

const TransactionList = ({ transactions }) => {
  const { deleteDocument } = useFirestore('transaction');

  return (
    <ul className={classes['transaction-list']}>
      {transactions.map((transaction) => {
        return (
          <li key={transaction.id}>
            <p className={classes.name}>{transaction.name}</p>
            <p className={classes.amount}>{transaction.amount} Kč</p>
            <button onClick={() => deleteDocument(transaction.id)}>X</button>
          </li>
        );
      })}
    </ul>
  );
};

export default TransactionList;
