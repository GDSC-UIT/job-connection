import jobApi from '@api/job';
import recruiterApi from '@api/recruiter';
import Button from '@elements/Button';
import Input from '@elements/Input';
import SkillMultiSelect from '@elements/SkillMultiSelect';
import Textarea from '@elements/Textarea';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const JobModal = ({ isOpen, onClose, job, recruiter_id }) => {
  const queryClient = useQueryClient();
  const { register, formState, handleSubmit, reset, control } = useForm();

  const { data } = useQuery(['recruiters', recruiter_id], () => recruiterApi.getById(recruiter_id));
  const addMutation = useMutation(jobApi.create, {
    onSuccess: (data) => {
      toast.success(data.data.message || 'success');
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries('jobs');
    },
  });
  const updateMutation = useMutation((data) => jobApi.update(job?.id, data), {
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('jobs');
    },
  });

  useEffect(() => {
    if (isOpen) reset(job);
  }, [isOpen]);

  const onSubmit = (data) => {
    if (job) return updateMutation.mutateAsync(data);
    return addMutation.mutateAsync({ ...data, company_id: recruiter_id });
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center ">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {job ? 'Edit Job' : 'Add Job'}
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">
                  <Input label="Recruiter" readOnly value={data?.data.data.name || ''} />
                </div>
                <div className="mt-2">
                  <Input label="Title" {...register('title', { required: true, minLength: 2 })} />
                </div>
                <div className="mt-2">
                  <Input label="Address" {...register('address', { required: true, minLength: 2 })} />
                </div>
                <div className="mt-2">
                  <SkillMultiSelect control={control} name="skill_ids" label="Skills" />
                </div>
                <div className="mt-2">
                  <Textarea label="Description" {...register('description')} rows={5} />
                </div>
                <div className="mt-4 flex justify-end ">
                  <Button outline onClick={onClose}>
                    Cancel
                  </Button>
                  <Button className="ml-2" type="submit" loading={formState.isSubmitting}>
                    Submit
                  </Button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JobModal;
