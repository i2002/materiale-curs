import NextAuth from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import { NextRequest } from "next/server";

function isAdminRoute(req: NextRequest) {
  const scope = req.nextUrl.searchParams.get("scope")
  const callbackUrl = req.nextUrl.searchParams.get("callbackUrl") ?? req.cookies.get("next-auth.callback-url")?.value;

  return scope === "admin" || callbackUrl?.startsWith("/admin") || callbackUrl?.startsWith(process.env.NEXTAUTH_URL + "/admin");
}

export async function GET(req: NextRequest, res: any) {
  const providers = isAdminRoute(req) ? authOptions.providers.slice(0, 1) : authOptions.providers.slice(1, 3);
  const options = {
    ...authOptions,
    providers
  };
  return NextAuth(req, res, options);
}

export async function POST(req: NextRequest, res: any) {
  return NextAuth(req, res, authOptions);
}
