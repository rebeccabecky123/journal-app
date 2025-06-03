import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getAuth, DecodedIdToken } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Helper to ensure env variables are defined or throw error
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required env var: ${name}`);
  }
  return value;
}

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: getEnvVar('FIREBASE_PROJECT_ID'),
      clientEmail: getEnvVar('FIREBASE_CLIENT_EMAIL'),
      privateKey: getEnvVar('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
    }),
  });
}

export const adminAuth = getAuth();
export const adminDB = getFirestore();

type RequestWithAuth = {
  headers: {
    authorization?: string;
  };
};

export async function verifyUser(
  req: RequestWithAuth
): Promise<DecodedIdToken | null> {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '').trim();

    if (!token) {
      return null;
    }

    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    return null;
  }
}
