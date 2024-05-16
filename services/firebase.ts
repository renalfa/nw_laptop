// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBPrnhS4FZ2fSBrUCLUfFslOyNIYBo85zU",
  authDomain: "mock-test-b4d31.firebaseapp.com",
  projectId: "mock-test-b4d31",
  storageBucket: "mock-test-b4d31.appspot.com",
  messagingSenderId: "140220065993",
  appId: "1:140220065993:web:be814c69b7ca3d1e718518"
};

const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);