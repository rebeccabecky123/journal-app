'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {signInWithPopup, signInWithEmailAndPassword,}
 from 'firebase/auth';
import { auth, googleProvider } from '../../../../components/lib/firebase'; 

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleGoogleSignIn = async () => {
    try {
      
      googleProvider.setCustomParameters({
        prompt: 'select_account',
      });
      await signInWithPopup(auth, googleProvider);
      router.push('/pages');
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      setError('Failed to sign in with Google.');
    }
  };
  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/pages');
    } catch (error) {
      console.error('Email/Password Sign-in failed:', error);
      setError('Invalid email or password.');
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Sign in</h2>
        <p className="text-gray-600 mb-6">
          Enter your email and password to access your journal
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.gemail.com"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <a href="#" className="text-gray-500 hover:underline text-sm">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-gray-800"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700"
          >
            Sign up
          </button>
        </form>
        <div className="mt-6 space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full border border-gray-300 text-gray-800 py-3 rounded-md hover:bg-gray-100"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}