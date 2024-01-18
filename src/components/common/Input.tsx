import React, { FC } from "react";
import classNames from "classnames";

type Props = {
  label: string;
  field: any;
  type: "text" | "number";
  className?: string;
};

const Input: FC<Props> = ({ label, field, type = "text" }) => {
  return (
    <>
      <label className="text-[#A0A0B3] font-medium text-xs">{label}</label>
      <input
        type={type}
        {...field}
        className={classNames(
          " outline-none flex-col flex  rounded-lg w-full ",
          classNames
        )}
      />
    </>
  );
};

export default Input;
