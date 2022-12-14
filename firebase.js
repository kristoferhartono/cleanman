// Import the functions you need from the SDKs you need
import { firebase } from "@react-native-firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database"
import { getStorage, ref } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDTm9zBN3XIADhbbI2dwfqJbWZqeZ8wED4",
  authDomain: "clean-hero-1b85f.firebaseapp.com",
  projectId: "clean-hero-1b85f",
  storageBucket: "clean-hero-1b85f.appspot.com",
  messagingSenderId: "834206452001",
  appId: "1:834206452001:web:995a3bbdd1ba9f51579660",
  measurementId: "G-YGRF0BZ1G7",
  databaseURL: "https://clean-hero-1b85f-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getDatabase(app);

export const storage = getStorage(app);