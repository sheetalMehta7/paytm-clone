import React from 'react';
import { useParams } from 'react-router-dom';

const TransactionHistory = () => {
  const { id } = useParams();

  const transactions = [
    { id: 1, date: 'Dec 28, 2023', amount: 500, type: 'Debit' },
    { id: 2, date: 'Dec 27, 2023', amount: 150, type: 'Credit' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Transaction History</h1>
      <div className="space-y-4">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="flex justify-between p-4 bg-gray-800 rounded-lg"
          >
            <div>
              <p className="text-gray-400">{txn.date}</p>
            </div>
            <div className={`font-bold ${txn.type === 'Credit' ? 'text-green-400' : 'text-red-400'}`}>
              {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
