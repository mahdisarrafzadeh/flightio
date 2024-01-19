import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { header as string } from "@/utils/string";

const Header: FC = () => {
  return (
    <header className="bg-white px-[60px] flex justify-between items-center h-[72px] shrink-0">
      <Link href={"/"}>
        <Image
          src="/logo.svg"
          alt="Testio Logo"
          width={100}
          height={24}
          priority
          className="object-cover w-auto h-auto"
        />
      </Link>
      <section className="flex flex-row px-[20px] py-2 border-solid border-[1px] max-sm:rounded-full max-sm:px-2 rounded-[50px] cursor-pointer ">
        <Image
          src="/account_circle.svg"
          alt="Testio Logo"
          width={24}
          height={24}
          priority
        />
        <span className="text-default-gray font-normal pr-1 max-sm:hidden">
          {string.name}
        </span>
      </section>
    </header>
  );
};

export default Header;
