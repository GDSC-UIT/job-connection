import React from 'react';

const AdminPage = () => {
  return <div></div>;
};

export default AdminPage;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: '/admin/recruiter-request',
      permanent: false,
    },
  };
};
