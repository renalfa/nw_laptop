"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { RiCustomerService2Fill } from "react-icons/ri";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div
      className={`bg-gradient-to-tr from-[#F5F5F5] to-[#d9d9d9] w-full flex ${
        pathname.includes("/admin") ? "" : "justify-center"
      }`}
    >
      <div className="flex items-center justify-between w-full max-w-5xl pl-1 pr-4 lg:pl-0 lg:pr-0">
        <Link href={"/"} className="flex items-center">
          <Image
            src="/assets/logo.png"
            width={500}
            height={500}
            alt="logo"
            className="object-cover object-center w-16 h-16"
          />
          <h1 className="text-lg font-bold text-black">NW Laptop Madiun</h1>
        </Link>
        {!pathname.includes("/admin") && (
          <Link
            target="_blank"
            href={"https://wa.me/6289523968539"}
            className="flex items-center justify-center p-2 bg-gray-400 rounded-full"
          >
            <RiCustomerService2Fill size={24} color="white" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
