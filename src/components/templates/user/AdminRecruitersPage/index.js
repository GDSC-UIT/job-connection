import React from 'react';
import AdminLayout from '@layouts/AdminLayout';
import RecruitersAdminTable from '@elements/RecuitersAdminTable';

const AdminRecruitersPage = () => {
  return (
    <div>
      <RecruitersAdminTable />
    </div>
  );
};

export default AdminRecruitersPage;
AdminRecruitersPage.layout = AdminLayout;
