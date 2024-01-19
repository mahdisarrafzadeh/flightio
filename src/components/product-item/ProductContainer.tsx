"use client";
import { FC, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectProduct } from "@/redux/slices/product";
import { retrieveProducts } from "@/redux/slices/service";

import { home as string } from "@/utils/string";
import { Loading, NotFound } from "../common";
import ProductItem from "./ProductItem";

const ProductContainer: FC = () => {
  const { products, status } = useAppSelector(selectProduct);

  useEffect(() => {
    dispatch(retrieveProducts());
  }, []); // eslint-disable-line

  const dispatch = useAppDispatch();

  if (status !== "succeeded") {
    return <Loading />;
  }

  if (!products || products.length === 0) {
    <NotFound text={string.notFound} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 ">
      {products?.map((item) => (
        <ProductItem key={item.id} productDetail={item} />
      ))}
    </div>
  );
};

export default ProductContainer;
