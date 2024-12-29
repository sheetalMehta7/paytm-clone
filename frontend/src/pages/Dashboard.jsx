// pages/Dashboard.jsx
import React from 'react';
import Banner from '../components/Banner';
import RightSidebar from '../layout/RightSidebar';
import PeopleSection from '../components/PeopleSection';
import SearchBox from '../components/SearchBox';

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="flex-1 p-6">
      <SearchBox/>
        <Banner />
        <PeopleSection/>
      </div>
      <RightSidebar />
    </div>
  );
};

export default Dashboard;
