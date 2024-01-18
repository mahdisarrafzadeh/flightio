"use client";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveProductById, selectProduct } from "@/redux/slices/product";
import React, { useEffect, FC } from "react";
import Image from "next/image";
import Confirm from "@/components/confirm/Confirm";
import { useRouter } from "next/navigation";
import EditProduct from "@/components/edit-product/EditProduct";

const string = {
  count: " تا باقی مانده ",
  edit: "ویرایش",
  delete: " حذف محصول",
};

type Props = {
  params: { id: number };
};

const ProductPage: FC<Props> = ({ params }) => {
  const dispatch = useAppDispatch();
  const { productDetail } = useAppSelector(selectProduct);
  const router = useRouter();

  useEffect(() => {
    if (params.id) dispatch(retrieveProductById(params.id));
  }, [params.id]);

  const handleConfirmModal = () => {
    router.push(`/${productDetail?.id}/?modal=true`);
  };
  const handleEditModal = () => {
    router.push(`/${productDetail?.id}/?edit=true`);
  };

  return (
    <>
      <div className="rounded-[20px] border border-solid border-[#E0E0E0] p-0 bg-white">
        <div className="grid grid-flow-col max-md:grid-flow-row">
          <div className="relative border-solid border-l justify-center items-center h-full py-[50px] px-[72px]">
            <div className="absolute top-5 right-5 col-start-2">
              <div className="flex flex-row border rounded-[50px] bg-[#FFF] ">
                <div
                  className="flex flex-row justify-center items-center px-3 py-3 border-l"
                  onClick={() => handleEditModal()}
                >
                  <Image
                    src="/edit.svg"
                    alt="rating"
                    width={16}
                    height={16}
                    className="h-auto w-auto ml-1"
                  />
                  <span className="text-[#1A43D3] text-xs font-medium ">
                    {string.edit}
                  </span>
                </div>
                <div
                  className="flex flex-row justify-center items-center px-3 py-3"
                  onClick={() => handleConfirmModal()}
                >
                  <Image
                    src="/delete.svg"
                    alt="rating"
                    width={16}
                    height={16}
                    priority
                    className="h-auto w-auto"
                  />

                  <div className="text-[#B02626] text-xs font-medium">
                    {string.delete}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex h-[400px] max-md:h-[250px] justify-center object-contain pt-6 pb-[26px] items-center ">
              {productDetail?.image && productDetail?.title && (
                <Image
                  src={productDetail?.image}
                  alt={productDetail?.title}
                  width={213}
                  height={240}
                  loading="lazy"
                />
              )}
            </div>
          </div>
          <div className="flex flex-col justify-around ">
            <div className="w-full pt-10 max-md:pt-5  h-full">
              <div className="px-5">
                <div className="border-b mb-4 flex justify-end flex-col">
                  <h2 className="text-xl font-bold leading-8">
                    {productDetail?.title}
                  </h2>
                  <div className="flex justify-start py-4 items-center gap-3">
                    <div className="flex justify-center items-center  ">
                      <Image
                        src="/kid_star.svg"
                        alt="rating"
                        width={24}
                        height={24}
                        className="h-auto w-auto"
                      />
                      <span className="text-default-gray font-normal text-xs pr-2 ">
                        {productDetail?.rating?.rate}
                      </span>
                    </div>
                    <hr className="border h-4  border-[#E0E0E0]" />
                    <span className="text-default-gray font-normal text-xs">
                      {productDetail?.rating?.count &&
                        `${productDetail?.rating?.count + string.count}`}
                    </span>
                  </div>
                </div>
                <span className="text-[#757575] text-xs font-normal">
                  {productDetail?.description}
                </span>
              </div>
            </div>
            <div className="border-t mt-28 px-5">
              <div className="h-full flex items-center justify-between pt-[31px] pb-9 pl-[34px] pr-5">
                <div className="flex justify-start">
                  <span className="text-default-gray text-xs font-medium">
                    مبلغ قابل پرداخت:
                  </span>
                </div>
                <div className="flex justify-end">
                  <span className="text-default-blue  text-lg font-bold">
                    {productDetail?.price} تومان
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Confirm productId={productDetail?.id} />
      <EditProduct productDetail={productDetail} />
    </>
  );
};

export default ProductPage;
