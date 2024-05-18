import React from "react";

import Image from "next/image";
import { GoTrash, GoPencil } from "react-icons/go";
import { TableProps } from "./index.type";
import Switch from "@/components/Switch";
import Link from "next/link";

const Table = ({ data, onSetId, onSwitch }: TableProps) => {
  return (
    <table className="table bg-white rounded-lg">
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
        {data.map((item) => (
          <tr key={item.id} className="border-b border-[#f5f5f5]">
            <td>
              <div className="flex items-center gap-3">
                <Image
                  width={200}
                  height={200}
                  className="object-cover object-center w-16 h-16 rounded-md"
                  src={item.cover || "/assets/placeholder.png"}
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
              <Switch
                onSwitch={onSwitch}
                productId={item.id}
                status={item.isReady}
              />
            </td>
            <td>
              {item.ram}/{item.storage}
            </td>
            <td>{item.processor}</td>
            <td>
              {item.description.length > 25
                ? `${item.description.slice(0, 25)} ...`
                : item.description}
            </td>
            <td className="space-x-2">
              <Link href={`/admin/edit/${item.id}`} className="text-white btn btn-neutral btn-circle btn-md">
                <GoPencil size={24} />
              </Link>
              <button
                onClick={() => onSetId(item.id)}
                className="text-white btn btn-circle btn-md btn-error"
              >
                <GoTrash size={24} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
