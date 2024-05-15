import React from "react";
import { ProductProps } from "./index.type";
import Image from "next/image";
import Placeholder from "@/public/assets/placeholder.png";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const index = ({ data }: { data: ProductProps }) => {
  return (
    <div className="relative w-full border border-[#f2f2f2] rounded-lg p-2 flex flex-col gap-2">
      {!data.isReady && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full rounded-lg bg-gray-500/50">
          <Image
            src="/assets/soldout.png"
            alt="sold"
            width={200}
            height={200}
            className="object-contain w-36 h-36"
          />
        </div>
      )}
      <div
        className={`absolute top-0 left-0 px-3 text-sm font-semibold ${
          data.isReady ? "text-black bg-accent" : "text-white bg-red-500"
        } rounded-ss-lg rounded-ee-lg`}
      >
        {data.isReady ? "Ready" : "Sold"}
      </div>
      <div className="flex items-center gap-3 border-b border-b-[#f2f2f2]">
        <Image
          src={Placeholder}
          width={200}
          height={200}
          alt={data.name}
          className="object-contain w-24 h-24"
        />
        <div className="flex flex-col justify-center gap-1">
          <h2 className="font-semibold text-black">{data.name}</h2>
          <div className="flex items-center gap-3">
            <div className="flex flex-col text-[12px]">
              <p>Layar</p>
              <span className="font-semibold text-black">{data.screen}</span>
            </div>
            <div className="flex flex-col text-[12px]">
              <p>Prosesor</p>
              <span className="font-semibold text-black">{data.processor}</span>
            </div>
            <div className="flex flex-col text-[12px]">
              <p>Penyimpanan</p>
              <span className="font-semibold text-black">
                {data.ram}/{data.storage}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold text-rose-500">{data.price}</p>
        <button className="flex items-center justify-center gap-2 px-4 py-1 font-bold text-black bg-yellow-500 rounded">
          <HiOutlineShoppingBag size={20} />
          Beli
        </button>
      </div>
    </div>
  );
};

export default index;
