import profileApi from '@api/profile';
import CVsRecruiterTable from '@elements/CvsRecuiterTable';
import MainLayout from '@layouts/MainLayout';
import { auth } from '@libs/firebase';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

const RecruiterManageCVPage = () => {
  const [user] = useAuthState(auth);
  const { data } = useQuery(['profile'], () => profileApi.get(), { enabled: !!user?.uid, retryDelay: 100, retry: 1 });

  return (
    <div className="mx-auto 2xl:container px-2 py-4 sm:px-6 lg:px-6">
      <CVsRecruiterTable recruiter_id={data?.data.profile.id} />
    </div>
  );
};

export default RecruiterManageCVPage;

RecruiterManageCVPage.layout = MainLayout;
RecruiterManageCVPage.title = 'CVs';
