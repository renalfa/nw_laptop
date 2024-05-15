import { ProductProps } from "@/components/CardProduct/index.type";

export const productDummy: ProductProps[] = [
  {
    id: "1",
    name: "Macbook Pro M1",
    brand: "apple",
    cover: "",
    price: "Rp. 12.500.000",
    isReady: true,
    description: "test",
    storage: "128GB",
    ram: "8GB",
    processor: "apple chip M2",
    images: ["test", "test"],
    screen: "14 inch",
    typeStorage: "SSD",
    resolution: "1280 x 1080",
    OS: "MAC OS",
  },
  {
    id: "2",
    name: "Macbook Pro M2",
    brand: "apple",
    cover: "",
    price: "Rp. 16.500.000",
    isReady: false,
    description: "test",
    storage: "128GB",
    ram: "8GB",
    processor: "apple chip M2",
    images: ["test", "test"],
    screen: "14 inch",
    typeStorage: "SSD",
    resolution: "1280 x 1080",
    OS: "MAC OS",
  },
];
