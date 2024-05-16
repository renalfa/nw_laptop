import Link from "next/link";
import {
  GoHome,
  GoGift,
  GoImage,
  GoDesktopDownload,
  GoGraph,
} from "react-icons/go";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <div className="flex flex-col min-h-[800px] gap-4 w-80 bg-white p-4">
        <p className="text-lg font-bold text-black">Hallo, Admin!</p>
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <Link href={"/admin"} className="flex items-center gap-2 font-semibold text-black">
          <GoHome size={24} />
          <p>Home</p>
        </Link>
        <Link href={"/admin/add"} className="flex items-center gap-2 font-semibold text-black">
          <GoGift size={24} />
          <p>Tambah Product</p>
        </Link>
        <div className="flex items-center gap-2 font-semibold text-black">
          <GoImage size={24} />
          <p>Banner</p>
        </div>
        <div className="flex items-center justify-between font-semibold text-black">
          <div className="flex items-center gap-2">
            <GoDesktopDownload size={24} />
            <p>Penjualan</p>
          </div>
          <div className="badge badge-accent">PRO</div>
        </div>
        <div className="flex items-center justify-between font-semibold text-black">
          <div className="flex items-center gap-2">
            <GoGraph size={24} />
            <p>Analitik</p>
          </div>
          <div className="badge badge-accent">PRO</div>
        </div>
      </div>
      {children}
    </div>
  );
}
