// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
import { getStorage } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQzDL2Pm0cIr_xA0EqcHRRUKwHx5_hons",
  authDomain: "examproject-6d241.firebaseapp.com",
  projectId: "examproject-6d241",
  storageBucket: "examproject-6d241.appspot.com",
  messagingSenderId: "529926455232",
  appId: "1:529926455232:web:32af0f01a5594093959225",
  measurementId: "G-8WFT8ZDCY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);

export {auth, db, storage }
