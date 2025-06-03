import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/lib/firebase'; 
import { verifyUser } from '@/lib/firebaseAdmin';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = await verifyUser(req);
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(400).json({ error: 'Title and body are required' });
    }
    try {
      const docRef = await addDoc(collection(db, 'entries'), {
        userId: user.uid,
        title,
        body,
        createdAt: new Date().toISOString(),
      });
      return res.status(201).json({ id: docRef.id });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create entry', details: error });
    }
  }

  if (req.method === 'GET') {
    try {
      const q = query(collection(db, 'entries'), where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return res.status(200).json(entries);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch entries', details: error });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
