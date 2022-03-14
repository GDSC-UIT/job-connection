import React from 'react';
import AdminNavbar from './AdminNavbar';

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <div className="mx-auto 2xl:container px-2 py-4 sm:px-6 lg:px-6">{children}</div>
    </>
  );
};

export default AdminLayout;
