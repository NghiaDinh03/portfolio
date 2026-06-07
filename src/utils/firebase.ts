import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDn1RUg6Tsf8jzFT3YZE5mjC5b1HiZPJmA",
  authDomain: "nghiadinh-portfolio.firebaseapp.com",
  databaseURL: "https://nghiadinh-portfolio-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nghiadinh-portfolio",
  storageBucket: "nghiadinh-portfolio.firebasestorage.app",
  messagingSenderId: "635627805151",
  appId: "1:635627805151:web:20b4ea64ce24651d220c6a",
  measurementId: "G-BEQ3PPR11T"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getDatabase(app);
