import React from "react";
import Image from "next/image";
import { GoTrash, GoPencil } from "react-icons/go";
import { TableProps } from "./index.type";
import Switch from "@/components/Switch";
import Link from "next/link";

const Table = ({
  data,
  onSetId,
  onSwitch,
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: TableProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-end">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div>
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
                <Link
                  href={`/admin/edit/${item.id}`}
                  className="text-white btn btn-neutral btn-circle btn-md"
                >
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
      <div className="flex items-center justify-between mt-2">
        <div className="text-[14px] text-center text-gray-400">
          Menampilkan data ke {startItem} - {endItem} dari {totalItems}
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Table;
