"use client";

import Tabs from "@/components/tabs";
import ProductContainer from "@/components/product-item/ProductContainer";

export default function Home() {
  return (
    <main className="w-full grid gap-6">
      <Tabs />
      <ProductContainer />
    </main>
  );
}
