"use client";
import React, { FC } from "react";

type Props = {
  items: { name: string; handleTabs: Function }[];
  activeKey?: string;
};

const Tabs: FC<Props> = ({ items }) => {
  return (
    <div>
      {items.map((item) => (
        <div key={item.name}>
          <span className="text-[#1A43D3]" onClick={() => item.handleTabs}>
            {item.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
