import React from "react";
import Image from "next/image";

const string = {
  name: "بردیا ادیبی",
};

const Header: React.FC = () => {
  return (
    <header className="bg-white px-[60px] flex justify-between items-center h-[72px] shrink-0">
      <Image
        src="/logo.svg"
        alt="Testio Logo"
        width={100}
        height={24}
        priority
        className="object-cover w-auto h-auto"
      />
      <section className="flex flex-row px-[20px] py-2 border-solid border-[1px] rounded-[50px] cursor-pointer ">
        <Image
          src="/account_circle.svg"
          alt="Testio Logo"
          width={24}
          height={24}
          priority
        />
        <span className="text-default-gray font-normal pr-1">
          {string.name}
        </span>
      </section>
    </header>
  );
};

export default Header;
