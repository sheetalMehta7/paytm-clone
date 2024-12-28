import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, onTransactionClick }) => {
  return (
    <div>
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onClick={onTransactionClick}
        />
      ))}
    </div>
  );
};

export default TransactionList;
