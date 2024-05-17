"use client";

import Modal from "@/components/Modal";
import Table from "@/components/Table";
import { useProducts } from "@/hook/useProducts";

export default function Home() {
  const { data, id, handleDelete, handleSwitch, setId, isError, isSuccess } =
    useProducts();

  const handleClose = () => setId("");

  return (
    <div className="w-full p-4 bg-[#f5f5f5]">
      <Table data={data} onSetId={setId} onSwitch={handleSwitch} />
      {id.length > 0 && <Modal onSubmit={handleDelete} onClose={handleClose} />}
    </div>
  );
}
