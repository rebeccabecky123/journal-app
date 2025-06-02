'use client';


import { signIn } from 'next-auth/react';


export default function Login() {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-6">Sign In</h1>

      <button
        onClick={() => signIn('google')}
        className="bg-white text-black px-6 py-3 rounded shadow hover:bg-gray-100"
      >
        Sign in with Google
      </button>
    </div>
  );
}
