"use client";
import { useBalance } from "@repo/store/useBalance";
import { useSession } from "next-auth/react";

export default function Balance() {
  const session = useSession();
  const balance = useBalance();

  if (session.data) {
    return (
      <div>
        <div>{balance}</div> <div>{JSON.stringify(session)}</div>
      </div>
    );
  }

  return <div>Not logged in</div>;
}
