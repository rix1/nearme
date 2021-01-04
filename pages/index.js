/* eslint-disable react/jsx-props-no-spreading */
// @flow
import * as React from "react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { Text } from "@visx/text";
import { Group } from "@visx/group";
import Link from "next/link";
import { motion } from "framer-motion";

import colorHash from "../lib/colorHash";

const StateContext = React.createContext(null);
const DispatchContext = React.createContext(null);

function stateReducer(state, action) {
  switch (action.type) {
    case "ADD_PERSON":
      return {
        ...state,
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const Home = () => {
  const days = 12;
  const [state, dispatch] = React.useReducer(stateReducer, {
    days: new Array(days).fill(),
  });
  return (
    <div className="">
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <List days={days} />
        </DispatchContext.Provider>
      </StateContext.Provider>
    </div>
  );
};

// Our custom easing
let easing = [0.6, -0.05, 0.01, 0.99];

// animate: defines animation
// initial: defines initial state of animation or stating point.
// exit: defines animation when component exits

// Custom variant
const fadeInUp = {
  initial: {
    x: -60,
    opacity: 0,
    transition: { duration: 0.2, ease: easing },
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.02,
    },
  },
};

type ListProps = {
  days: number,
};

const List = ({ days }: ListProps) => {
  const startDate = dayjs();
  const dayArray = new Array(days).fill();
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <div className="flex items-center justify-center md:w-1/2 mx-auto">
        <motion.ol variants={stagger} className="divide-y w-full">
          {dayArray.map((_, index) => {
            const date = startDate.subtract(index, "d");
            return (
              <Day key={nanoid()}>
                <Link href={`/day/${date.format("YYYY-MM-DD")}`} scroll={false}>
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <motion.a
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center justify-between cursor-pointer"
                  >
                    <span className="">{date.format("dddd D MMM")}</span>
                    <span className="inline-block ml-auto">
                      <span className="flex">
                        <TextAvatar className="w-8 flex-initial">P</TextAvatar>
                        <TextAvatar className="w-8 flex-initial -ml-3">
                          B
                        </TextAvatar>
                        <TextAvatar className="w-8 flex-initial -ml-3">
                          R
                        </TextAvatar>
                      </span>
                    </span>
                    <span className="inline-block ">
                      <ChevronIcon />
                    </span>
                  </motion.a>
                </Link>
              </Day>
            );
          })}
        </motion.ol>
      </div>
    </motion.div>
  );
};

type DayProps = {
  children: React.Node,
};

const Day = ({ children }: DayProps) => (
  <motion.div variants={fadeInUp} className="py-2 px-6">
    {children}
  </motion.div>
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
          width={24}
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
