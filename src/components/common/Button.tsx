import React, { FC } from "react";

import classNames from "classnames";
import { TailSpin } from "react-loader-spinner";

type Props = {
  className?: string;
  children: any;
  type?: "danger" | "primary" | "secondary";
  onClick?: Function;
  loading?: boolean;
  submit?: boolean;
};

const Button: FC<Props> = ({
  type = "secondary",
  children,
  onClick,
  loading = false,
  submit = false,
}) => {
  return (
    <button
      type={submit ? "submit" : "button"}
      className={classNames(
        " rounded-[40px]  p-2 font-medium text-base  inline-flex gap-2",
        {
          "bg-[#E5E5E5] text-black": type === "secondary",
          "bg-[#B02626] text-white": type === "danger",
          "bg-[#1A43D3] text-white": type === "primary",
          "opacity-50 cursor-not-allowed": loading,
        }
      )}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <TailSpin
        visible={loading}
        height="20"
        width="20"
        color="#F5FFFA"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
      {children}
    </button>
  );
};

export default Button;
