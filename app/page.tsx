import Banner from "@/components/Banner";
import Content from "@/components/Content";

import { getAllProducts } from "@/services/products";

export default async function Home() {
  const data = await getAllProducts();

  return (
    <main className="flex flex-col max-w-5xl gap-4 py-4 mx-auto overflow-x-hidden">
      <Banner />
      <Content data={data} />
    </main>
  );
}
