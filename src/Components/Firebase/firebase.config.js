// import { getAuth } from "firebase/auth";
// import { getApps , getApp , initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_API_KEY,
//     authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_PROJECT_ID,
//     storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//     messagingSenderId: import.meta.env.VITE_MESSAGING_ID,
//     appId: import.meta.env.VITE_APP_ID
//   };

// export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
// export const auth = getAuth(app)
// export const db = getFirestore(app)

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDR5yJafz-N4F5M3Hyco7qbCOrZ2ONv9XM",
  authDomain: "codepen-284e3.firebaseapp.com",
  projectId: "codepen-284e3",
  storageBucket: "codepen-284e3.appspot.com",
  messagingSenderId: "998717741226",
  appId: "1:998717741226:web:df10aa2cf12f33fd6898d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
