import Slider from "@/components/Slider";
import { getProductById } from "@/services/products";
import Image from "next/image";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import ButtonBuy from "./_components/ButtonBuy";

export default async function Home({
  params: { productId },
}: {
  params: { productId: string };
}) {
  const data: any = await getProductById(productId);

  return (
    <main className="flex flex-col max-w-5xl gap-4 py-4 mx-auto overflow-x-hidden text-black">
      <div className="flex items-center gap-2">
        <Link href={"/"}>
          <IoChevronBack
            size={24}
            className="mr-2 text-gray-400 hover:scale-125"
          />
        </Link>
        <h1 className="text-2xl font-bold">{data.name}</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 px-4 md:grid-cols-3 md:px-0">
        <Image
          src={data.cover || "/assets/placeholder.png"}
          width={500}
          height={500}
          alt={data.name}
          className="object-cover object-center w-full rounded-lg aspect-square"
        />
        <div className="w-full p-2 md:col-span-2">
          <div className="flex flex-col gap-2">
            <p className="font-bold capitalize">spesifikasi produk</p>
            <p className="capitalize ">
              <span className="font-semibold">brand : </span>
              {data.brand}
            </p>
            <p className="capitalize ">
              <span className="font-semibold">prosesor : </span>
              {data.processor}
            </p>
            <p className="capitalize ">
              <span className="font-semibold">Penyimpanan : </span>
              {data.ram} / {data.storage} - {data.typeStorage}
            </p>
            <p className="capitalize ">
              <span className="font-semibold">layar : </span>
              {data.screen}
            </p>
            <p className="capitalize ">
              <span className="font-semibold">resolusi : </span>
              {data.resolution}
            </p>
            <p className="capitalize ">
              <span className="font-semibold">sistem operasi : </span>
              {data.OS}
            </p>
            <p className="capitalize ">
              <span className="font-semibold">deskripsi produk : </span>
              {data.description}
            </p>
          </div>
          <Slider data={data.images} />
          <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent my-4"></div>
          <ButtonBuy data={data} />
        </div>
      </div>
    </main>
  );
}
