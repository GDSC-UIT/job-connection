import profileApi from '@api/profile';
import Button from '@elements/Button';
import Logo from '@elements/Logo';
import NextLink from '@elements/NextLink';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { auth } from '@libs/firebase';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';

const navigation = [
  { name: 'Find a Job', href: '/jobs', current: true },
  // { name: 'Find Talends', href: '#', current: false },
  { name: 'Blog', href: '#', current: false },
];

const Navbar = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const { data, error } = useQuery(['profile'], () => profileApi.get(), { enabled: !!user?.uid, retryDelay: 100, retry: 1 });

  return (
    <Disclosure as="nav" className="bg-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href="/" passHref>
                    <Logo className="block h-8 w-auto cursor-pointer " />
                  </Link>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <Link href="/jobs">
                    <a
                      className={clsx(
                        router.asPath == '/jobs' ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-500',
                        'rounded-md px-3 py-2 text-sm font-medium'
                      )}
                      aria-current={router.asPath == '/jobs' ? 'page' : undefined}
                    >
                      Find a job
                    </a>
                  </Link>

                  {/* {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a
                        className={clsx(
                          item.current ? 'text-emerald-600' : 'text-gray-500 hover:text-emerald-500',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    </Link>
                  ))} */}
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                {/* test */}

                {user ? (
                  <Menu as="div" className="relative z-10">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img className="h-8 w-8 rounded-full" src={data?.data.profile.photo || '/avatar.png'} />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <NextLink
                              href="/profile"
                              className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            >
                              Your Profile
                            </NextLink>
                          )}
                        </Menu.Item>

                        {data?.data.type == 'company' && (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <NextLink
                                  href="/manage-jobs"
                                  className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  Jobs
                                </NextLink>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <NextLink
                                  href="/manage-cv"
                                  className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                >
                                  CVs
                                </NextLink>
                              )}
                            </Menu.Item>
                          </>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <a href="#" className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              className={clsx(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-left text-sm text-gray-700', 'w-full')}
                              onClick={() => {
                                auth.signOut();
                              }}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <>
                    <Link href="/sign-in" passHref>
                      <Button outline rounded>
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/recruiter" passHref>
                      <Button rounded className="ml-2">
                        Recruiter
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={clsx(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
