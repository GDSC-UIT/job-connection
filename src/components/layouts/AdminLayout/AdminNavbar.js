import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import clsx from 'clsx';

const AdminNavbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <div className="block">
              <div className="flex space-x-4">
                <Link href="/admin/recruiter-request">
                  <a
                    className={clsx(
                      { 'bg-gray-900': router.pathname == '/admin/recruiter-request' },
                      'rounded-md px-3 py-2 text-sm font-medium text-white'
                    )}
                    aria-current="page"
                  >
                    Recruiter
                  </a>
                </Link>
                <Link href="/admin/jobs-request">
                  <a
                    className={clsx(
                      { 'bg-gray-900': router.pathname == '/admin/jobs-request' },
                      'rounded-md px-3 py-2 text-sm font-medium text-white'
                    )}
                    aria-current="page"
                  >
                    Jobs
                  </a>
                </Link>
                <Link href="/admin/skills">
                  <a
                    className={clsx(
                      { 'bg-gray-900': router.pathname == '/admin/skills' },
                      'rounded-md px-3 py-2 text-sm font-medium text-white'
                    )}
                    aria-current="page"
                  >
                    Skills
                  </a>
                </Link>
              </div>
            </div>
          </div>

          <div className="relative ml-3">
            <div></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
