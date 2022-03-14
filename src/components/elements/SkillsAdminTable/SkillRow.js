import React from 'react';
import SkillModal from '@elements/Modals/SkillModal';
import useDisclosure from '@hooks/useDisclosure';
import DeleteSkillConfirmModal from '@elements/Modals/DeleteSkillConfirmModal';

const SkillRow = ({ skill }) => {
  const editController = useDisclosure();
  const deleteController = useDisclosure();

  return (
    <tr>
      <td className="whitespace-nowrap px-6 py-4">{skill.id}</td>
      <td className="whitespace-nowrap px-6 py-4">{skill.name}</td>
      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
        <button className="text-indigo-600 hover:text-indigo-900" onClick={editController.onOpen}>
          Edit
        </button>
        <button className="ml-3 text-red-600 hover:text-red-700" onClick={deleteController.onOpen}>
          Delete
        </button>
      </td>
      <SkillModal isOpen={editController.isOpen} onClose={editController.onClose} skill={skill} />
      <DeleteSkillConfirmModal isOpen={deleteController.isOpen} onClose={deleteController.onClose} skill={skill} />
    </tr>
  );
};

export default SkillRow;
