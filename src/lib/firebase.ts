// src/lib/firebase.ts (Client-side Firebase config)

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';  

const firebaseConfig = {
  apiKey: 'AIzaSyB9VOma-LhF8osjEbqaxOvuxfjmmE7y3T0',
  authDomain: 'my-journal-20e65.firebaseapp.com',
  projectId: 'my-journal-20e65',
  storageBucket: 'my-journal-20e65.appspot.com',
  messagingSenderId: '471284717539',
  appId: '1:471284717539:web:177b14de7a1ecc6bc4f2d6',
  measurementId: 'G-W6MY253ZM5',
};

const app = initializeApp(firebaseConfig);

if (typeof window !== 'undefined') {
  getAnalytics(app);
}

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

