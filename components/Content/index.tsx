"use client";

import React, { useState, useEffect } from "react";

import Brand from "@/components/Brand";
import CardProduct from "@/components/CardProduct";
import Empty from "@/components/Empty";

import { ProductProps } from "../CardProduct/index.type";

const Content = ({ data }: { data: ProductProps[] }) => {
  const [keyword, setKeyword] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [currentReadyPage, setCurrentReadyPage] = useState<number>(1);
  const [currentSoldPage, setCurrentSoldPage] = useState<number>(1);
  const itemsPerPage = 8;

  const productReady = data.filter((item) => {
    const matchesIsReady = item.isReady === true;
    const matchesKeyword = item.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesBrand = filter === "all" || item.brand === filter;

    return matchesIsReady && matchesKeyword && matchesBrand;
  });

  const productSold = data.filter((item) => {
    const matchesIsReady = item.isReady !== true;
    const matchesKeyword = item.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesBrand = filter === "all" || item.brand === filter;

    return matchesIsReady && matchesKeyword && matchesBrand;
  });

  const handleChange = (e: any) => {
    setKeyword(e.target.value);
    setCurrentReadyPage(1);
    setCurrentSoldPage(1);
  };

  const handleScroll = () => {
    const searchElement = document.getElementById("search-bar");
    const brandElement = document.getElementById("brand-bar");

    if (searchElement && brandElement) {
      const sticky = searchElement.offsetTop;
      if (window.scrollY > sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }
  };

  const handlePageChange = (type: string, page: number) => {
    if (type === "ready") {
      setCurrentReadyPage(page);
    } else if (type === "sold") {
      setCurrentSoldPage(page);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const paginate = (array: any[], page: number, itemsPerPage: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return array.slice(startIndex, startIndex + itemsPerPage);
  };

  const readyItems = paginate(productReady, currentReadyPage, itemsPerPage);
  const soldItems = paginate(productSold, currentSoldPage, itemsPerPage);

  const Pagination = ({ type, currentPage, totalItems }: any) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(type, i + 1)}
            className={`px-4 py-2 mx-1 rounded-full ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      <div
        className={`bg-white transition-all ${
          isSticky ? "fixed top-0 left-0 right-0 z-20 py-2 shadow" : ""
        }`}
        id="search-bar"
      >
        <div className="py-2">
          <label className="flex items-center w-full max-w-[300px] md:max-w-[450px] gap-2 mx-auto bg-white rounded-full input input-bordered">
            <input
              type="text"
              className="outline-none grow"
              placeholder="Cari berdasarkan nama"
              value={keyword}
              onChange={handleChange}
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
        </div>
        <div className="px-4 py-2 overflow-x-scroll" id="brand-bar">
          <div className="flex items-center justify-center w-full gap-5 min-w-[460px]">
            <Brand
              brand="all"
              onClick={() => setFilter("all")}
              filter={filter}
            />
            <Brand
              brand="asus"
              onClick={() => setFilter("asus")}
              filter={filter}
            />
            <Brand
              brand="acer"
              onClick={() => setFilter("acer")}
              filter={filter}
            />
            <Brand
              brand="samsung"
              onClick={() => setFilter("samsung")}
              filter={filter}
            />
            <Brand
              brand="dell"
              onClick={() => setFilter("dell")}
              filter={filter}
            />
            <Brand brand="hp" onClick={() => setFilter("hp")} filter={filter} />
            <Brand
              brand="msi"
              onClick={() => setFilter("msi")}
              filter={filter}
            />
            <Brand
              brand="lenovo"
              onClick={() => setFilter("lenovo")}
              filter={filter}
            />
            <Brand
              brand="apple"
              onClick={() => setFilter("apple")}
              filter={filter}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-2 md:gap-4">
        <h2 className="font-semibold text-center text-slate-600">
          Stok Tersedia
        </h2>
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        {readyItems.length > 0 ? (
          <div>
            <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
              {readyItems.map((item) => (
                <CardProduct key={item.id} data={item} />
              ))}
            </div>
            <Pagination
              type="ready"
              currentPage={currentReadyPage}
              totalItems={productReady.length}
            />
          </div>
        ) : (
          <Empty />
        )}
      </div>
      <div className="flex flex-col gap-2 px-2 md:gap-4">
        <h2 className="font-semibold text-center text-slate-600">Stok Habis</h2>
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        {soldItems.length > 0 ? (
          <div>
            <div className="grid items-center grid-cols-1 gap-2 md:grid-cols-2 md:gap-4">
              {soldItems.map((item) => (
                <CardProduct key={item.id} data={item} />
              ))}
            </div>
            <Pagination
              type="sold"
              currentPage={currentSoldPage}
              totalItems={productSold.length}
            />
          </div>
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};

export default Content;
