'use client';

import { useEffect, useState } from 'react';
import { auth } from 'firebase/auth';

export default function EntryList() {
  const [entries, setEntries] = useState<any[]>([]);

  const fetchEntries = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const res = await fetch('/api/entries', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setEntries(data);
  };

  const deleteEntry = async (id: string) => {
    const user = auth.currentUser;
    if (!user) return;

    const token = await user.getIdToken();

    const res = await fetch(`/api/entries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return (
    <div className="space-y-4">
      {entries.map((entry) => (
        <div key={entry.id} className="border p-4 rounded">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">{entry.title}</h2>
            <button onClick={() => deleteEntry(entry.id)} className="text-red-500">
              Delete
            </button>
          </div>
          <p>{entry.body}</p>
          <p className="text-sm text-gray-500">{new Date(entry.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
