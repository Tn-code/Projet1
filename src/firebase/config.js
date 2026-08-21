import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence, connectFirestoreEmulator } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtnN3devPG1tewgvZcq34bv3WDFIrgX70",
  authDomain: "game-5s-460c3.firebaseapp.com",
  projectId: "game-5s-460c3",
  storageBucket: "game-5s-460c3.firebasestorage.app",
  messagingSenderId: "335911281123",
  appId: "1:335911281123:web:7b78d42d7c857d0c21c0d6",
  measurementId: "G-H53D7V6D1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence with better error handling
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('⚠️ Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('⚠️ The current browser does not support offline persistence.');
    }
  });

export const analytics = getAnalytics(app);
export const storage = getStorage(app);

export default app;
