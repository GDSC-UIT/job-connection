import React from 'react';
import { useRouter } from 'next/router';
import profileApi from '@api/profile';
import MainLayout from '@layouts/MainLayout';
import { auth } from '@libs/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import UserProfilePage from './UserProfilePage';
import RecruiterProfilePage from './RecruiterProfilePage';
import { isBrowser } from '@libs/utils';

const ProfilePage = () => {
  const router = useRouter();
  const [user, authLoading] = useAuthState(auth);
  const { data, loading, error, enabled } = useQuery('profile', () => profileApi.get(), {
    enabled: !!user?.uid,
    retryDelay: 100,
    retry: 1,
  });
  if (authLoading || loading) return <>Loading ...</>;
  if (!user) {
    if (isBrowser) router.replace('/');
    return null;
  }
  return (
    <>
      {data?.data.type == 'user' && <UserProfilePage data={data?.data.profile} />}
      {data?.data.type == 'company' && <RecruiterProfilePage data={data?.data.profile} />}
    </>
  );
};

export default ProfilePage;

ProfilePage.layout = MainLayout;
ProfilePage.title = 'Your Profile';
