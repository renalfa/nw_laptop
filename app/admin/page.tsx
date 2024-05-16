import { productDummy } from "@/utils/data";
import Image from "next/image";
import { GoTrash, GoPencil } from "react-icons/go";

export default function Home() {
  return (
    <div className="w-full p-4 bg-[#f5f5f5]">
      <table className="table bg-white rounded-lg">
        {/* head */}
        <thead>
          <tr className="text-base font-bold text-black">
            <th>Nama Laptop</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Penyimpanan</th>
            <th>Prosesor</th>
            <th>Deskripsi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody className="text-black">
          {productDummy.map((item) => (
            <tr key={item.id} className="border-b border-[#f5f5f5]">
              <td>
                <div className="flex items-center gap-3">
                  <Image
                    width={200}
                    height={200}
                    className="object-contain w-16 h-16"
                    src={"/assets/placeholder.png"}
                    alt="Avatar Tailwind CSS Component"
                  />
                  <div>
                    <div className="font-bold">{item.name}</div>
                    <div className="text-sm opacity-50">{item.brand}</div>
                  </div>
                </div>
              </td>
              <td className="text-lg font-bold text-rose-500">{item.price}</td>
              <td>
                <div className="form-control w-28">
                  <label className="cursor-pointer label">
                    <span className="label-text">
                      {item.isReady ? "Ready" : "Sold"}
                    </span>
                    <input
                      type="checkbox"
                      className="toggle [--tglbg:white] toggle-accent"
                    />
                  </label>
                </div>
              </td>
              <td>
                {item.ram}/{item.storage}
              </td>
              <td>{item.processor}</td>
              <td>{item.description}</td>
              <td className="space-x-2">
                <button className="text-white btn btn-circle btn-md">
                  <GoPencil size={24} />
                </button>
                <button className="text-white btn btn-circle btn-md btn-error">
                  <GoTrash size={24} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
