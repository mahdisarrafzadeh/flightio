"use client";

import { useAppDispatch } from "@/hooks";
import { deleteProductById } from "@/redux/slices/product";
import { Space } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FC } from "react";

type Props = {
  productId?: number;
};

const Confirm: FC<Props> = ({ productId }) => {
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleOk = () => {
    if (productId) {
      dispatch(deleteProductById(productId));
      router.push("/");
    }
  };

  const handleCancel = () => {
    router.push(pathname);
  };

  return (
    <>
      {modal && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-5 z-50 overflow-auto backdrop-brightness-50 flex justify-center items-center">
          <div className="bg-white m-auto p-8 w-[426px] rounded-[20px]">
            <div className="flex flex-col items-start text-right">
              <p className="font-bold text-lg ">
                آیا از حذف محصول اطمینان دارید؟
              </p>
              <Space className="mt-8">
                <button
                  type="button"
                  className="bg-[#B02626] rounded-[40px] text-white p-2 font-medium text-base"
                  onClick={() => handleOk()}
                >
                  بله، حذف محصول
                </button>

                <button
                  type="button"
                  className="bg-[#E5E5E5] rounded-[40px] text-black  p-2 font-medium text-base"
                  onClick={() => handleCancel()}
                >
                  انصراف
                </button>
              </Space>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Confirm;
