import DeleteJobConfirmModal from '@elements/Modals/DeleteJobConfirmModal';
import JobModal from '@elements/Modals/JobModal';
import RecruiterModal from '@elements/Modals/RecruiterModal';
import useDisclosure from '@hooks/useDisclosure';
import React from 'react';

const JobRow = ({ job }) => {
  const editController = useDisclosure();
  const deleteController = useDisclosure();

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">{job.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{job.title}</td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
          Edit
        </button>
        <button className="ml-3 text-red-600 hover:text-red-700" onClick={deleteController.onOpen}>
          Delete
        </button>
      </td>
      {/* <RecruiterModal isOpen={editController.isOpen} onClose={editController.onClose} block={job} building_id={job.building_id} /> */}
      <JobModal isOpen={editController.isOpen} onClose={editController.onClose} recruiter_id={job.company_id} job={job} />
      {/* <DeleteJobConfirmModal isOpen={deleteController.isOpen} onClose={deleteController.onClose} block={job} /> */}
    </tr>
  );
};

export default JobRow;
