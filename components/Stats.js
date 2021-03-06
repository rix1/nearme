// @flow
import * as React from 'react';
import { sub } from 'date-fns';

import { useStore } from '../store';
import { MAX_ENCOUNTERS } from '../store/constants';

type BadgeProps = {|
  children: React.Node,
  trending: 'up' | 'down',
|};

const Badge = ({ children, trending }: BadgeProps) => {
  const colors =
    trending === 'up'
      ? 'bg-red-100 text-red-800'
      : 'bg-green-100 text-green-800';
  return (
    <div
      className={[
        `inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium md:mt-2 lg:mt-0`,
        colors,
      ].join(' ')}>
      <svg
        className={[
          '-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5',
          trending === 'down' && 'transform scale-[-1]',
        ].join(' ')}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
      <span className="sr-only">Increased by</span>
      {children}
    </div>
  );
};

type Props = {||};

const Stats = () => {
  const [mounted, setMounted] = React.useState(false);
  const allPeople = useStore((store) => store.people);
  const byDate = useStore((store) => store.byDate);

  const dateLimit = sub(new Date(), { days: 12 });
  const people = allPeople.filter((el) => new Date(el.date) > dateLimit);

  const days = Object.keys(byDate);
  const hours = people.reduce((prev, next) => prev + Number(next.duration), 0);
  const encounters = mounted ? people.length : 0;
  const avgTime =
    mounted && days.length ? Math.round((hours / days.length) * 100) / 100 : 0;
  const peopleLeft = mounted ? MAX_ENCOUNTERS - people.length : 0;
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <h3 className="text-lg leading-6 font-medium text-gray-900">
        Last 12 days
      </h3>
      <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            Total encounters
          </dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex md:block items-baseline text-2xl font-semibold text-indigo-600">
              <span className="block">{encounters}</span>
              {/* <span className="block ml-2 md:ml-0 text-sm font-medium text-gray-500">
                from 5
              </span> */}
            </div>
            {/* <Badge trending="up">12%</Badge> */}
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">
            Avg. time spent per day
          </dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex md:block items-baseline text-2xl font-semibold text-indigo-600">
              {avgTime}
              {/* <span className="block ml-2 md:ml-0 text-sm font-medium text-gray-500">
                from 1
              </span> */}
            </div>
            {/* <Badge trending="up">%</Badge> */}
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Remaining</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex md:block items-baseline text-2xl font-semibold text-indigo-600">
              {peopleLeft}
              {/* <span className="block ml-2 md:ml-0 text-sm font-medium text-gray-500">
                from 4
              </span> */}
            </div>
            {/* <Badge trending="down">4.05%</Badge> */}
          </dd>
        </div>
      </dl>
    </>
  );
};

export default (Stats: React.StatelessFunctionalComponent<Props>);
