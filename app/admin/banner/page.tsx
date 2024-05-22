"use client";

import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { GoTrash } from "react-icons/go";

import { createBanner, deleteBanner, getAllBanners } from "@/services/banners";
import { storage } from "@/services/firebase";

import { initialDataBanner } from "@/utils/data";

export default function Home() {
  const [data, setData] = useState<any>(initialDataBanner);
  const [banners, setBanners] = useState<any[]>([]);
  const [coverBlob, setCoverBlob] = useState<Blob | null>(null);
  const [progresCover, setProgressCover] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await getAllBanners();
      setBanners(res);
    } catch (error) {
      setBanners([]);
    }
  }, []);

  const refetch = () => fetchData();

  const handleInputBanner = async (e: any) => {
    const cover = e.target.files[0];

    setCoverBlob(cover);

    try {
      const imageRef = ref(storage, `banners/${cover.name}`);

      const uploadTask = uploadBytesResumable(imageRef, cover);

      uploadTask.on("state_changed", (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgressCover(progress);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      });

      await uploadTask;

      const url = await getDownloadURL(uploadTask.snapshot.ref);
      setData({ ...data, url: url });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleDelete = async (bannerId: string) => {
    try {
      await deleteBanner(bannerId);

      refetch();
    } catch (error) {
      refetch();
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createBanner(data);

      refetch();
      setData(initialDataBanner);
      setCoverBlob(null);
      setProgressCover(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      refetch();
      setData(initialDataBanner);
      setCoverBlob(null);
      setProgressCover(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      console.log("Error creating product:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="w-full bg-[#f5f5f5] p-4">
      <div className="flex flex-col gap-4 p-4 text-black bg-white rounded-lg">
        <h1 className="text-lg font-semibold">Pengaturan Banner</h1>
        <h2 className="font-semibold text-md">Input Banner Aktif</h2>
        <div className="grid items-center grid-cols-6 gap-4">
          {banners.map((item, index) => (
            <div key={index} className="relative">
              <Image
                src={item.url}
                width={500}
                height={500}
                alt={item.alt}
                className="object-cover w-full rounded-lg aspect-square"
              />
              {banners.length > 3 && (
                <div
                  onClick={() => handleDelete(item.id)}
                  className="absolute flex items-center justify-center p-2 bg-red-500 rounded-full cursor-pointer top-1 right-1"
                >
                  <GoTrash size={16} color="white" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-1/3 gap-4 mx-auto mt-2"
        >
          <h2 className="font-semibold text-md">Input Banner Aktif</h2>
          <div className="relative w-full p-2 border-2 border-[#f2f2f2] border-dashed rounded-lg aspect-square">
            {coverBlob ? (
              <Image
                src={URL.createObjectURL(coverBlob)}
                width={500}
                height={500}
                alt="placeholder"
                className="object-cover object-center w-full rounded-lg aspect-square"
              />
            ) : (
              <Image
                src="/assets/placeholder-banner.png"
                width={500}
                height={500}
                alt="placeholder"
                className="object-contain w-full rounded-lg aspect-square"
              />
            )}
            {coverBlob && (
              <div
                className="absolute radial-progress text-accent top-1/2 left-1/2"
                style={{
                  // @ts-ignore
                  "--value": Math.round(progresCover),
                  transform: "translate(-50%, -50%)",
                }}
                role="progressbar"
              >
                {`${Math.round(progresCover)}%`}
              </div>
            )}
          </div>
          <label className="w-full form-control">
            <div className="label">
              <span className="capitalize label-text">pilih banner</span>{" "}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleInputBanner}
              accept=".png, .jpeg, .jpg"
              className="w-full bg-transparent file-input file-input-bordered"
            />
            <div className="label">
              <span className="text-sm text-red-500">
                * Pastikan ukuran/resolusi gambar 1 : 1
              </span>
            </div>
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="capitalize label-text">link banner</span>
            </div>
            <input
              value={data.link}
              onChange={(e) => setData({ ...data, link: e.target.value })}
              type="text"
              placeholder="Misal: https://linkmu.com"
              className="w-full bg-transparent input input-bordered"
            />
          </label>
          <label className="w-full form-control">
            <div className="label">
              <span className="capitalize label-text">Deskrisi banner</span>
            </div>
            <input
              value={data.alt}
              onChange={(e) => setData({ ...data, alt: e.target.value })}
              type="text"
              placeholder="Deskripsi singkat mengenai banner"
              className="w-full bg-transparent input input-bordered"
            />
          </label>
          <div className="flex items-end justify-end gap-4">
            <button type="submit" className="btn btn-accent">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
