
import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDB } from '@/lib/firebaseAdmin';

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = req.headers.get('authorization')?.split('Bearer ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    const docRef = adminDB.collection('entries').doc(params.id);
    const doc = await docRef.get();

    if (!doc.exists || doc.data()?.uid !== decoded.uid) {
      return NextResponse.json({ error: 'Not found or unauthorized' }, { status: 403 });
    }

    await docRef.delete();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete entry:', error); 
    return NextResponse.json({ error: 'Failed to delete entry' }, { status: 500 });
  }
}
