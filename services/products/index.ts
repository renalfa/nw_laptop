import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "@/services/firebase";

export const getAllProducts = async () => {
  try {
    const colRef = collection(firestore, "products");
    const productsSnapshot = await getDocs(colRef);

    const products: any[] = [];

    productsSnapshot.forEach((doc) => {
      products.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    return products;
  } catch (error: any) {
    throw new Error("Error fetching documents: ", error.message);
  }
};

export const createProduct = async (payload: any) => {
  try {
    const colRef = collection(firestore, "products");
    const docRef = await addDoc(colRef, payload);

    await updateDoc(doc(firestore, "products", docRef.id), {
      productId: docRef.id,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error: any) {
    throw new Error("Error adding document: ", error.message);
  }
};

export const editProduct = async (productId: string, updatedData: any) => {
  try {
    const productRef = doc(firestore, "products", productId);
    await updateDoc(productRef, updatedData);

    console.log("Product updated successfully!");
  } catch (error: any) {
    throw new Error("Error updating document: ", error.message);
  }
};

export const deleteProduct = async (productId: string) => {
  try {
    const productRef = doc(firestore, "products", productId);
    await deleteDoc(productRef);

    console.log("Product deleted successfully!");
  } catch (error: any) {
    throw new Error("Error adding document: ", error.message);
  }
};
