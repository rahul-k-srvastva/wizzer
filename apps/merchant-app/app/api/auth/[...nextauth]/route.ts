import NextAuth from "next-auth/next";
import { AUTH_CONFIG } from "../../../lib/auth";


const handler = NextAuth(AUTH_CONFIG);

export const GET = handler;
export const POST = handler;
