"use client";

import { useCallback, useEffect, useState } from "react";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";
import Image from "next/image";

const ImagePreview = ({ item, index }: { item: string; index: number }) => {
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomChange = useCallback((shouldZoom: any) => {
    setIsZoomed(shouldZoom);
  }, []);

  return (
    <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
      <Image
        src={item}
        width={500}
        height={500}
        alt={`${item}-${index}`}
        className="object-cover object-center w-full rounded-lg aspect-square"
      />
    </ControlledZoom>
  );
};

const Slider = ({ data }: { data: string[] | any[] }) => {
  return (
    <div className="flex flex-col gap-2 mt-2">
      <div className="font-semibold capitalize">gambar produk : </div>
      <div className="grid items-center grid-cols-3 gap-4">
        {data.map((item: any, index: any) => (
          <ImagePreview item={item} index={index} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Slider;
