import React from 'react';
import SkillModal from '@elements/Modals/SkillModal';
import useDisclosure from '@hooks/useDisclosure';
import DeleteSkillConfirmModal from '@elements/Modals/DeleteSkillConfirmModal';
import RecruiterModal from '@elements/Modals/RecruiterModal';
import clsx from 'clsx';
import ApproveRecuiterModal from '@elements/Modals/ApproveRecruiterModal';

const RecruiterRow = ({ recruiter }) => {
  const editController = useDisclosure();
  const approveController = useDisclosure();

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">{recruiter.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{recruiter.name}</td>
      <td className="whitespace-nowrap px-6 py-4">{recruiter.email}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <span
          className={clsx(
            { 'bg-gray-100 text-gray-800': !recruiter.approved, 'bg-green-100 text-green-800': recruiter.approved },
            'text-sm font-medium mr-2 px-2.5 py-0.5 rounded'
          )}
        >
          {recruiter.approved ? 'approved' : 'not approved'}
        </span>
        {recruiter.approved}
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
          Info
        </button>
        {!recruiter.approved && (
          <button className="ml-3 text-green-600 hover:text-green-700" onClick={approveController.onOpen}>
            Aprrove
          </button>
        )}
      </td>
      <RecruiterModal isOpen={editController.isOpen} onClose={editController.onClose} recruiter={recruiter} />
      <ApproveRecuiterModal isOpen={approveController.isOpen} onClose={approveController.onClose} recruiter={recruiter} />
    </tr>
  );
};

export default RecruiterRow;
