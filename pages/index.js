/* eslint-disable react/jsx-props-no-spreading */
// @flow
import * as React from "react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import Link from "next/link";

import colorHash from "../lib/colorHash";

type Props = {
  children: React.Node,
};

const Home = ({ children }: Props) => {
  return (
    <div className="">
      <List days={44} />
    </div>
  );
};

type ListProps = {
  days: number,
};

const List = ({ days }: ListProps) => {
  const startDate = dayjs();
  const dayArray = new Array(days).fill();
  return (
    <div className="flex items-center justify-center md:w-1/2 mx-auto">
      <ol className="divide-y w-full">
        {dayArray
          .map((_, index) => {
            const date = startDate.subtract(index, "d");
            return (
              <Day key={nanoid()}>
                <Link href={`/day/${date.format("YYYY-MM-DD")}`}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className="flex items-center justify-between">
                    <span className="">{date.format("dddd D MMM")}</span>
                    <span className="inline-block ml-auto">
                      <span className="flex">
                        <TextAvatar className="w-8 flex-initial hover:z-0">
                          P
                        </TextAvatar>
                        <TextAvatar className="w-8 flex-initial hover:z-0 -ml-3">
                          B
                        </TextAvatar>
                        <TextAvatar className="w-8 flex-initial hover:z-0 -ml-3">
                          R
                        </TextAvatar>
                      </span>
                    </span>
                    <span className="inline-block ">
                      <ChevronIcon />
                    </span>
                  </a>
                </Link>
              </Day>
            );
          })
          .reverse()}
      </ol>
    </div>
  );
};

type DayProps = {
  children: React.Node,
};

const Day = ({ children }: DayProps) => (
  <div className="py-2 px-4">{children}</div>
);

type ChevronIconProps = {};

const ChevronIcon = ({}: ChevronIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    className="text-gray-400 w-6 h-6"
  >
    <path
      fill="currentColor"
      d="M10.3 8.7a1 1 0 0 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.4-1.4l3.29-3.3-3.3-3.3z"
    />
  </svg>
);

type TextAvatarProps = {|
  children: string,
|};

const TextAvatar = ({ children, ...rest }: TextAvatarProps) => {
  return (
    <svg {...rest} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <Group>
        <circle
          cx="12"
          cy="12"
          r="10"
          fill={colorHash(children).hex}
          stroke="white"
          strokeWidth="1px"
        />
        <Text
          width="24"
          x={24 / 2}
          y={24 / 2}
          fill="white"
          style={{ fontSize: "80%" }}
          verticalAnchor="middle"
          textAnchor="middle"
        >
          {children.charAt(0)}
        </Text>
      </Group>
    </svg>
  );
};

export default (Home: React.StatelessFunctionalComponent<Props>);
