import { ProductProps } from "@/components/CardProduct/index.type";
import {
  deleteProduct,
  editProduct,
  getAllProducts,
} from "@/services/products";
import { useCallback, useEffect, useState } from "react";

export const useProducts = () => {
  const [data, setData] = useState<ProductProps[]>([]);
  const [id, setId] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllProducts();
      setData(res);
    } catch (error) {
      setData([]);
    }
  }, []);

  const refetch = () => fetchData();

  const handleSwitch = async (productId: string, payload: any) => {
    try {
      await editProduct(productId, payload);

      setIsSuccess(true);
      refetch();

      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      setIsError(true);
      refetch();

      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(id);

      setIsSuccess(true);
      setId("");
      refetch();

      setTimeout(() => {
        setIsSuccess(false);
      }, 2000);
    } catch (error) {
      setIsError(true);
      setId("");
      refetch();

      setTimeout(() => {
        setIsError(false);
      }, 2000);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    setData,
    isSuccess,
    setIsSuccess,
    isError,
    setIsError,
    id,
    setId,
    handleDelete,
    handleSwitch,
    refetch,
  };
};
