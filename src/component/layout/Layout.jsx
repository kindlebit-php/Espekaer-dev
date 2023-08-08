import React from 'react';

import { Outlet } from 'react-router-dom';

import Footer from '../dashboard/footer/Footer';
import Header from '../dashboard/header/Header';

const Layout = () => {
  return (
    <div>
      <Header/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Layout
