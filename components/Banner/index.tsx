"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Banner from "@/public/assets/placeholder-banner.png";

const index = ({ length }: { length?: number }) => {
  return (
    <div className="flex items-center h-full">
      <Swiper
        modules={[FreeMode, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          360: {
            slidesPerView: 2.1,
            spaceBetween: 12,
          },
          430: {
            slidesPerView: 2.4,
            spaceBetween: 12,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1440: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {Array.from({ length: length ? length : 9 }).map((_, index) => (
          <SwiperSlide className="flex items-center justify-center" key={index}>
            <div className="relative">
              <Image
                src={Banner}
                alt="banner"
                width={500}
                height={500}
                className="rounded-lg aspect-[1/1] object-cover w-full h-full"
              />
              <div className="absolute bg-gradient-to-b from-transparent to-black/80 w-full h-[100px] bottom-0 rounded-b-lg"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default index;
