import jobApi from '@api/job';
import MainLayout from '@layouts/MainLayout';
import React, { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import JobItem from './JobItem';
import JobPreview from './JobPreview';

const JobsPage = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('-id');
  const { data, isLoading } = useQuery(['jobs', { page, sort }], () => jobApi.get({ page, sort }));
  const [currentJobIndexSelected, setCurrentJobIndexSelected] = useState(undefined);

  const currentJobSelected = useMemo(() => {
    if (!data) return undefined;
    return data?.data.items.find((job) => job.id == currentJobIndexSelected);
  }, [currentJobIndexSelected, data]);

  useEffect(() => {
    if (data) setCurrentJobIndexSelected(data.data.items[0].id);
  }, [data]);

  return (
    <div className="mx-auto max-w-7xl px-2 pt-6 sm:px-6 lg:px-8">
      <div className="grid-container !mb-4">
        <div className="px-2">
          {data?.data.items.map((job) => (
            <JobItem
              job={job}
              onClick={() => {
                setCurrentJobIndexSelected(job.id);
              }}
              key={job.id}
              selected={currentJobIndexSelected == job.id}
            />
          ))}
          <div className="mt-2 flex flex-row-reverse">
            <ReactPaginate
              pageCount={data?.data.total_pages || 0}
              onPageChange={(data) => setPage(data.selected)}
              className="inline-flex -space-x-px rounded-lg text-gray-500 hover:text-gray-700"
              previousLinkClassName="block ml-0 rounded-l-lg border border-gray-200 bg-white py-2 px-3 leading-tight hover:bg-gray-100  select-none"
              pageLinkClassName="block border border-gray-200 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100  select-none"
              nextLinkClassName="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-200 hover:bg-gray-100 select-none"
              activeLinkClassName="text-blue-500 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
            />
          </div>
        </div>
        <div className="px-2 flex-1">
          <JobPreview job={currentJobSelected} />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;

JobsPage.layout = MainLayout;
