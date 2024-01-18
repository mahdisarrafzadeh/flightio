"use client";

import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectProduct,
  sortProductsByCheapest,
  sortProductsByExpensive,
} from "@/redux/slices/product";
import { retrieveProducts } from "@/redux/slices/service";

import { home as string } from "@/utils/string";
import { Loading, NotFound } from "@/components/common";
import Tabs from "@/components/tabs";
import ProductItem from "@/components/product-item/ProductItem";

export default function Home() {
  const [activeKey, setActiveKey] = useState<string | undefined>(
    string.items[0]
  );
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(retrieveProducts());
  }, []); // eslint-disable-line

  useEffect(() => {
    if (activeKey && products) {
      if (activeKey === string.cheapest) {
        dispatch(sortProductsByCheapest());
      } else {
        dispatch(sortProductsByExpensive());
      }
    }
  }, [products, activeKey]); // eslint-disable-line

  return (
    <main>
      <div className="w-full grid gap-6">
        <Tabs
          items={string.items}
          setActiveKey={setActiveKey}
          activeKey={activeKey}
        />
        {!status.includes("succeeded") ? (
          <Loading />
        ) : products && products.length === 0 ? (
          <NotFound text={string.notFound} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
            {products?.map((item) => (
              <ProductItem key={item.id} productDetail={item} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
