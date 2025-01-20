import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import JWT from "jsonwebtoken";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      session.user.jwt = JWT.sign(
        { data: token },
        process.env.CUSTOM_JWT_SECRET as unknown as string,
      );
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  Session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};

export const { auth, handlers } = NextAuth(authOptions);
