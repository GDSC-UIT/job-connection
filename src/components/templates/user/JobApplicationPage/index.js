import React from 'react';
import { useRouter } from 'next/router';
import MainLayout from '@layouts/MainLayout';
import { useQuery } from 'react-query';
import jobApi from '@api/job';
import { useForm } from 'react-hook-form';
import CV from './CV';
import Button from '@elements/Button';
import applyRequestApi from '@api/apply-request';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@libs/firebase';
import { toast } from 'react-toastify';

const JobApplicationPage = () => {
  const router = useRouter();
  const { control, register, handleSubmit, formState } = useForm();
  const [user, authLoading] = useAuthState(auth);
  console.log('user', user);
  const { data, isLoading } = useQuery(['jobs', router.query.job_id], () => jobApi.getById(router.query.job_id), {
    enabled: !!router.query.job_id,
  });

  const onSubmit = async (data1) => {
    try {
      const res = await applyRequestApi.create({
        user_id: user?.uid,
        company_id: data?.data.data.company_id,
        job_id: Number(router.query.job_id),
        ...data1,
      });
      toast.success('submit successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-2 pt-6 sm:px-6 lg:px-8 mb-6">
      <h1 className="text-3xl font-semibold">{data?.data.data.title}</h1>
      <CV control={control} user_id={user?.uid} />
      <div className="flex mt-2">
        <label className="block w-32 mb-2 font-medium text-gray-900 dark:text-gray-300">Description</label>
        <textarea
          name=""
          id=""
          rows="10"
          className="flex-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Details and specific examples will make your application stronger"
          {...register('note', { required: true })}
        ></textarea>
      </div>
      <div className="flex flex-row-reverse">
        <Button className="mt-2" loading={formState.isSubmitting} onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default JobApplicationPage;

JobApplicationPage.layout = MainLayout;
JobApplicationPage.title = 'Application';
