import React, { FC } from "react";

import classNames from "classnames";

type Props = {
  label: string;
  field: any;
  row?: number;
  className?: string;
};

const Textarea: FC<Props> = ({ label, field, row = 3 }) => {
  return (
    <>
      <label className="text-[#A0A0B3] font-medium text-xs">{label}</label>
      <textarea
        rows={row}
        {...field}
        className={classNames(
          " outline-none flex-col flex  rounded-lg w-full ",
          classNames
        )}
      />
    </>
  );
};

export default Textarea;
