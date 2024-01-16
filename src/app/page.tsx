"use client";
import { useEffect } from "react";
import Tabs from "@/components/tabs";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveTutorials, selectProduct } from "@/redux/slices/product";
import Image from "next/image";

const tabItems = ["ارزان‌ترین", "گران‌‌ترین"];

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | undefined>(tabItems[0]);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(retrieveTutorials());
  }, []);

  return (
    <main className="flex flex-col items-center justify-between px-[60px] pt-11">
      <section className="bg-white w-full flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
        <Tabs
          items={tabItems}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
      </section>
      <section className="mt-[25px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {products?.map((item) => (
          <div
            key={item.id}
            className="text-left max-w-sm rounded-lg  bg-white border-1 border-[#E0E0E0] border-solid"
          >
            <div className="w-full h-[250px]  flex justify-center ">
              <Image
                src={item.image || ""}
                alt={item.title || ""}
                width={213}
                height={240}
                className="w-[213px] h-[240px] object-contain pt-6 pb-[26px] px-[50px]"
              />
            </div>
            <div className="grid grid-rows-4">
              <div className="font-bold text-base ">{item.title}</div>{" "}
              <div className="flex justify-between items-center">
                <span>{item.rating?.rate}</span>
                <span>{item.price}تومان</span>
              </div>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
