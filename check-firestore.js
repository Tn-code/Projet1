import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, limit } from 'firebase/firestore';

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
const auth = getAuth(app);
const db = getFirestore(app);

async function checkFirestore() {
  console.log('🔍 Checking Firestore data...');
  
  try {
    // Login as admin
    const userCred = await signInWithEmailAndPassword(
      auth, 
      'houssine.trabelsi6@gmail.com', 
      'Plastipart$1'
    );
    console.log('✅ Admin logged in:', userCred.user.uid);
    
    // Check users collection
    console.log('\n📊 Checking users collection...');
    const usersRef = collection(db, 'users');
    const usersQuery = query(usersRef, limit(5));
    const usersSnapshot = await getDocs(usersQuery);
    console.log(`Found ${usersSnapshot.size} users`);
    usersSnapshot.forEach((doc) => {
      console.log('  -', doc.id, doc.data());
    });
    
    // Check assessments collection
    console.log('\n📋 Checking assessments collection...');
    const assessmentsRef = collection(db, 'assessments');
    const assessmentsQuery = query(assessmentsRef, limit(5));
    const assessmentsSnapshot = await getDocs(assessmentsQuery);
    console.log(`Found ${assessmentsSnapshot.size} assessments`);
    assessmentsSnapshot.forEach((doc) => {
      console.log('  -', doc.id, doc.data());
    });
    
    // Check if collections exist
    if (usersSnapshot.size === 0) {
      console.log('\n⚠️ No users found! You need to create some users.');
    }
    if (assessmentsSnapshot.size === 0) {
      console.log('\n⚠️ No assessments found! You need to create some assessments.');
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkFirestore();
