// @flow
import * as React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {};

const DatePage = ({}: Props) => {
  console.log("DatePage says hi");
  const router = useRouter();
  const { date } = router.query;

  return (
    <div>
      Helo!
      <h1 className="text-3xl">{dayjs(date).format("dddd D MMM")}</h1>
    </div>
  );
};

export default DatePage;
