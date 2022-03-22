import skillApi from '@api/skill';
import clsx from 'clsx';
import React, { useMemo } from 'react';
import { useQuery } from 'react-query';

const JobItem = ({ onClick, job, selected }) => {
  const { data, isLoading } = useQuery('skills', () => skillApi.get({ size: 1000 }));

  const skills = useMemo(() => {
    if (!data) return [];
    if (!job) return [];
    return job.skill_ids.map((skill_id) => data.data.items.find((skill) => skill.id == skill_id));
  }, [data, job]);

  return (
    <div onClick={onClick} className={clsx({ 'border-blue-500': selected }, 'p-4 border flex cursor-pointer')}>
      <img className="w-16 h-16 mr-2 border object-cover" src={job.company.photo} />

      <div className="">
        <h3 className="text-xl mb-2 font-semibold ">{job.title}</h3>
        {skills.map((skill) => (
          <span key={skill.id} className="text-sm mr-1 border rounded px-1">
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default JobItem;
