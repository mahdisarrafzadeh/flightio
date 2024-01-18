import { FC, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { retrieveProductById, updateProduct } from "@/redux/slices/service";

import { IFormInput, Product } from "@/interfaces/product.interfaces";
import { Input, Button, Textarea } from "@/components/common";
import { selectProduct } from "@/redux/slices/product";

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

const Form: FC<Props> = ({ productDetail }) => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { updateLoading } = useAppSelector(selectProduct);

  const { control, setValue, reset, handleSubmit } = useForm({
    defaultValues: {
      id: 1,
      title: "",
      price: 0,
      count: 0,
      description: "",
    },
  });

  useEffect(() => {
    if (productDetail) {
      setValue("id", productDetail?.id);
      setValue("title", productDetail?.title || "");
      setValue("price", productDetail?.price || 0);
      setValue("count", productDetail?.rating?.count || 0);
      setValue("description", productDetail?.description || "");
    } else reset();
  }, [productDetail]); //eslint-disable-line

  const handleCancel = () => {
    router.push(pathname);
    reset();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    if (productDetail && data) {
      dispatch(
        updateProduct({
          data: data,
          onSuccess: () => dispatch(retrieveProductById(productDetail?.id)),
        })
      );
    }
  };

  return (
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
              <Input label={string.labelTitle} field={field} type="text" />
            </div>
          )}
        />
        <div className="flex flex-row gap-5">
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <div className="border rounded-lg  w-1/2  pr-4">
                <Input label={string.labelPrice} field={field} type="number" />
              </div>
            )}
          />
          <Controller
            name="count"
            control={control}
            render={({ field }) => (
              <div className="border rounded-lg  w-1/2  pr-4">
                <Input label={string.labelCount} field={field} type="number" />
              </div>
            )}
          />
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <div className="border rounded-lg w-full pr-4">
              <Textarea label={string.labelExplain} field={field} />
            </div>
          )}
        />
      </div>

      <div className="flex gap-4 mt-8">
        <Button type="primary" submit loading={updateLoading}>
          ثبت تغییرات
        </Button>
        <Button onClick={() => handleCancel()}>انصراف</Button>
      </div>
    </form>
  );
};

export default Form;
