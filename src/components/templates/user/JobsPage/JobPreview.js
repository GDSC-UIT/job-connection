import Button from '@elements/Button';
import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import skillApi from '@api/skill';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@libs/firebase';

const JobPreview = ({ job }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { data: profile, error } = useQuery(['profile'], () => profileApi.get(), { enabled: !!user?.uid, retryDelay: 100, retry: 1 });

  const { data, isLoading } = useQuery('skills', () => skillApi.get({ size: 1000 }));
  console.log(auth);
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
          if (!profile) router.push('/sign-in');
          else router.push(`/jobs/${job.id}/job-application`);
        }}
        disabled={profile?.data.type == 'company'}
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
