import profileApi from '@api/profile';
import Button from '@elements/Button';
import JobsRecruiterTable from '@elements/JobsRecruiterTable';
import JobModal from '@elements/Modals/JobModal';
import useDisclosure from '@hooks/useDisclosure';
import MainLayout from '@layouts/MainLayout';
import { auth } from '@libs/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

const RecruiterManageJobsPage = () => {
  const [user, loading] = useAuthState(auth);
  const { data, error } = useQuery(['profile'], () => profileApi.get(), { enabled: !!user?.uid, retryDelay: 100, retry: 1 });
  const addController = useDisclosure();
  return (
    <div className="mx-auto 2xl:container px-2 py-4 sm:px-6 lg:px-6">
      <div className="flex justify-end">
        <Button onClick={addController.onOpen}>Add Job</Button>
      </div>
      <JobsRecruiterTable recruiter_id={data?.data.profile.id} />
      <JobModal isOpen={addController.isOpen} onClose={addController.onClose} recruiter_id={data?.data.profile.id} />
    </div>
  );
};

export default RecruiterManageJobsPage;

RecruiterManageJobsPage.layout = MainLayout;
