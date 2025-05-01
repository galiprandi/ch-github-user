import React from "react";
import type { SVGProps } from "react";

export function IconBack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 12 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z"
      ></path>
    </svg>
  );
}
