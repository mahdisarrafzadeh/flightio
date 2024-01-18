"use client";

import React, { useEffect, FC } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { selectProduct } from "@/redux/slices/product";
import { retrieveProductById } from "@/redux/slices/service";

import { Loading, NotFound } from "@/components/common";
import Confirm from "@/components/confirm/Confirm";
import EditProduct from "@/components/edit-product/EditProduct";
import ProductCard from "@/components/product-card/ProductCard";

type Props = {
  params: { id: number };
};

const ProductPage: FC<Props> = ({ params }) => {
  const dispatch = useAppDispatch();
  const { productDetail, status } = useAppSelector(selectProduct);

  useEffect(() => {
    if (params.id) dispatch(retrieveProductById(params.id));
  }, [params.id]); // eslint-disable-line

  if (status !== "succeeded") {
    return <Loading />;
  }
  if (!productDetail) {
    return (
      <NotFound
        text={`We're sorry, but we couldn't locate any product with the provided ID.`}
      />
    );
  } else
    return (
      <>
        <ProductCard />
        <Confirm productId={productDetail?.id} />
        <EditProduct productDetail={productDetail} />
      </>
    );
};

export default ProductPage;
