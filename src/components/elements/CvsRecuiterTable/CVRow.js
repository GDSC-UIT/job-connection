import CVModal from '@elements/Modals/CVModal';
import DeleteJobConfirmModal from '@elements/Modals/DeleteJobConfirmModal';
import JobModal from '@elements/Modals/JobModal';
import RecruiterModal from '@elements/Modals/RecruiterModal';
import useDisclosure from '@hooks/useDisclosure';
import React from 'react';

const CVRow = ({ cv }) => {
  const editController = useDisclosure();
  const deleteController = useDisclosure();

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">{cv.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{cv.job.title}</td>
      <td className="whitespace-nowrap px-6 py-4">{cv.user.name}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <a className="text-indigo-600 hover:text-indigo-900 hover:underline cursor-pointer" href={cv.cv} target="_blank" rel="noreferrer">
          File
        </a>
      </td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
          Detail
        </button>
        {/* <button className="ml-3 text-red-600 hover:text-red-700" onClick={deleteController.onOpen}>
          Delete
        </button> */}
      </td>
      {/* <RecruiterModal isOpen={editController.isOpen} onClose={editController.onClose} block={job} building_id={job.building_id} /> */}
      <CVModal isOpen={editController.isOpen} onClose={editController.onClose} recruiter_id={cv.company_id} cv={cv} />
      {/* <DeleteJobConfirmModal isOpen={deleteController.isOpen} onClose={deleteController.onClose} block={job} /> */}
    </tr>
  );
};

export default CVRow;
