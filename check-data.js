import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

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

async function checkData() {
  console.log('🔍 Checking Firestore data...');
  
  try {
    // Login as admin
    const userCred = await signInWithEmailAndPassword(
      auth, 
      'houssine.trabelsi6@gmail.com', 
      'Plastipart$1'
    );
    console.log('✅ Admin logged in\n');
    
    // Check users
    console.log('📊 Users:');
    const usersRef = collection(db, 'users');
    const usersSnapshot = await getDocs(usersRef);
    if (usersSnapshot.empty) {
      console.log('  ⚠️ No users found');
    } else {
      usersSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${data.displayName || data.email} (${data.matricule || 'N/A'}) - Score: ${data.score || 0}`);
      });
    }
    
    // Check assessments
    console.log('\n📋 Assessments:');
    const assessmentsRef = collection(db, 'assessments');
    const q = query(assessmentsRef, orderBy('createdAt', 'desc'), limit(10));
    const assessmentsSnapshot = await getDocs(q);
    if (assessmentsSnapshot.empty) {
      console.log('  ⚠️ No assessments found');
    } else {
      assessmentsSnapshot.forEach(doc => {
        const data = doc.data();
        console.log(`  - ${data.prenom} ${data.nom} (${data.matricule}) - Score: ${data.score}/15 - ${new Date(data.createdAt).toLocaleDateString()}`);
      });
    }
    
    console.log('\n📊 Summary:');
    console.log(`  Users: ${usersSnapshot.size}`);
    console.log(`  Assessments: ${assessmentsSnapshot.size}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkData();
