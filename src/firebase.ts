import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyCSEtCRoCqJ253SwNENdbMO5xUOT29P_Jw',
  authDomain: 'daily-puzzle-game-36fd4.firebaseapp.com',
  projectId: 'daily-puzzle-game-36fd4',
  storageBucket: 'daily-puzzle-game-36fd4.firebasestorage.app',
  messagingSenderId: '126092422807',
  appId: '1:126092422807:web:b92c0a338cd22cb50943d2',
  measurementId: 'G-WKQCHK9H0X',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth
export const auth = getAuth(app);
