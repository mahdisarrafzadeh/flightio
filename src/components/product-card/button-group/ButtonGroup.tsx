import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { buttonGroup as string } from "@/utils/string";

interface Props {
  id?: number;
}

const ButtonGroup: FC<Props> = ({ id }) => {
  const router = useRouter();

  const handleConfirmModal = () => {
    router.push(`/${id}/?modal=true`);
  };
  const handleEditModal = () => {
    router.push(`/${id}/?edit=true`);
  };

  return (
    <div className="flex flex-row border rounded-[50px] bg-[#FFF] absolute top-5 right-5 col-start-2">
      <div
        className="flex flex-row justify-center items-center px-3 py-3 border-l cursor-pointer"
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
        className="flex flex-row justify-center items-center px-3 py-3 cursor-pointer"
        onClick={() => handleConfirmModal()}
      >
        <Image
          src="/delete.svg"
          alt="rating"
          width={16}
          height={16}
          className="h-auto w-auto"
        />

        <div className="text-[#B02626] text-xs font-medium ">
          {string.delete}
        </div>
      </div>
    </div>
  );
};

export default ButtonGroup;
