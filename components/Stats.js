// @flow
import * as React from 'react';

type BadgeProps = {|
  children: React.Node,
  trending: 'up' | 'down',
|};

const Badge = ({ children, trending }: BadgeProps) => {
  const color = trending === 'up' ? 'red' : 'green';
  return (
    <div
      className={`inline-flex items-baseline px-2.5 py-0.5 rounded-full text-sm font-medium bg-${color}-100 text-${color}-800 md:mt-2 lg:mt-0`}>
      <svg
        className={`-ml-1 mr-0.5 flex-shrink-0 self-center h-5 w-5 text-${color}-500`}
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
              <span className="block">8</span>
              <span className="block ml-2 md:ml-0 text-sm font-medium text-gray-500">
                from 5
              </span>
            </div>
            <Badge trending="up">12%</Badge>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Avg. per day</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex md:block items-baseline text-2xl font-semibold text-indigo-600">
              2.34
              <span className="block ml-2 md:ml-0 text-sm font-medium text-gray-500">
                from 1
              </span>
            </div>
            <Badge trending="up">2.02%</Badge>
          </dd>
        </div>
        <div className="px-4 py-5 sm:p-6">
          <dt className="text-base font-normal text-gray-900">Remaining</dt>
          <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
            <div className="flex md:block items-baseline text-2xl font-semibold text-indigo-600">
              2
              <span className="block ml-2 md:ml-0 text-sm font-medium text-gray-500">
                from 4
              </span>
            </div>
            <Badge trending="down">4.05%</Badge>
          </dd>
        </div>
      </dl>
    </>
  );
};

export default (Stats: React.StatelessFunctionalComponent<Props>);
