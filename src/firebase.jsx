import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-SSKlcBneHiC9QgM9pMdrV7UI2FvvSuE",
  authDomain: "react-ecommerce-app-e1fa2.firebaseapp.com",
  projectId: "react-ecommerce-app-e1fa2",
  storageBucket: "react-ecommerce-app-e1fa2.appspot.com",
  messagingSenderId: "1037696212469",
  appId: "1:1037696212469:web:2c27142f7e8fc34b1bd4bc",
  measurementId: "G-WYR80B32LQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app);
