"use client";

import { storage } from "@/services/firebase";
import { createProduct } from "@/services/products";
import {
  initialDataProduct,
  optionBrand,
  optionOS,
  optionRam,
  optionResolution,
  optionScreen,
  optionStorage,
  optionTypeStorage,
} from "@/utils/data";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GoTrash } from "react-icons/go";

export default function Home() {
  const router = useRouter();
  const [data, setData] = useState<any>(initialDataProduct);
  const [coverBlob, setCoverBlob] = useState<Blob | null>(null);
  const [progresCover, setProgressCover] = useState<number>(0);

  const [files, setFiles] = useState<File[] | []>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);

  const handleChange = (e: any) => {
    const fileList = e.target.files;
    if (fileList) {
      const arr = Array.from(fileList);
      setFiles((prevFiles: any) => [...prevFiles, ...arr]);

      setUploadProgress((prevProgress) => [
        ...prevProgress,
        ...Array(arr.length).fill(0),
      ]);
    }
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });

    setUploadProgress((prevProgress) => {
      const updatedProgress = [...prevProgress];
      updatedProgress.splice(index, 1);
      return updatedProgress;
    });

    setData((prevData: any) => {
      const updateImages = [...prevData.images];
      updateImages.splice(index, 1);
      return {
        ...data,
        images: updateImages,
      };
    });

    setUploadedCount(uploadedCount - 1);
  };

  const handleInputMulti = useCallback(async () => {
    setUploading(true);
    for (let i = uploadedCount; i < files.length; i++) {
      try {
        const imageRef = ref(storage, `product/${files[i].name}`);

        const uploadTask = uploadBytesResumable(imageRef, files[i]);

        uploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploadProgress((prevProgress) => {
            const updatedProgress = [...prevProgress];
            updatedProgress[i] = progress;
            return updatedProgress;
          });
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

        setUploadedCount((prevCount) => prevCount + 1);
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        setData((prevData: any) => ({
          ...data,
          images: [...prevData.images, url],
        }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    setUploading(false);
  }, [files, uploadedCount]);

  const handleInputCover = async (e: any) => {
    const cover = e.target.files[0];

    setCoverBlob(cover);

    try {
      const imageRef = ref(storage, `product/${cover.name}`);

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
      setData({ ...data, cover: url });
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createProduct(data);

      router.push("/admin");
    } catch (error) {
      console.log("Error creating product:", error);
    }
  };

  useEffect(() => {
    if (files.length > 0 && !uploading) {
      handleInputMulti();
    }
  }, [files, uploading, handleInputMulti]);

  return (
    <div className="w-full bg-[#f5f5f5] p-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-between h-full p-4 text-black bg-white rounded-lg"
      >
        <div>
          <h1 className="text-lg font-semibold">Tambah Produk</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="w-full mt-2">
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
                    src="/assets/placeholder.png"
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
                  <span className="capitalize label-text">
                    pilih cover produk
                  </span>
                </div>
                <input
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleInputCover}
                  className="w-full bg-transparent file-input file-input-bordered"
                />
              </label>
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-2 gap-x-4">
                <label className="w-full form-control">
                  <div className="label">
                    <span className="capitalize label-text">nama produk</span>
                  </div>
                  <input
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    type="text"
                    placeholder="Macbook Air M2"
                    className="w-full bg-transparent input input-bordered"
                  />
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">
                      Pilih brand dari produkmu
                    </span>
                  </div>
                  <select
                    onChange={(e) =>
                      setData({ ...data, brand: e.target.value })
                    }
                    className="capitalize bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionBrand.map((item, index) => (
                      <option key={index} value={item} className="">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="capitalize label-text">
                      Prosesor produk
                    </span>
                  </div>
                  <input
                    value={data.processor}
                    onChange={(e) =>
                      setData({ ...data, processor: e.target.value })
                    }
                    type="text"
                    placeholder="Apple chip M2"
                    className="w-full bg-transparent input input-bordered"
                  />
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="capitalize label-text">harga</span>
                  </div>
                  <input
                    value={data.price}
                    onChange={(e) =>
                      setData({ ...data, price: e.target.value })
                    }
                    type="text"
                    placeholder="Rp 1.000.000"
                    className="w-full bg-transparent input input-bordered"
                  />
                </label>
                <label className="col-span-2 form-control">
                  <div className="label">
                    <span className="capitalize label-text">
                      deskripsi produk
                    </span>
                  </div>
                  <textarea
                    value={data.description}
                    onChange={(e) =>
                      setData({ ...data, description: e.target.value })
                    }
                    className="h-24 bg-transparent textarea textarea-bordered"
                    placeholder="Deskripsi dari produkmu ..."
                  ></textarea>
                </label>
              </div>
              <div className="grid items-center grid-cols-3 gap-x-4">
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">
                      Pilih type storage dari produkmu
                    </span>
                  </div>
                  <select
                    onChange={(e) =>
                      setData({ ...data, typeStorage: e.target.value })
                    }
                    className="bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionTypeStorage.map((item, index) => (
                      <option key={index} value={item} className="capitalize ">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">
                      Pilih storage dari produkmu
                    </span>
                  </div>
                  <select
                    onChange={(e) =>
                      setData({ ...data, storage: e.target.value })
                    }
                    className="bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionStorage.map((item, index) => (
                      <option key={index} value={item} className="capitalize ">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">Pilih ram dari produkmu</span>
                  </div>
                  <select
                    onChange={(e) => setData({ ...data, ram: e.target.value })}
                    className="bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionRam.map((item, index) => (
                      <option key={index} value={item} className="capitalize ">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">
                      Pilih screen dari produkmu
                    </span>
                  </div>
                  <select
                    onChange={(e) =>
                      setData({ ...data, screen: e.target.value })
                    }
                    className="bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionScreen.map((item, index) => (
                      <option key={index} value={item} className="capitalize ">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">
                      Pilih resolusi dari produkmu
                    </span>
                  </div>
                  <select
                    onChange={(e) =>
                      setData({ ...data, resolution: e.target.value })
                    }
                    className="bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionResolution.map((item, index) => (
                      <option key={index} value={item} className="capitalize ">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="w-full form-control">
                  <div className="label">
                    <span className="label-text">
                      Pilih Sistem Operasi dari produkmu
                    </span>
                  </div>
                  <select
                    onChange={(e) => setData({ ...data, OS: e.target.value })}
                    className="bg-transparent select select-bordered"
                  >
                    <option disabled selected>
                      Pilih salah satu ya!
                    </option>
                    {optionOS.map((item, index) => (
                      <option key={index} value={item} className="capitalize ">
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label className="w-full form-control">
                <div className="label">
                  <span className="capitalize label-text">
                    pilih gambar produk
                  </span>
                </div>
                <input
                  multiple
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={handleChange}
                  className="w-full bg-transparent file-input file-input-bordered"
                />
              </label>
              <div className="grid w-full grid-cols-5 gap-2 mt-4">
                {files.map((item, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={URL.createObjectURL(item)}
                      width={100}
                      height={100}
                      alt={item.name}
                      className="object-cover w-full rounded-lg aspect-square"
                    />
                    <div
                      className="absolute z-10 top-1/2 left-1/2 radial-progress text-accent"
                      style={{
                        // @ts-ignore
                        "--value": Math.round(uploadProgress[index]),
                        transform: "translate(-45%, -45%)",
                      }}
                      role="progressbar"
                    >
                      {`${Math.round(uploadProgress[index])}%`}
                    </div>
                    <div
                      onClick={() => handleDelete(index)}
                      className="absolute flex items-center justify-center p-2 bg-red-500 rounded-full cursor-pointer top-1 right-1"
                    >
                      <GoTrash size={16} color="white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-end gap-4">
          <Link href={"/admin"} className="text-white btn btn-neutral">
            Batal
          </Link>
          <button type="submit" className="btn btn-accent">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
