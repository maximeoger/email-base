import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import JWT from "jsonwebtoken";

//@ts-ignore
export const { auth, handlers } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    //@ts-ignore
    async jwt ({ token, account }) {

      if (account?.access_token) {
        token.accessToken = account.access_token;
      }

      return token

    },
    //@ts-ignore
    async session({ session, token }) {

      const { accessToken, ...rest } = token;

      session.accessToken = accessToken;

      session.user.jwt = JWT.sign(
        { data: rest },
        process.env.CUSTOM_JWT_SECRET as unknown as string,
      );

      return session;
    },
  },

  events: {
    //@ts-ignore
    async signOut({ token }) {
      const revokeUrl = `https://accounts.google.com/o/oauth2/revoke?token=${token.accessToken as string}`;
      fetch(revokeUrl).catch(err => console.error("Error on google OAuth revocation", err))
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
  
  Session: {
    strategy: "jwt",
  },
  
  debug: process.env.NODE_ENV === "development",
});
