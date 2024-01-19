import { FC } from "react";
import Image from "next/image";

import { useAppSelector } from "@/hooks";
import { selectProduct } from "@/redux/slices/product";

import { productItem as string } from "@/utils/string";
import ButtonGroup from "./button-group/ButtonGroup";

const ProductCard: FC = () => {
  const { productDetail } = useAppSelector(selectProduct);

  return (
    <div className=" rounded-[20px] border border-solid border-default p-0 bg-white grid grid-flow-col max-md:grid-flow-row">
      <div className="relative border-solid max-md:border-b md:border-l justify-center items-center h-full py-[50px] px-[72px]">
        <ButtonGroup id={productDetail?.id} />
        <div className="flex h-[400px] max-md:h-[250px] justify-center object-contain pt-6 pb-[26px] items-center ">
          {productDetail?.image && productDetail?.title && (
            <Image
              src={productDetail?.image}
              alt={productDetail?.title}
              width={213}
              height={240}
              priority
              className="w-auto h-auto"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col justify-around ">
        <div className="w-full pt-10 max-md:pt-5 h-full px-5">
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
              <hr className="border h-4  border-default" />
              <span className="text-default-gray font-normal text-xs">
                {productDetail?.rating?.count &&
                  `${productDetail?.rating?.count + string.count}`}
              </span>
            </div>
          </div>
          <span className="text-default-gray text-xs font-normal">
            {productDetail?.description}
          </span>
        </div>
        <div className="border-t mt-28 px-5">
          <div className="h-full flex items-center justify-between pt-[31px] pb-9 pl-[34px] pr-5">
            <span className="text-default-gray text-xs font-medium flex justify-start">
              {string.payment}
            </span>
            <span className="text-default-blue text-lg font-bold flex justify-end">
              {productDetail?.price} {string.exchange}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
