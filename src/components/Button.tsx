"use client";

import React, { FC } from "react";
import classNames from "classnames";

type Props = {
  label: string;
  field: any;
  className?: string;
  children: any;
  type?: "danger" | "primary" | "secondary";
  onClick: Function;
};

const Input: FC<Props> = ({ type = "secondary", children, onClick }) => {
  return (
    <button
      type="button"
      className={classNames(" rounded-[40px]  p-2 font-medium text-base", {
        "bg-[#E5E5E5] text-black": type?.includes("secondary"),
        "bg-[#B02626] text-white": type?.includes("primary"),
        "bg-[#1A43D3] text-white": type?.includes("danger"),
      })}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

export default Input;
