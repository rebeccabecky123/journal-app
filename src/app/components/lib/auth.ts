import { getAuth } from "firebase-admin/auth";
import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getApps } from "firebase-admin";

if (!getApps().length) {
  initializeApp({
    credential: applicationDefault(),
  });
}

export async function verifyToken(token: string) {
  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Token verification failed:", error);
    return null;
  }
}
