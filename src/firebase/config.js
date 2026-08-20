import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBtnN3devPG1tewgvZcq34bv3WDFIrgX70",
  authDomain: "game-5s-460c3.firebaseapp.com",
  projectId: "game-5s-460c3",
  storageBucket: "game-5s-460c3.firebasestorage.app",
  messagingSenderId: "335911281123",
  appId: "1:335911281123:web:7b78d42d7c857d0c21c0d6",
  measurementId: "G-H53D7V6D1Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export default app;
