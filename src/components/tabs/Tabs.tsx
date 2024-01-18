import React, { FC, useEffect, useMemo } from "react";

import classNames from "classnames";

type Props = {
  items: string[];
  activeKey?: string;
  setActiveKey: Function;
};

const Tabs: FC<Props> = ({ items, activeKey, setActiveKey }) => {
  useEffect(() => {
    !activeKey && setActiveKey(items[0]);
  }, []); // eslint-disable-line

  const tabElements = useMemo(() => {
    return items.map((item) => (
      <div
        className="flex justify-center items-center flex-col ml-8 cursor-pointer"
        key={item}
      >
        <span
          className={classNames("text-default-gray  leading-8 text-sm ", {
            " !text-default-blue leading-8 text-sm font-bold":
              activeKey === item,
          })}
          onClick={() => setActiveKey(item)}
        >
          {item}
        </span>
        {activeKey === item && (
          <div className="border-[#F5AC1F]  border-b-2 border-solid w-5 block" />
        )}
      </div>
    ));
  }, [items, activeKey]); // eslint-disable-line

  return (
    <section className="bg-white flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
      {tabElements}
    </section>
  );
};

export default Tabs;
