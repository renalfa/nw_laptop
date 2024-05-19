"use client";

import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useProducts } from "@/hook/useProducts";
import { useState } from "react";

export default function Home() {
  const { data, id, handleDelete, handleSwitch, setId, isError, isSuccess } =
    useProducts();

  const handleClose = () => setId("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginate = (array: any[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  };

  const paginatedData = paginate(data, currentPage, itemsPerPage);

  return (
    <div className="w-full p-4 bg-[#f5f5f5]">
      <Table
        data={paginatedData}
        onSetId={setId}
        onSwitch={handleSwitch}
        currentPage={currentPage}
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {id.length > 0 && <Modal onSubmit={handleDelete} onClose={handleClose} />}
    </div>
  );
}
