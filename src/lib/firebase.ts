import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHCRB6kCdVxjqpF5FSfDGZemIfgD79DjE",
  authDomain: "next-blog-auth-4a784.firebaseapp.com",
  projectId: "next-blog-auth-4a784",
  storageBucket: "next-blog-auth-4a784.firebasestorage.app",
  messagingSenderId: "432428844444",
  appId: "1:432428844444:web:5cd2857b30f55392163459",
  measurementId: "G-10DRCJD9XV"
};

const app = initializeApp(firebaseConfig);

let analytics;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;




