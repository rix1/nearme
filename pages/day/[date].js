// @flow
import * as React from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import Link from 'next/link';
import * as Collapsible from '@radix-ui/react-collapsible';
import * as Popover from '@radix-ui/react-popover';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';

import Chevron from '../../components/Chevron';
import Layout from '../../components/Layout';
import { useStore } from '../../store';

type Props = {||};

function parsePerson(personString) {
  const parsed = JSON.parse(personString);
  return {
    ...parsed,
    date: new Date(parsed.date),
  };
}

const DatePage = ({}: Props) => {
  const router = useRouter();
  const { date } = router.query;
  const [storedDate, setStoredDate] = React.useState(date);
  const addPersonToStore = useStore((store) => store.addPerson);
  const byDate = useStore((store) => store.byDate);

  const peeps = byDate[storedDate] || [];

  React.useEffect(() => {
    if (!storedDate) {
      setStoredDate(date);
    }
  }, [date]);

  function addPerson(event) {
    event.preventDefault();
    const name = event.target.name.value;
    const duration = event.target.duration.value;
    const meetDate = new Date(storedDate);
    const now = new Date();

    meetDate.setHours(now.getHours(), now.getMinutes());

    const newPerson = {
      name: name.trim(),
      duration,
      date: meetDate,
      id: nanoid(),
    };
    addPersonToStore(newPerson, storedDate);
    toast.success(`${name} added`);
    event.target.reset();
  }

  return (
    <Layout>
      <Collapsible.Root>
        <DayHeading label={dayjs(storedDate).format('DD-MM-YYYY')}>
          {dayjs(storedDate).format('dddd D MMMM')}
        </DayHeading>
        <Collapsible.Content className="collapsible">
          <div className="pb-8">
            <div className="bg-white px-4 shadow sm:rounded-lg sm:px-6 py-5">
              <form onSubmit={addPerson}>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700">
                  Who did you meet?
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <div className="relative flex items-stretch flex-grow focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {/* Heroicon name: solid/users */}
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      autoComplete="off"
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-solid border-[1px] border-gray-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div className="relative flex -mr-px focus-within:z-10">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        className="h-5 w-5 text-gray-400"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <input
                      type="number"
                      name="duration"
                      id="duration"
                      autoComplete="off"
                      className="-ml-px focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none pl-10 pr-2 sm:text-sm border-solid border-[1px] border-gray-300"
                      placeholder="2 hours"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Add</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
      <section
        aria-labelledby="timeline-title"
        className="lg:col-start-3 lg:col-span-1">
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
            People you met this day
          </h2>
          <div className="mt-6 flow-root">
            {peeps.length ? (
              <ul className="-mb-8">
                {peeps.map((person, index) => (
                  <ListItem
                    key={person.name}
                    person={person}
                    isLast={index === peeps.length - 1}
                  />
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 text-sm">
                You havent met anyone...
              </span>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

type DayHeadingProps = {|
  label: string,
  children: React.Node,
|};

const DayHeading = ({ label, children }: DayHeadingProps) => {
  return (
    <div className="mb-8">
      <div>
        <nav className="sm:hidden" aria-label="Back">
          <Link href="/">
            <a className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-600">
              <Chevron point="left" />
              Back to overview
            </a>
          </Link>
        </nav>
        <nav className="hidden sm:flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <Link href="/">
                  <a className="text-sm font-medium text-gray-500 hover:text-gray-400">
                    Overview
                  </a>
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                {/* Heroicon name: solid/chevron-right */}
                <Chevron />
                <span
                  href="#"
                  className="ml-4 text-sm font-medium text-gray-500 hover">
                  {label}
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold  text-gray-800 sm:text-3xl sm:truncate">
            {children}
          </h2>
        </div>
        <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
          <Collapsible.Button className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="mr-2">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add person
          </Collapsible.Button>
        </div>
      </div>
    </div>
  );
};

type ListItemProps = {|
  isLast: boolean,
  person: Person,
|};

const ListItem = ({ person, isLast }: ListItemProps) => {
  const removePerson = useStore((state) => state.removePerson);
  return (
    <li>
      <div className="relative pb-8">
        {!isLast && (
          <span
            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
            aria-hidden="true"
          />
        )}
        <div className="relative flex space-x-3">
          <div>
            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
              <svg
                className="w-5 h-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
            <div>
              <p className="text-sm text-gray-500">
                Hanged out with{' '}
                <span className="font-medium text-gray-900">
                  {/* IDEA: Link to user profile?? */}
                  {person.name}
                </span>
              </p>
            </div>
            <Popover.Root>
              <div className="text-right text-sm whitespace-nowrap text-gray-500">
                <time dateTime="2020-09-20" className="inline-block mr-3">
                  {person.duration} hours
                </time>
                <Popover.Trigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 inline-block cursor-pointer">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Popover.Trigger>
                <Popover.Content className="shadow-md bg-red-100 text-red-800 p-4 rounded-md popover">
                  <h3 className="font-bold">Remove item?</h3>
                  <p>Are you sure you wanna do this?</p>
                  <Popover.Close onClick={() => removePerson(person)}>
                    Yes
                  </Popover.Close>
                  <Popover.Arrow className="fill-current text-red-100" />
                </Popover.Content>
              </div>
            </Popover.Root>
          </div>
        </div>
      </div>
    </li>
  );
};

export default (DatePage: React.StatelessFunctionalComponent<Props>);
