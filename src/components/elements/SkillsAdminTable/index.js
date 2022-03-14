import skillApi from '@api/skill';
import LoadingIcon from '@elements/LoadingIcon';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useQuery } from 'react-query';
import SkillRow from './SkillRow';

const SkillsAdminTable = () => {
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState('-id');
  const { data, isLoading } = useQuery(['skills', { page, sort }], () => skillApi.get({ page, sort }));

  return (
    <div className="mt-3 flex flex-col">
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {isLoading ? (
              <tr>
                <td colSpan={4}>
                  <div className="flex justify-center py-3">
                    <LoadingIcon className="text-gray-600" />
                  </div>
                </td>
              </tr>
            ) : (
              data?.data.items?.map((skill) => <SkillRow skill={skill} key={skill.id} />)
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex flex-row-reverse">
        <ReactPaginate
          pageCount={data?.data.total_pages || 0}
          onPageChange={(data) => setPage(data.selected)}
          className="inline-flex -space-x-px rounded-lg shadow text-gray-500 hover:text-gray-700"
          previousLinkClassName="block ml-0 rounded-l-lg border border-gray-200 bg-white py-2 px-3 leading-tight hover:bg-gray-100  select-none"
          pageLinkClassName="block border border-gray-200 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100  select-none"
          nextLinkClassName="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-200 hover:bg-gray-100 select-none"
          activeLinkClassName="text-blue-500 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
        />
      </div>
    </div>
  );
};

export default SkillsAdminTable;
