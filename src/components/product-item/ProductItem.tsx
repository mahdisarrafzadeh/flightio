import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/interfaces/product.interfaces";
import { home as string } from "@/utils/string";

interface Props {
  productDetail: Product;
}

const ProductItem: FC<Props> = ({ productDetail }) => {
  const router = useRouter();
  const { id, image, price, title, rating } = productDetail;

  return (
    <div
      key={id}
      className="grid  px-4 pt-6 py-5  cursor-pointer bg-white border-1 border-default border-solid rounded-lg border"
      onClick={() => router.push(`/${id}`)}
    >
      <div className="flex justify-center h-[250px]">
        <Image
          src={image || ""}
          alt={title || ""}
          width={213}
          height={240}
          priority
          className="w-[213px] h-[240px] object-contain"
        />
      </div>
      <h2 className="font-bold text-base overflow-hidden line-clamp-2">
        {title}
      </h2>
      <div className="flex w-full justify-between items-center mt-4">
        <div className="flex items-center">
          <Image
            src="/kid_star.svg"
            alt="rating"
            width={24}
            height={24}
            priority
            className="mr-1"
          />
          <span className="text-default-gray font-medium text-sm">
            {rating?.rate}
          </span>
        </div>
        <div className="text-default-blue text-lg font-bold">
          {price}
          {string.mony}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
