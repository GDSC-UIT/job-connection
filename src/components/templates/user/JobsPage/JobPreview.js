import Button from '@elements/Button';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import skillApi from '@api/skill';
import { LocationMarkerIcon } from '@heroicons/react/outline';

const JobPreview = ({ job }) => {
  const router = useRouter();
  const { data, isLoading } = useQuery('skills', () => skillApi.get({ size: 1000 }));

  const skills = useMemo(() => {
    if (!data) return [];
    if (!job) return [];
    return job.skill_ids.map((skill_id) => data.data.items.find((skill) => skill.id == skill_id));
  }, [data, job]);

  if (!job) return null;
  return (
    <div className="px-3">
      <h1 className="text-3xl font-semibold">{job.title}</h1>
      <p className="text-gray-400 font-semibold">{job.company.name}</p>
      <Button
        className="w-full mt-3"
        onClick={() => {
          router.push(`/jobs/${job.id}/job-application`);
        }}
      >
        Apply now
      </Button>
      <div className="border my-5" />
      <div>
        {skills.map((skill) => (
          <span key={skill.id} className="text-sm mr-1 border rounded px-1">
            {skill.name}
          </span>
        ))}
      </div>
      <div className="mt-2 flex">
        <LocationMarkerIcon className="h-5 w-5 text-gray-500 mr-2" />
        {job.company.address}
      </div>

      <div className="border my-5" />

      <p>{job.description}</p>
    </div>
  );
};

export default JobPreview;
