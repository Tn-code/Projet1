import { 
  doc, setDoc, getDoc, updateDoc, arrayUnion,
  collection, query, where, getDocs, serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase/config";

export const saveUserProgress = async (userId, data) => {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, {
      ...data,
      lastUpdated: serverTimestamp()
    }, { merge: true });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUserProgress = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { data: docSnap.data(), error: null };
    } else {
      return { data: null, error: "User not found" };
    }
  } catch (error) {
    return { data: null, error: error.message };
  }
};

export const updateUserScore = async (userId, newScore) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      score: newScore,
      lastUpdated: serverTimestamp()
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const addCompletedPrinciple = async (userId, principleId) => {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      completedPrinciples: arrayUnion(principleId),
      lastUpdated: serverTimestamp()
    });
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getLeaderboard = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef);
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    users.sort((a, b) => (b.score || 0) - (a.score || 0));
    return { data: users, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};
