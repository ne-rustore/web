import type { DefaultSession, NextAuthConfig } from 'next-auth';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      accessToken?: string;
    } & DefaultSession['user'];
  }

  interface User {
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      id: 'vk',
      name: 'VK ID',
      credentials: {
        code: { label: 'Code', type: 'text' },
        device_id: { label: 'Device ID', type: 'text' }
      },
      async authorize(credentials) {
        const { code, device_id } = credentials as {
          code: string;
          device_id: string;
        };

        if (!code || !device_id) return null;

        try {
          const res = await fetch(
            'https://api.vk.com/method/auth.exchangeCode',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: new URLSearchParams({
                code,
                device_id,
                client_id: process.env.NEXT_PUBLIC_VK_APP_ID!
              })
            }
          );

          const data = await res.json();

          if (data.error) {
            console.error('[VK AUTH] exchangeCode error:', data.error);
            return null;
          }

          const { user_id, access_token, email } = data.response;

          const userRes = await fetch(
            `https://api.vk.com/method/users.get?user_ids=${user_id}&fields=photo_100&access_token=${access_token}&v=5.199`
          );
          const userData = await userRes.json();
          const vkUser = userData.response[0];

          return {
            id: user_id.toString(),
            name: `${vkUser.first_name} ${vkUser.last_name}`,
            email: email || `${user_id}@vk.com`,
            image: vkUser.photo_100,
            accessToken: access_token
          };
        } catch (err) {
          console.error('[VK AUTH] authorize error:', err);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

const { handlers: authHandlers, auth, signIn, signOut } = NextAuth(authConfig);

export const GET = authHandlers.GET;
export const POST = authHandlers.POST;

export { auth, signIn, signOut };
