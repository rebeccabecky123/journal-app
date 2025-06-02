// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { authOptions } from 'components/lib/authOptions';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
