"use client";
import Tabs from "@/components/tabs";
import { useState } from "react";

const tabItems = ["ارزان‌ترین", "گران‌‌ترین"];

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | undefined>(tabItems[0]);

  return (
    <main className="flex flex-col items-center justify-between px-[60px] pt-11">
      <section className="bg-white w-full flex justify-start px-3 py-2 rounded-lg border-[1px] border-solid min-h-[56px] ">
        <Tabs
          items={tabItems}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
      </section>
    </main>
  );
}
