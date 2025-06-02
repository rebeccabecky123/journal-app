'use client';

import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-col gap-4 items-center justify-center px-6 flex-grow">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 mt-5">
            Your Personal Journal
          </h1>
          <p className="text-gray-500 text-2xl mb-8">
            A simple space to capture your thoughts, memories, and reflections.
          </p>
        </div>

        <div className="flex gap-6">
         
          <button
            className="bg-black text-white py-3 px-8 rounded hover:bg-gray-600"
            onClick={() => router.push('/auth/signin')}
          >
            Get Started
        </button>
        
          <button      className="bg-gray-300 rounded py-3 px-8 hover:bg-white text-black border border-black" 
          onClick={() => router.push('/dashboard')} >
               Learn More
          </button>
        </div>
      </main>

      <footer className="bg-gray-300 text-center py-4 text-gray-600">
        &copy; {new Date().getFullYear()} Personal Journal App
      </footer>
    </div>
  );
}
