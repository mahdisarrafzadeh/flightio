"use client";

import { FC, useEffect, useMemo, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectProduct, sortProducts } from "@/redux/slices/product";

import classNames from "classnames";
import { home as string } from "@/utils/string";

const Tabs: FC = () => {
  const [activeKey, setActiveKey] = useState<string>(string.items[0].value);
  const { products } = useAppSelector(selectProduct);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!products && !activeKey) return;
    dispatch(sortProducts(activeKey));
  }, [products, activeKey]); // eslint-disable-line

  const tabElements = useMemo(() => {
    return string.items.map(({ label, value }) => (
      <div
        className="flex justify-center items-center flex-col ml-8 cursor-pointer"
        key={value}
      >
        <span
          className={classNames("text-default-gray  leading-8 text-sm ", {
            " !text-default-blue leading-8 text-sm font-bold":
              activeKey === value,
          })}
          onClick={() => setActiveKey(value)}
        >
          {label}
        </span>
        {activeKey === value && (
          <div className="border-[#F5AC1F]  border-b-2 border-solid w-5 block" />
        )}
      </div>
    ));
  }, [activeKey]); // eslint-disable-line

  return (
    <section className="bg-white flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
      {tabElements}
    </section>
  );
};

export default Tabs;
