import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { AUTH_CONFIG } from "../../lib/auth";

export const GET = async () => {
  const session = await getServerSession(AUTH_CONFIG);

  if (session?.user) {
    return NextResponse.json({
      user: session.user,
    });
  }

  return NextResponse.json(
    {
      message: "Not logged in",
    },
    { status: 403 }
  );
};
