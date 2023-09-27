import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const nr_segments = 2;

export default function Loading() {
  return (
    <>
      <HomeIcon className="w-5 h-5 text-gray-600 hover:text-black"></HomeIcon>
      {[...Array(nr_segments)].map((e, index) => (
        <Fragment key={index}>
          <ChevronRightIcon className="w-5 h-5 text-gray-600 mx-1"></ChevronRightIcon>
          <div className="h-2 w-20 bg-slate-300 rounded animate-pulse"></div>
        </Fragment>
      ))}
    </>
  );
}
