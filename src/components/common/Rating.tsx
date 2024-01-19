import { FC } from "react";
import Image from "next/image";
import classNames from "classnames";

type Props = {
  rating?: number;
  className?: string;
};

const Rating: FC<Props> = ({ rating, className }) => {
  return (
    <div className="flex items-center">
      <Image
        src="/kid_star.svg"
        alt="rating"
        width={24}
        height={24}
        priority
        className="w-auto h-auto"
      />
      <span
        className={classNames(
          "text-default-gray font-medium text-sm",
          className
        )}
      >
        {rating}
      </span>
    </div>
  );
};
export default Rating;
