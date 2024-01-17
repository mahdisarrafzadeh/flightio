"use client";

import { IFormInput, Product } from "@/interfaces/product.interfaces";
import { Space } from "antd";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import Input from "../Input";
import { updateProduct } from "@/redux/slices/product";
import { useAppDispatch } from "@/hooks";

type Props = {
  productDetail?: Product;
};

const string = {
  title: "ویرایش محصول",
  labelTitle: "عنوان محصول",
  labelPrice: "قیمت اصلی محصول",
  labelCount: "تعداد موجودی",
  labelExplain: "توضیحات",
};

const EditProduct: FC<Props> = ({ productDetail }) => {
  const { control, setValue, reset, handleSubmit } = useForm({
    defaultValues: {
      id: 1,
      title: "",
      price: 0,
      count: 0,
      description: "",
    },
  });

  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    router.push(pathname);
    reset();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    dispatch(updateProduct(data));
  };

  useEffect(() => {
    if (productDetail) {
      setValue("id", productDetail?.id),
        setValue("title", productDetail?.title || ""),
        setValue("price", productDetail?.price || 0);
      setValue("count", productDetail?.rating?.count || 0);
      setValue("description", productDetail?.description || "");
    } else reset();
  }, [productDetail]); //eslint-disable-line

  return (
    <>
      {edit && (
        <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-5 z-50 overflow-auto backdrop-brightness-50 flex justify-center items-center">
          <div className="bg-white  xl:h-[550px]  m-auto w-3/6 rounded-[20px]">
            <div className="flex flex-col items-start text-right h-full">
              <p className="font-bold text-lg w-full border-b p-6">
                {string.title}
              </p>
              <form
                className="w-full p-6  h-full flex flex-col justify-between"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid gap-3">
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <div className="border rounded-lg w-full  pr-4">
                        <Input
                          label={string.labelTitle}
                          field={field}
                          type="text"
                        />
                      </div>
                    )}
                  />
                  <div className="flex flex-row gap-5">
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <div className="border rounded-lg  w-1/2  pr-4">
                          <Input
                            label={string.labelPrice}
                            field={field}
                            type="number"
                          />
                        </div>
                      )}
                    />
                    <Controller
                      name="count"
                      control={control}
                      render={({ field }) => (
                        <div className="border rounded-lg  w-1/2  pr-4">
                          <Input
                            label={string.labelCount}
                            field={field}
                            type="number"
                          />
                        </div>
                      )}
                    />
                  </div>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <div className="border rounded-lg  w-full pr-4">
                        <Input
                          label={string.labelExplain}
                          field={field}
                          type="textarea"
                        />
                      </div>
                    )}
                  />
                </div>

                <Space className="mt-8">
                  <button
                    type="submit"
                    className="bg-[#1A43D3] rounded-[40px] text-white p-2 font-medium text-base"
                  >
                    ثبت تغییرات
                  </button>
                  <button
                    type="button"
                    className="bg-[#E5E5E5] rounded-[40px] text-black  p-2 font-medium text-base"
                    onClick={() => handleCancel()}
                  >
                    انصراف
                  </button>
                </Space>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
};

export default EditProduct;
