import React from 'react';
import AdminLayout from '@layouts/AdminLayout';
import useDisclosure from '@hooks/useDisclosure';
import Button from '@elements/Button';
import SkillModal from '@elements/Modals/SkillModal';
import { useQuery } from 'react-query';
import skillApi from '@api/skill';
import SkillsAdminTable from '@elements/SkillsAdminTable';

const AdminSkillsPage = () => {
  const addController = useDisclosure();
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={addController.onOpen}>Add Skill</Button>
      </div>
      <SkillsAdminTable />
      <SkillModal isOpen={addController.isOpen} onClose={addController.onClose} />
    </div>
  );
};

export default AdminSkillsPage;

AdminSkillsPage.layout = AdminLayout;
AdminSkillsPage.title = 'Skills';
