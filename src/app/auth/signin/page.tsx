'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  signInWithPopup,
  
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase'; 

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleGoogleSignIn = async () => {
    try {
      googleProvider.setCustomParameters({
        prompt: 'select_account',
      });
      await signInWithPopup(auth, googleProvider);
      router.push('/pages');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      console.error('Google Sign-in failed:', errorMessage);
      setError('Failed to sign in with Google.');
    }
  };



  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h2>
        <p className="text-gray-600 mb-6">
          Sign in with your Google account to access your journal
        </p>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}