import React from 'react';

import { Outlet } from 'react-router-dom';

import DashboardHeader from '../dashboard/header/DashboardHeader';
import DashboardFooter from '../dashboard/footer/DashboardFooter';

const DashboardLayout = () => {
  return (
    <div className='dashboard-login'>
      <DashboardHeader/>
      <Outlet/>
      <DashboardFooter/>
    </div>
  )
}

export default DashboardLayout;
