import Brand from "@/components/Brand";
import Banner from "@/components/Banner";
import CardProduct from "@/components/CardProduct";
import { productDummy } from "@/utils/data";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 py-4">
      <Banner />
      <label className="flex items-center w-full max-w-[300px] gap-2 mx-auto bg-white rounded-full input input-bordered">
        <input
          type="text"
          className="outline-none grow"
          placeholder="Cari berdasarkan nama"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="flex items-center justify-center w-full gap-5">
        <Brand brand="asus" />
        <Brand brand="acer" />
        <Brand brand="samsung" />
        <Brand brand="dell" />
        <Brand brand="hp" />
        <Brand brand="msi" />
      </div>
      <div className="flex flex-col gap-2 p-2">
        {productDummy.map((item) => (
          <CardProduct key={item.id} data={item} />
        ))}
      </div>
    </main>
  );
}
