import { ProductProps } from "../CardProduct/index.type";

export interface TableProps {
  data: ProductProps[];
  onSetId: (productId: string) => void;
  onSwitch: (productId: string, payload: any) => void;
}
