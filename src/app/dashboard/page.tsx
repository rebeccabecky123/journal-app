import React from 'react';

const PersonalJournalLanding = () => {
  return (
    <div className="min-h-screen bg-gray-50">
     
      <header className="bg-white border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="text-2xl font-semibold text-gray-800">
              Personal Journal
            </div>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Sign In
            </button>
          </div>
        </nav>
      </header>

      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            About Personal Journal
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A private space for your thoughts, memories, and reflections.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
           
            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Write
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Capture your thoughts, ideas, and memories in a clean interface
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Reflect
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Review past entries to see how you have grown and changed over time
              </p>
            </div>

            <div className="bg-white p-10 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Private
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Your entries are private and secure, accessible only to you
              </p>
            </div>
          </div>
        </div>
      </section>

     
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <button className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-xl">
            Start Journaling
          </button>
        </div>
      </section>

     
      <footer className="bg-gray-50 border-t border-gray-200 py-10">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <p className="text-gray-400 text-sm">
            © 2025 Personal Journal App
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PersonalJournalLanding;