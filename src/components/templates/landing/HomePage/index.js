import React from 'react';
import Image from 'next/image';
import MainLayout from '@layouts/MainLayout';
import Button from '@elements/Button';
import { LocationMarkerIcon, FolderOpenIcon, LibraryIcon } from '@heroicons/react/outline';

const jobs = [
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
  {
    title: 'Senior UI/UX Designer',
    location: 'Ho Chi Minh City',
    category: 'IT/Development',
    tags: ['Fulltime', 'UI/UX', 'Senior'],
    logo: 'https://i.imgur.com/B6Xyejn.png',
    company: 'Googel LTD',
  },
];

const categories = [
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
  { name: 'Art', icon: LibraryIcon, description: '1000+ vacancies' },
];

const HomePage = () => {
  return (
    <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      {/* HEADER */}
      <header className="h-screen">
        <div className="grid-container items-center h-full">
          <div className="grid-column-6">
            <h2 className="text-4xl uppercase text-blue-600 font-bold">Job Connection</h2>
            <p className="text-2xl mt-2">Where thousands of dream jobs are available</p>
            <Button className="mt-8 mr-4">FIND JOB</Button>
            <Button outline>FIND TALENT</Button>
          </div>
          <div className="grid-column-6">
            <Image src="/big-banner 1.png" alt="" width={705} height={707} />
          </div>
        </div>
      </header>

      {/* FIND JOB */}
      <section className="h-screen">
        <h2 className="text-3xl font-bold text-center mb-3">JOBS</h2>
        <div className="grid-container flex-wrap">
          {jobs.map((job, i) => (
            <div className="grid-column-4" key={i}>
              <div className="flex border-2 rounded-md p-2 bg-white hover:shadow-md">
                <div className="flex-1 mr-1.5">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <div className="flex items-center mb-4">
                    <img src={job.logo} alt="" className="h-7 w-7 mr-2" />
                    <p className="text-gray-500">{job.company}</p>
                  </div>
                  <div className="flex items-center">
                    <FolderOpenIcon className="h-5 w-5 text-yellow-400 mr-2" />
                    <p>{job.category}</p>
                  </div>
                  <div className="flex items-center">
                    <LocationMarkerIcon className="h-5 w-5 text-red-600 mr-2" />
                    <p>{job.location}</p>
                  </div>
                </div>
                <div>
                  {job.tags.map((tag, j) => (
                    <div key={j} className="text-center bg-green-500 mb-1 px-1.5 py-0.5 text-sm rounded-md text-white">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <Button>FIND MORE JOBS</Button>
        </div>
      </section>

      {/* JOB CATEGORIES */}
      <section className="h-screen">
        <h2 className="text-3xl font-bold text-center mb-3">JOBS</h2>
        <div className="grid-container flex-wrap">
          {categories.map((category, i) => (
            <div className="grid-column-3" key={i}>
              <div className="flex border-2 rounded-md p-2 bg-white hover:shadow-md items-center flex-col">
                <category.icon className="h-20 w-20 text-blue-500" />
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="flex justify-center mt-5">
          <Button>FIND MORE JOBS</Button>
        </div> */}
      </section>

      {/*  */}
      <section className="h-screen">
        <div className="grid-container items-center h-full">
          <div className="grid-column-6">
            <Image src="/Rocket.png" alt="" width={705} height={707} />
          </div>
          <div className="grid-column-6">
            <h2 className="text-4xl uppercase font-bold text-gray-700">
              Find job faster with more than <span className="text-red-500">1000</span> jobs available
            </h2>
            <Button className="mt-8 mr-4">FIND NOW</Button>
          </div>
        </div>
      </section>

      {/*  */}
      <section className="h-screen">
        <div className="grid-container items-center h-full">
          <div className="grid-column-6">
            <h2 className="text-4xl uppercase font-bold text-gray-700">
              Access thousands of <span className="text-blue-500">talented candidates</span>
            </h2>
            <Button className="mt-8 mr-4">POST NOW</Button>
          </div>
          <div className="grid-column-6">
            <Image src="/CV 1.png" alt="" width={705} height={707} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;

HomePage.layout = MainLayout;
