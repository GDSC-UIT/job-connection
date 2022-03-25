import React from 'react';
import MainLayout from '@layouts/MainLayout';
import { useForm } from 'react-hook-form';
import RecruiterPhoto from './RecruiterPhoto';
import Button from '@elements/Button';
import { useMutation } from 'react-query';
import recruiterApi from '@api/recruiter';
import { toast } from 'react-toastify';

const RecruiterRequestPage = () => {
  const { register, handleSubmit, formState, control } = useForm();

  const onSubmit = (data) => mutation.mutateAsync(data);

  const mutation = useMutation(recruiterApi.create, {
    onSuccess: (data) => toast.success(data?.data?.message || 'submit successful'),
  });

  return (
    <div className="mx-auto max-w-7xl px-2 pt-6 sm:px-6 lg:px-8">
      <div className="grid-container !mb-4 flex-wrap">
        <h1 className="grid-column-12 mb-4 text-3xl">RECRUITER</h1>
        <div className="px-2">
          <RecruiterPhoto control={control} />
        </div>
        <div className="px-2">
          <div className="grid-container flex-wrap">
            <div className="grid-column-6">
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Company Name
              </label>
              <input
                type="text"
                id="name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register('name', { required: true })}
              />
            </div>
            <div className="grid-column-6">
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Company Email
              </label>
              <input
                type="text"
                id="email"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register('email', { required: true })}
              />
            </div>
            <div className="grid-column-6">
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register('address', { required: true })}
              />
            </div>
            <div className="grid-column-6">
              <label htmlFor="workingtime" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Working Time
              </label>
              <input
                type="text"
                id="workingtime"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register('working_time', { required: true })}
              />
            </div>
            <div className="grid-column-12">
              <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300">
                Description
              </label>
              <textarea
                type="text"
                id="description"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                {...register('description')}
                rows="4"
              />
            </div>
          </div>
          <div className="px-2">
            <div className="flex flex-row-reverse">
              <Button onClick={handleSubmit(onSubmit)} loading={formState.isSubmitting}>
                Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruiterRequestPage;

RecruiterRequestPage.layout = MainLayout;
RecruiterRequestPage.title = 'New';
