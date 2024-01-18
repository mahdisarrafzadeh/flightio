import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/interfaces/product.interfaces";

interface Props {
  productDetail: Product;
}

const ProductItem: FC<Props> = ({ productDetail }) => {
  const router = useRouter();
  const { id, image, price, title, rating } = productDetail;

  return (
    <div
      key={id}
      className="grid  p-4 cursor-pointer bg-white border-1 border-[#E0E0E0] border-solid rounded-lg border"
      onClick={() => router.push(`/${id}`)}
    >
      <div className="flex justify-center  h-[250px]">
        <Image
          src={image || ""}
          alt={title || ""}
          width={213}
          height={240}
          priority
          className="w-[213px] h-[240px] object-contain mb-4 "
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
        <div className="text-default-blue text-lg font-bold">{price} تومان</div>
      </div>
    </div>
  );
};

export default ProductItem;
