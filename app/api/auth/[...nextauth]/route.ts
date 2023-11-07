import { db } from '@/lib/db';
import NextAuth, { AuthOptions, NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await db.user.findFirst({
        where: {
          email: session.user?.email as string,
        },
      });

      session.user.id = sessionUser?.id as string;

      return session;
    },
    //@ts-ignore
    async signIn({ account, profile, user, credentials }) {
      try {
        // check if user already exists
        const userExists = await db.user.findFirst({
          where: {
            email: profile?.email,
          },
        });

        if (!userExists) {
          const newUser = await db.user.create({
            data: {
              email: profile?.email!,
              name: profile?.name,
              //@ts-ignore
              image: profile?.picture,
            },
          });
        }

        return true;
      } catch (error) {
        console.log('Error checking if user exists: ', error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions as NextAuthOptions);

export { handler as GET, handler as POST };
