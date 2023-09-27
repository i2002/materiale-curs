import { getServerSession, Session, type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from 'next-auth/providers/credentials'
import AzureADProvider from "next-auth/providers/azure-ad";
import EmailProvider from "next-auth/providers/email";
import prisma from "@/app/_lib/prisma";
import { checkSignIn, signInAllowed } from "./usersController";
import { Role } from "@/types.d";


// NextAuth options
const providers = [
  Credentials({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text"},
      password: { label: "Password", type: "password"}
    },
    async authorize(credentials) {
      if (credentials) {
        return await checkSignIn(credentials);
      }

      return null;
    }
  }),

  AzureADProvider({
    name: "Microsoft",
    style: {
      bg: "#ffffff",
      bgDark: "#000000",
      logo: "https://learn.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.png",
      logoDark: "https://learn.microsoft.com/en-us/azure/active-directory/develop/media/howto-add-branding-in-apps/ms-symbollockup_mssymbol_19.png",
      text: "#000000",
      textDark: "#ffffff"
    },
    clientId: process.env.AZURE_AD_CLIENT_ID as string,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
    tenantId: process.env.AZURE_AD_TENANT_ID as string,
    allowDangerousEmailAccountLinking: true,
  
    profile(profile, tokens) {
      return {
        id: profile.sub,
        name: profile.name ?? profile.preferred_username,
        email: profile.email ?? profile.preferred_username,
        image: profile.picture,
        role: Role.student
      }
    },
  }),

  EmailProvider({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD
      }
    },
    from: process.env.EMAIL_FROM,
    // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
  }),
]

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers,
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      return signInAllowed(user);
    },

    jwt({ token, user }) {
      if(user) {
        token.role = user.role;
      }

      return token;
    },

    session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
      }

      return session;
    }
  },
  // logger: {
  //   error(code, metadata) {
  //     console.log("err", code, metadata)
  //   },
  //   warn(code) {
  //     console.log("warn", code)
  //   },
  //   debug(code, metadata) {
  //     console.log("debug", code, metadata)
  //   }
  // },
  // debug: true
}

// Helper functions
/**
 * Get current session if it exists.
 */
export function getUserSession() {
  return getServerSession(authOptions) as Promise<Session | null>;
}
