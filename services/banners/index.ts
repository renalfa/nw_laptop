import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { firestore } from "@/services/firebase";

export const getAllBanners = async () => {
  try {
    const colRef = collection(firestore, "banners");
    const bannerSnapshot = await getDocs(colRef);

    const banners: any[] = [];

    bannerSnapshot.forEach((doc) => {
      banners.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return banners;
  } catch (error: any) {
    throw new Error("Error fetching documents: ", error.message);
  }
};

export const createBanner = async (payload: any) => {
  try {
    const colRef = collection(firestore, "banners");
    await addDoc(colRef, payload);

  } catch (error: any) {
    throw new Error("Error adding document: ", error.message);
  }
};

export const deleteBanner = async (bannerId: string) => {
  try {
    const bannerRef = doc(firestore, "banners", bannerId);
    await deleteDoc(bannerRef);

  } catch (error: any) {
    throw new Error("Error deleting document: ", error.message);
  }
};
