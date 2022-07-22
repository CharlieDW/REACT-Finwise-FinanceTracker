import React, { useState, useEffect } from 'react';
import useFirestore from '../../hooks/useFirestore';

import classes from './Home.module.css';

const TransactionForm = ({ uid }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const { addDocument, response } = useFirestore('transaction');

  const handleSubmit = (e) => {
    e.preventDefault();

    // add document to Firestore
    addDocument({ name, amount, uid });
  };

  // set form fields to blank
  useEffect(() => {
    if (response.success) {
      setName('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3 className={classes.title}>Add a transaction</h3>
      <form className={classes['transaction-form']} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="transactionName">Transaction name</label>
          <input
            id="transactionName"
            type="text"
            placeholder="Lidl"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount (Kč)</label>
          <input
            id="amount"
            type="number"
            placeholder="175"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button className="btn-inverse" type="submit">
          Add transaction
        </button>
      </form>
    </>
  );
};

export default TransactionForm;
