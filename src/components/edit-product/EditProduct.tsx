import { FC } from "react";
import { useSearchParams } from "next/navigation";

import { edit as string } from "@/utils/string";
import { Product } from "@/interfaces/product.interfaces";
import Form from "./form";

type Props = {
  productDetail?: Product;
};

const EditProduct: FC<Props> = ({ productDetail }) => {
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");

  if (!edit && productDetail) {
    return null;
  }
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-5 z-50 overflow-auto backdrop-brightness-50 flex justify-center items-center">
      <div className="bg-white xl:h-[550px]  m-auto max-md:w-11/12 w-3/6 rounded-[20px]">
        <div className="flex flex-col items-start text-right h-full">
          <p className="font-bold text-lg w-full border-b p-6">
            {string.title}
          </p>
          <Form productDetail={productDetail} />
        </div>
      </div>
    </dialog>
  );
};

export default EditProduct;
