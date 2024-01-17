"use client";

import React, { FC } from "react";
import classNames from "classnames";

type Props = {
  label: string;
  field: any;
  type: "text" | "number" | "textarea";
  className?: string;
};

const Input: FC<Props> = ({ label, field, type = "text" }) => {
  const handleInput = () => {
    switch (type) {
      case "number":
        return (
          <input
            type="number"
            {...field}
            className={classNames(
              " outline-none flex-col flex  rounded-lg w-full ",
              classNames
            )}
          />
        );
      case "textarea":
        return (
          <textarea
            rows={4}
            type="number"
            {...field}
            className={classNames(
              " outline-none flex-col flex  rounded-lg w-full ",
              classNames
            )}
          />
        );
      default:
        return (
          <input
            type="text"
            {...field}
            className={classNames(
              " outline-none flex-col flex  rounded-lg w-full ",
              classNames
            )}
          />
        );
    }
  };
  return (
    <>
      <label className="text-[#A0A0B3] font-medium text-xs">{label}</label>
      {handleInput()}
    </>
  );
};

export default Input;
