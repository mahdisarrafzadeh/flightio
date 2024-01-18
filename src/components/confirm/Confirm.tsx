import { FC } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteProductById } from "@/redux/slices/service";
import { selectProduct } from "@/redux/slices/product";

import { Button } from "../common";

type Props = {
  productId?: number;
};

const Confirm: FC<Props> = ({ productId }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modal = searchParams.get("modal");
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  const { deleteLoading } = useAppSelector(selectProduct);

  const handleOk = () => {
    if (productId) {
      dispatch(
        deleteProductById({ id: productId, onSuccess: () => router.push("/") })
      );
    }
  };

  const handleCancel = () => {
    router.push(pathname);
  };

  if (!modal) {
    return null;
  }
  return (
    <dialog className="fixed left-0 top-0 w-full h-full bg-black bg-opacity-5 z-50 overflow-auto backdrop-brightness-50 flex justify-center items-center">
      <div className="flex flex-col items-start text-right bg-white m-auto p-8  max-md:w-11/12 w-[426px] rounded-[20px]">
        <p className="font-bold text-lg ">آیا از حذف محصول اطمینان دارید؟</p>
        <div className="mt-8 flex gap-4">
          <Button
            type="danger"
            onClick={() => handleOk()}
            loading={deleteLoading}
          >
            بله، حذف محصول
          </Button>
          <Button onClick={() => handleCancel()}>انصراف</Button>
        </div>
      </div>
    </dialog>
  );
};

export default Confirm;
