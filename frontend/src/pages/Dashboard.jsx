import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
import TransactionList from '../components/TransactionList';

const Dashboard = () => {
  const navigate = useNavigate();

  const transactions = [
    {
      id: 1,
      userImage: '/user1.jpg',
      userName: 'John Doe',
      date: 'Dec 28, 2023',
      amount: 500,
    },
    {
      id: 2,
      userImage: '/user2.jpg',
      userName: 'Jane Smith',
      date: 'Dec 27, 2023',
      amount: 150,
    },
  ];

  const handleProfileClick = () => {
    navigate('/settings');
  };

  const handleTransactionClick = (id) => {
    navigate(`/transaction-history/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <Banner
        image="/banner-animation.gif"
        onProfileClick={handleProfileClick}
      />
      <div className="my-6 p-4 bg-gray-800 rounded-lg">
        <h3 className="text-lg font-semibold">Current Balance</h3>
        <p className="text-2xl font-bold text-green-400">₹10,000</p>
      </div>
      <TransactionList
        transactions={transactions}
        onTransactionClick={handleTransactionClick}
      />
    </div>
  );
};

export default Dashboard;
