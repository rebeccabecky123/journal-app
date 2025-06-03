'use client'

import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import Head from 'next/head'
import { auth, provider } from '@/lib/auth';




 
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth'

interface JournalEntry {
  id: number
  title: string
  date: string
  content: string
}

interface NewEntryForm {
  title: string
  content: string
}

export default function JournalApp() {
  const [user, setUser] = useState<User | null>(null)
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: 1,
      title: 'New goals',
      date: 'May 25, 2025 at 12:52 AM',
      content:
        "I've been thinking about telling you guyz about what doctores they told me. that i must eat much food because iam loosing the weight so please take care of me."
    },
    {
      id: 2,
      title: 'My week',
      date: 'May 20, 2025 at 12:52 AM',
      content:
        'This week has been quite productive. I watched the movie image that i foreget to eat because the movie was so sweet OMG.'
    },
    {
      id: 3,
      title: 'The journaling',
      date: 'May 23, 2025 at 12:52 AM',
      content:
        'Today I came here to telling you that GOD is with us whatever happen we will win this games anyway GOD bless you my sister.'
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newEntry, setNewEntry] = useState<NewEntryForm>({
    title: '',
    content: ''
  })

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
    })
    return () => unsubscribe()
  }, [])

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (err) {
      console.error('Sign-in error', err)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (err) {
      console.error('Sign-out error', err)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const now = new Date()
    const dateStr =
      now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }) +
      ' at ' +
      now.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })

    const entry: JournalEntry = {
      id: Date.now(),
      title: newEntry.title,
      content: newEntry.content,
      date: dateStr
    }

    setEntries([entry, ...entries])
    setNewEntry({ title: '', content: '' })
    setIsModalOpen(false)
  }

  const deleteEntry = (id: number) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      setEntries(entries.filter((entry) => entry.id !== id))
    }
  }

  return (
    <>
      <Head>
        <title>Personal Journal</title>
        <meta name="description" content="Personal Journal Application" />
      </Head>

      <div className="min-h-screen bg-gray-100">
  
        <header className="bg-white border-b border-gray-200 px-10 py-5">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              Personal Journal
            </h1>
            {user ? (
              <button
                onClick={handleSignOut}
                className="text-gray-500 text-sm px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={handleSignIn}
                className="text-gray-500 text-sm px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
              >
                Sign In with Google
              </button>
            )}
          </div>
        </header>

        
        <main className="max-w-6xl mx-auto px-10 py-10">
          {user ? (
            <>
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-4xl font-bold text-gray-800">
                  My Journal
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-gray-800 text-white px-5 py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
                >
                  <span className="text-base font-bold">+</span>
                  New Entry
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entries.map((entry) => (
                  <div
                    key={entry.id}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {entry.title}
                    </h3>
                    <div className="text-xs text-gray-500 mb-4">
                      {entry.date}
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed mb-8">
                      {entry.content}
                    </div>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="absolute bottom-5 right-5 text-gray-500 text-xl hover:text-red-500 hover:bg-gray-100 px-2 py-1 rounded transition-colors flex items-center gap-1"
                    >
                      <span>🗑</span>
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-4">
                Please sign in to view your journal.
              </p>
              <button
                onClick={handleSignIn}
                className="bg-gray-800 text-white px-5 py-3 rounded-md hover:bg-gray-700"
              >
                Sign In with Google
              </button>
            </div>
          )}
        </main>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-800 mb-5">
                New Journal Entry
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newEntry.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewEntry({ ...newEntry, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={newEntry.content}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                      setNewEntry({ ...newEntry, content: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false)
                      setNewEntry({ title: '', content: '' })
                    }}
                    className="px-5 py-2 bg-gray-600 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gray-800 text-white text-sm rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  )
}