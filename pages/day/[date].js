// @flow
import * as React from "react";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

const DatePage = ({}: Props) => {
  const router = useRouter();
  const { date } = router.query;
  const [storedDate] = React.useState(date);
  return (
    <motion.div initial="initial" animate="animate" exit={{ opacity: 0 }}>
      <Link href="/" scroll={false}>
        <a> {`<`} Back</a>
      </Link>
      <h1 className="text-3xl">{dayjs(storedDate).format("dddd D MMM")}</h1>
    </motion.div>
  );
};

export default DatePage;
