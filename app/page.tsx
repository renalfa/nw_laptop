import Banner from "@/components/Banner";
import Content from "@/components/Content";
import { getAllBanners } from "@/services/banners";

import { getAllProducts } from "@/services/products";

export default async function Home() {
  const data = await getAllProducts();
  const banners = await getAllBanners();

  return (
    <main className="flex flex-col max-w-5xl gap-4 py-4 mx-auto overflow-x-hidden">
      <Banner data={banners} />
      <Content data={data} />
    </main>
  );
}
