// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getStorage, ref } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAl1sJPW1IkVe8dh8_ySdGs3bpHK7Z7m-w",
  authDomain: "crb-portfolio-ecommerce1.firebaseapp.com",
  projectId: "crb-portfolio-ecommerce1",
  storageBucket: "crb-portfolio-ecommerce1.appspot.com",
  messagingSenderId: "828958858619",
  appId: "1:828958858619:web:8fac69e0ef9c2246e071de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);