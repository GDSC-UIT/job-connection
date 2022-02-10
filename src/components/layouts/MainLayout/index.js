import React from 'react';
import Footer from './Footer';
import Navbar from './Header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default MainLayout;
