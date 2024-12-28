import React from 'react';

const TransactionItem = ({ transaction, onClick }) => {
  return (
    <div
      className="flex items-center p-4 bg-gray-800 rounded-lg mb-2 cursor-pointer hover:bg-gray-700"
      onClick={() => onClick(transaction.id)}
    >
      <img
        src={transaction.userImage}
        alt="User"
        className="h-10 w-10 rounded-full mr-4"
      />
      <div>
        <h4 className="text-white font-semibold">{transaction.userName}</h4>
        <p className="text-gray-400 text-sm">{transaction.date}</p>
      </div>
      <div className="ml-auto text-green-400 font-semibold">
        ₹{transaction.amount}
      </div>
    </div>
  );
};

export default TransactionItem;
