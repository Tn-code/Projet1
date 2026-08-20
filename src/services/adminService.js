import { 
  collection, 
  query, 
  getDocs, 
  doc, 
  getDoc,
  where,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import { db } from "../firebase/config";

// Get all users
export const getAllUsers = async () => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, orderBy("score", "desc"));
    const querySnapshot = await getDocs(q);
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return { data: users, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get all assessments
export const getAllAssessments = async () => {
  try {
    const assessmentsRef = collection(db, "assessments");
    const q = query(assessmentsRef, orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const assessments = [];
    querySnapshot.forEach((doc) => {
      assessments.push({ id: doc.id, ...doc.data() });
    });
    return { data: assessments, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const userRef = doc(db, "users", userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return { data: { id: docSnap.id, ...docSnap.data() }, error: null };
    }
    return { data: null, error: "User not found" };
  } catch (error) {
    return { data: null, error: error.message };
  }
};

// Get user assessments
export const getUserAssessments = async (userId) => {
  try {
    const assessmentsRef = collection(db, "assessments");
    const q = query(
      assessmentsRef, 
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
    const assessments = [];
    querySnapshot.forEach((doc) => {
      assessments.push({ id: doc.id, ...doc.data() });
    });
    return { data: assessments, error: null };
  } catch (error) {
    return { data: [], error: error.message };
  }
};

// Get assessment statistics
export const getAssessmentStats = async () => {
  try {
    const assessmentsRef = collection(db, "assessments");
    const querySnapshot = await getDocs(assessmentsRef);
    let totalScore = 0;
    let count = 0;
    const principleScores = {
      seiri: { correct: 0, total: 0 },
      seiton: { correct: 0, total: 0 },
      seiso: { correct: 0, total: 0 },
      seiketsu: { correct: 0, total: 0 },
      shitsuke: { correct: 0, total: 0 }
    };
    
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      totalScore += data.score || 0;
      count++;
      
      // Aggregate principle scores
      if (data.results) {
        Object.keys(data.results).forEach(principle => {
          if (principleScores[principle]) {
            principleScores[principle].correct += data.results[principle].correct || 0;
            principleScores[principle].total += data.results[principle].total || 0;
          }
        });
      }
    });
    
    return {
      data: {
        totalAssessments: count,
        averageScore: count > 0 ? Math.round(totalScore / count) : 0,
        totalScore,
        principleScores
      },
      error: null
    };
  } catch (error) {
    return { data: null, error: error.message };
  }
};
