import React from "react";
import { IoCloseOutline } from "react-icons/io5";

const Modal = ({
  onSubmit,
  onClose,
}: {
  onSubmit: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="fixed inset-0 h-[100vh] z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center">
      <div className="flex flex-col gap-4 p-4 text-black bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold">Hapus Produk</h1>
          <IoCloseOutline
            onClick={onClose}
            size={26}
            className="cursor-pointer "
          />
        </div>
        <p className="text-base font-light">
          Apakah kamu yakin untuk menghapus produk ini?
        </p>
        <div className="flex items-center justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-white btn btn-neutral">
            Batal
          </button>
          <button onClick={onSubmit} className="text-white btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
