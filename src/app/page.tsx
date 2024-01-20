"use client";

import ProductContainer from "@/components/product-container";
import Tabs from "@/components/tabs";

export default function Home() {
  return (
    <main className="w-full grid gap-6">
      <Tabs />
      <ProductContainer />
    </main>
  );
}
