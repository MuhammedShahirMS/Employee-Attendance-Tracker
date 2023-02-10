import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
  getFirestore // getDocs
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDnVizcNanR_4rPOMtW4w2mHv2IYOU3uOg",
  authDomain: "url-users.firebaseapp.com",
  projectId: "url-users",
  storageBucket: "url-users.appspot.com",
  messagingSenderId: "81974865453",
  appId: "1:81974865453:web:24b0722fdefb67002a92a4",
  measurementId: "G-4YECMM0792"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore();

export {auth, db };