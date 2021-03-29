/* eslint-disable react/jsx-props-no-spreading */
// @flow
import * as React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import Avatar from '../components/Avatar';
import Chevron from '../components/Chevron';
import Layout from '../components/Layout';
import Stats from '../components/Stats';
import { useStore } from '../store';
import { DAYS_TOTAL } from '../store/constants';

type HomeProps = {||};

dayjs.extend(relativeTime);

const Home = () => {
  const today = dayjs();
  const byDate = useStore((store) => store.byDate);
  const dayArray = new Array(DAYS_TOTAL).fill();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Layout>
      <div className="md:flex-row md:items-center md:justify-between">
        <div className="flex-1 min-w-0 mb-8">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            NearMe
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block ml-2 w-8 h-8 align-text-bottom stroke-[#ed669d]">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Helps you track your encounters (or friends if you have that)
          </p>
        </div>
        <div className="mb-8">
          <Stats />
        </div>
        <h3 className="text-lg leading-6 font-medium text-gray-900">History</h3>
        <div className=" mt-5 bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <ol className="divide-y w-full">
            {dayArray.map((_, index) => {
              const date = today.subtract(index, 'd');
              const isToday = index === 0;
              const peeps = mounted
                ? byDate[date.format('YYYY-MM-DD')] || []
                : [];
              return (
                <div key={nanoid()} className="py-4 px-4">
                  <Link
                    href={`/day/${date.format('YYYY-MM-DD')}`}
                    scroll={false}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a className="flex items-center justify-between cursor-pointer">
                      <span className="">
                        {isToday ? (
                          <span className="text-gray-500 text-sm block">
                            Today
                          </span>
                        ) : (
                          <span className="text-gray-500 text-sm block">
                            {date.fromNow()}
                          </span>
                        )}
                        {date.format('dddd D MMM')}
                      </span>
                      <span className="inline-block ml-auto">
                        {peeps.map((person, idx) => (
                          <Avatar key={`avatar-${person.name}`} overlap={!!idx}>
                            {person.name}
                          </Avatar>
                        ))}
                      </span>
                      <span className="inline-block ">
                        <Chevron />
                      </span>
                    </a>
                  </Link>
                </div>
              );
            })}
          </ol>
        </div>
      </div>
    </Layout>
  );
};

export default (Home: React.StatelessFunctionalComponent<HomeProps>);
