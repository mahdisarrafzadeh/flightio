"use client";
import { useEffect } from "react";
import Tabs from "@/components/tabs";
import { useState } from "react";
import { useAppDispatch, useAppSelector, useAppStore } from "@/hooks";
import { retrieveProducts, selectProduct } from "@/redux/slices/product";
import Image from "next/image";

const tabItems = ["ارزان‌ترین", "گران‌‌ترین"];

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | undefined>(tabItems[0]);
  const dispatch = useAppDispatch();
  const { products } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(retrieveProducts());
  }, []);

  return (
    <main>
      <div className="w-full grid gap-6">
        <section className="bg-white flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
          <Tabs
            items={tabItems}
            setActiveKey={setActiveKey}
            activeKey={activeKey}
          />
        </section>
        <section className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8">
            {products?.map(({ id, image, title, rating, price }) => (
              <div
                key={id}
                className="cursor-pointer bg-white border-1 border-[#E0E0E0] border-solid rounded-lg p-4"
              >
                <Image
                  src={image || ""}
                  alt={title || ""}
                  width={213}
                  height={240}
                  className="w-[213px] h-[240px] object-contain mb-4"
                />
                <h2 className="font-bold text-base overflow-hidden line-clamp-2">
                  {title}
                </h2>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <Image
                      src="/kid_star.svg"
                      alt="rating"
                      width={24}
                      height={24}
                      priority
                      className="mr-1"
                    />
                    <span className="text-default-gray font-medium text-sm">
                      {rating?.rate}
                    </span>
                  </div>
                  <div className="text-default-blue text-lg font-bold">
                    {price}تومان
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
