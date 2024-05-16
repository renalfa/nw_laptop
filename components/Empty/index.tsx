import React from "react";
import Lottie from "lottie-react";
import anim from "@/public/json/empty.json";

const Empty = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Lottie
        animationData={anim}
        loop
        autoPlay
        className="w-48 h-48 object-contain"
      />
      <p className="text-[12px] font-light text-black">
        Maaf, produk yang anda cari tidak tersedia!
      </p>
    </div>
  );
};

export default Empty;
