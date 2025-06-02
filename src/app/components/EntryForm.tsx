'use client';

import { useState } from 'react';
import {aoth}


export default function EntryForm({ onAdd }: { onAdd: () => void }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const res = await fetch('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, body }),
    });

    setLoading(false);
    if (res.ok) {
      setTitle('');
      setBody('');
      onAdd();
    } else {
      alert('Error adding entry.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4">
      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Write your thoughts..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Add Entry'}
      </button>
    </form>
  );
}
