import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '@libs/firebase';
import MainLayout from '@layouts/MainLayout';
import profileApi from '@api/profile';
import ProfilePhoto from './ProfilePhoto';
import { isBrowser } from '@libs/utils';
import Button from '@elements/Button';
import { toast } from 'react-toastify';
import Degree from './Degree';

const UserProfilePage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { control, reset, register, handleSubmit, formState } = useForm();
  const [user, authLoading] = useAuthState(auth);

  const { data, loading, error, enabled } = useQuery('profile', () => profileApi.get(), {
    enabled: !!user?.uid,
    retryDelay: 100,
    retry: 1,
  });
  const mutation = useMutation(profileApi.update, {
    onSettled: () => {
      queryClient.invalidateQueries('profile');
    },
  });

  useEffect(() => {
    if (!data) return;
    reset(data.data.profile);
  }, [data?.data.profile]);

  useEffect(() => {
    console.log(formState.loading);
  }, [formState.loading]);

  if (authLoading || loading) return <>Loading ...</>;
  if (!user) {
    if (isBrowser) router.replace('/');
    return null;
  }
  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 pt-6">
      <div className="grid-container !mb-4">
        <div className="px-2">
          <ProfilePhoto control={control} user_id={data?.data.profile.id} />
          <div className="mt-6">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name"
              {...register('name')}
            />
          </div>
          <div className="mt-4">
            <textarea
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your Bio"
              {...register('bio')}
            ></textarea>
          </div>
          <div className="relative mt-4">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26.49,30H5.5A3.35,3.35,0,0,1,3,29a3.35,3.35,0,0,1-1-2.48V5.5A3.35,3.35,0,0,1,3,3,3.35,3.35,0,0,1,5.5,2h21A3.35,3.35,0,0,1,29,3,3.35,3.35,0,0,1,30,5.5v21A3.52,3.52,0,0,1,26.49,30Zm-9.08-4.81V16.8h2.83l.42-3.26H17.41V11.71a2.88,2.88,0,0,1,.09-1,1.09,1.09,0,0,1,.14-.33c.21-.38.76-.57,1.63-.57h1.5V6.94a22,22,0,0,0-2.5-.14,3.83,3.83,0,0,0-3.61,1.86,4.52,4.52,0,0,0-.63,2.4v2.48h-2.8V16.8H14v8.39Z" />
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              {...register('facebook_url')}
            />
          </div>
          <div className="relative mt-4">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M449.446,0c34.525,0 62.554,28.03 62.554,62.554l0,386.892c0,34.524 -28.03,62.554 -62.554,62.554l-386.892,0c-34.524,0 -62.554,-28.03 -62.554,-62.554l0,-386.892c0,-34.524 28.029,-62.554 62.554,-62.554l386.892,0Zm-288.985,423.278l0,-225.717l-75.04,0l0,225.717l75.04,0Zm270.539,0l0,-129.439c0,-69.333 -37.018,-101.586 -86.381,-101.586c-39.804,0 -57.634,21.891 -67.617,37.266l0,-31.958l-75.021,0c0.995,21.181 0,225.717 0,225.717l75.02,0l0,-126.056c0,-6.748 0.486,-13.492 2.474,-18.315c5.414,-13.475 17.767,-27.434 38.494,-27.434c27.135,0 38.007,20.707 38.007,51.037l0,120.768l75.024,0Zm-307.552,-334.556c-25.674,0 -42.448,16.879 -42.448,39.002c0,21.658 16.264,39.002 41.455,39.002l0.484,0c26.165,0 42.452,-17.344 42.452,-39.002c-0.485,-22.092 -16.241,-38.954 -41.943,-39.002Z" />
              </svg>
            </div>
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@flowbite.com"
              {...register('linkedin_url')}
            />
          </div>
        </div>
        <div className="flex-1 px-2">
          <div className="rounded-md border px-4 py-4">
            <div className="grid-container flex-wrap">
              <div className="grid-column-12">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('location')}
                />
              </div>
              <div className="grid-column-5">
                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Phone number
                </label>
                <input
                  type="number"
                  id="phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('phone')}
                />
              </div>
              <div className="grid-column-7">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('email')}
                />
              </div>
            </div>
          </div>
          <div className="rounded-md border px-4 py-4 mt-6">
            <div className="grid-container flex-wrap">
              <div className="grid-column-4">
                <label htmlFor="gpa" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  GPA
                </label>
                <input
                  type="number"
                  id="gpa"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('gpa', { valueAsNumber: true })}
                />
              </div>
              <div className="grid-column-4">
                <label htmlFor="number_of_years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Number of years
                </label>
                <input
                  type="number"
                  id="number_of_years"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register('number_of_years', { valueAsNumber: true })}
                />
              </div>
              <Degree control={control} user_id={data?.data.profile.id} />
            </div>
          </div>
          <div className="mt-6">
            <Button loading={formState.isSubmitting} onClick={handleSubmit(mutation.mutateAsync)}>
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;

UserProfilePage.layout = MainLayout;
