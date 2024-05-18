import Image from "next/image";
import Link from "next/link";
import React from "react";

import { SiTiktok, SiInstagram, SiWhatsapp } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="relative footer footer-center p-10 bg-gradient-to-br from-[#F5F5F5] to-[#d9d9d9] text-black">
      <aside>
        <Image
          src="/assets/logo.png"
          width={500}
          height={500}
          alt="logo"
          className="z-20 object-cover object-center w-24 h-24"
        />
        <p className="font-bold">
          NW Laptop Madiun <br />
          Beli laptop berkualitasmu disini.
        </p>
        <p>Copyright © 2024 - All right reserved</p>
      </aside>
      <nav className="relative z-10">
        <div className="grid grid-flow-col gap-4">
          <Link target="_blank" href={"https://www.instagram.com/nw_laptop"}>
            <SiInstagram
              size={24}
              className="text-black hover:text-yellow-400"
            />
          </Link>
          <Link
            target="_blank"
            href={"https://www.tiktok.com/@nw_laptopmadiun"}
          >
            <SiTiktok size={24} className="text-black hover:text-yellow-400" />
          </Link>
          <Link target="_blank" href={"https://wa.me/6289523968539"}>
            <SiWhatsapp
              size={24}
              className="text-black hover:text-yellow-400"
            />
          </Link>
        </div>
      </nav>
      <Image
        src="/assets/patern.png"
        width={500}
        height={500}
        className="absolute bottom-0 right-0 z-0 object-cover w-full h-full opacity-10"
        alt="patern"
      />
    </footer>
  );
};

export default Footer;
