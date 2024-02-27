import { LoginParams, login } from '@/service/auth';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 3 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Masukkan email anda',
        },
        password: {
          label: 'Password',
          placeholder: 'Masukkan password anda',
          type: 'password',
        },
      },
      async authorize(credentials) {
        const { data } = await login(credentials as LoginParams);
        if (data) {
          return data.token;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === 'credentials') {
        token.accessToken = user;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        if ('accessToken' in token) {
          session.user.accessToken = token.accessToken as string;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default authOptions;
