import { ProductProps } from "../CardProduct/index.type";

export interface TableProps {
  data: ProductProps[];
  onSetId: (id: string) => void;
  onSwitch: (id: string, status: boolean) => void;
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

