import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyB9VOma-LhF8osjEbqaxOvuxfjmmE7y3T0',
  authDomain: 'my-journal-20e65.firebaseapp.com',
  projectId: 'my-journal-20e65',
  storageBucket: 'my-journal-20e65.firebasestorage.app',
  messagingSenderId: '471284717539',
  appId: '1:471284717539:web:177b14de7a1ecc6bc4f2d6',
  measurementId: 'G-W6MY253ZM5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Analytics (only works in the browser)
if (typeof window !== 'undefined') {
  getAnalytics(app);
}

// ✅ Setup Firebase Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
