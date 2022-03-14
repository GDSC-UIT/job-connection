import Button from '@elements/Button';
import Input from '@elements/Input';
import Textarea from '@elements/Textarea';
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const RecruiterModal = ({ isOpen, onClose, recruiter }) => {
  const { register, reset } = useForm();

  useEffect(() => {
    if (isOpen) reset(recruiter);
  }, [isOpen]);

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
                {'Recruiter'}
              </Dialog.Title>

              <div className="mt-2">
                <img src={recruiter.photo} alt="" className="h-20 w-20 object-cover rounded-full" />
              </div>
              <div className="mt-2">
                <Input label="Name" {...register('name', { required: true, minLength: 2 })} readOnly />
              </div>
              <div className="mt-2">
                <Input label="Email" {...register('email', { required: true, minLength: 2 })} readOnly />
              </div>
              <div className="mt-2">
                <Input label="Address" {...register('address', { required: true, minLength: 2 })} readOnly />
              </div>
              <div className="mt-2">
                <Input label="Working Time" {...register('working_time', { required: true, minLength: 2 })} readOnly />
              </div>
              <div className="mt-2">
                <Textarea label="Description" {...register('description')} readOnly rows={5} />
              </div>
              <div className="mt-4 flex justify-end ">
                <Button onClick={onClose}>OK</Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default RecruiterModal;
