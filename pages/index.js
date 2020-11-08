// @flow
import * as React from "react";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

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
    <ol className="">
      {dayArray
        .map((_, index) => (
          <Day key={nanoid()}>
            {startDate.subtract(index, "d").format("dddd D MMM")}
          </Day>
        ))
        .reverse()}
    </ol>
  );
};

type DayProps = {
  children: React.Node,
};

const Day = ({ children }: DayProps) => <div className="">{children}</div>;

export default (Home: React.StatelessFunctionalComponent<Props>);
