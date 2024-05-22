"use client";

import React from "react";

import { HiOutlineShoppingBag } from "react-icons/hi2";

const ButtonBuy = ({ data }: { data: any }) => {
  const handleBuyClick = () => {
    const message = `*Halo admin, saya ingin menanyakan stok dan membeli produk berikut* :
        
Nama Produk: ${data.name}
Layar: ${data.screen}
Prosesor: ${data.processor}
Penyimpanan: ${data.ram} / ${data.storage}
Harga: ${data.price}
        
*Apakah produk ini masih tersedia? Terima kasih*.`;

    const whatsappUrl = `https://wa.me/6289523968539?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="flex items-center justify-between">
      <p className="text-2xl font-bold text-rose-500">{data.price}</p>
      <button
        onClick={handleBuyClick}
        className="flex items-center justify-center gap-2 px-6 py-2 text-xl font-bold text-black bg-yellow-500 rounded-lg"
        disabled={!data.isReady}
      >
        <HiOutlineShoppingBag size={20} />
        Beli
      </button>
    </div>
  );
};

export default ButtonBuy;
