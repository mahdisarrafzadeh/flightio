"use client";
import Tabs from "@/components/tabs";
import { useState } from "react";

export default function Home() {
  const [activeKey, setActiveKey] = useState();

  return (
    <main className="flex flex-col items-center justify-between px-[60px] pt-11">
      <section className="bg-white w-full flex justify-end">
        <Tabs
          items={[{ name: "ارزان ترین", handleTabs: () => console.log("hi") }]}
        />
      </section>
    </main>
  );
}
