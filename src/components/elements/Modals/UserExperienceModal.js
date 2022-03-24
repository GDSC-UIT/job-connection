import experienceApi from '@api/experiences';
import recruiterApi from '@api/recruiter';
import skillApi from '@api/skill';
import Button from '@elements/Button';
import Input from '@elements/Input';
import SkillMultiSelect from '@elements/SkillMultiSelect';
import Textarea from '@elements/Textarea';
import { Dialog, Transition } from '@headlessui/react';
import { auth } from '@libs/firebase';
import React, { Fragment, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';
import dateFormat from 'dateformat';

const UserExperienceModal = ({ isOpen, onClose, experience }) => {
  const queryClient = useQueryClient();
  const [user] = useAuthState(auth);
  const { register, formState, handleSubmit, reset, control } = useForm();
  const { data: companies } = useQuery(['recruiters'], () => recruiterApi.get({ size: 1000 }));
  const addMutation = useMutation(experienceApi.create, {
    onSuccess: (data) => {
      toast.success(data.data.message || 'add experience successful');
      onClose();
    },
    onSettled: () => {
      queryClient.invalidateQueries('experiences');
    },
  });
  const updateMutation = useMutation((data) => experienceApi.update(experience?.ID, data), {
    onSuccess: (data) => {
      toast.success(data.data.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('experiences');
    },
  });
  console.log(user?.uid);
  useEffect(() => {
    let dataToReset = undefined;
    if (experience)
      dataToReset = {
        ...experience,
        from: dateFormat(experience.from, 'yyyy-mm-dd'),
        to: experience.to ? dateFormat(experience.to, 'yyyy-mm-dd') : '',
      };
    if (isOpen) reset(dataToReset);
    console.log(experience);
  }, [isOpen]);

  const onSubmit = (data) => {
    console.log(data);
    data.from = dateFormat(data.from, 'isoUtcDateTime');
    if (data.to) data.to = dateFormat(data.to, 'isoUtcDateTime');
    if (experience) return updateMutation.mutateAsync({ ...data, user_id: user?.uid });
    return addMutation.mutateAsync({ ...data, user_id: user?.uid });
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
            <div className="my-8 inline-block w-full max-w-md transform  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {'Add Experience'}
              </Dialog.Title>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-2">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                    Company
                  </label>
                  <Controller
                    name="company_id"
                    control={control}
                    rules={{ required: true }}
                    render={({ field, fieldState }) => (
                      <ReactSelect
                        options={companies?.data.items || []}
                        getOptionLabel={(x) => x.name}
                        getOptionValue={(x) => x.id}
                        value={companies?.data.items.find((x) => x.id == field.value) || null}
                        onChange={(data) => {
                          field.onChange(data.id);
                        }}
                      />
                    )}
                  />
                </div>
                <div className="mt-2">
                  <Input label="From" {...register('from', { required: true })} type="date" />
                </div>
                <div className="mt-2">
                  <Input label="To" {...register('to')} type="date" />
                </div>
                <div className="mt-2">
                  <Input label="Job Title" {...register('job_title', { required: true, minLength: 2 })} />
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

export default UserExperienceModal;
