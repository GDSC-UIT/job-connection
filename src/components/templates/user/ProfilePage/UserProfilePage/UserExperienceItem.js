import skillApi from '@api/skill';
import UserExperienceModal from '@elements/Modals/UserExperienceModal';
import useDisclosure from '@hooks/useDisclosure';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import dateFormat from 'dateformat';
import { TrashIcon } from '@heroicons/react/outline';
import DeleteUserExperienceConfirmModal from '@elements/Modals/DeleteUserExperienceConfirmModal';

const UserExperienceItem = ({ experience }) => {
  const { data, isLoading } = useQuery('skills', () => skillApi.get({ size: 1000 }));
  const editController = useDisclosure();
  const deleteController = useDisclosure();

  const skills = useMemo(() => {
    if (!data) return [];
    if (!experience) return [];
    return experience.skill_ids.map((skill_id) => data.data.items.find((skill) => skill.id == skill_id));
  }, [data, experience]);
  return (
    <>
      <div className="flex mb-4">
        <img src={experience.company.photo} className="w-16 h-16 border mr-2 cursor-pointer" onClick={editController.onOpen} />
        <div className="flex-1">
          <h2 className="text-lg font-semibold cursor-pointer" onClick={editController.onOpen}>
            {experience.job_title}
          </h2>
          <p className="text-sm font-medium text-gray-500">
            {experience.company.name} ({dateFormat(experience.from, 'mmm yyyy')} -{' '}
            {experience.to ? dateFormat(experience.to, 'mmm yyyy') : 'Now'})
          </p>
          <div className="flex">
            {skills.map((skill) => (
              <span key={skill.id} className="text-sm mr-1 border rounded px-1">
                {skill.name}
              </span>
            ))}
          </div>
          <p>{experience.description}</p>
        </div>
        <div>
          <button className="w-6 text-red-400 hover:text-red-500" onClick={deleteController.onOpen}>
            <TrashIcon />
          </button>
        </div>
      </div>
      <div className="border mb-2"></div>
      <UserExperienceModal isOpen={editController.isOpen} onClose={editController.onClose} experience={experience} />
      <DeleteUserExperienceConfirmModal isOpen={deleteController.isOpen} onClose={deleteController.onClose} experience={experience} />
    </>
  );
};

export default UserExperienceItem;
