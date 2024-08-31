"use client";

import { useBalance } from "@repo/store/useBalance";
import { useSession } from "next-auth/react";

export default function Balance() {

  const session = useSession();

  const balance = useBalance();

  if(session.status == 'loading'){
    return <div>
      Loading...
    </div>
  }else if(session.status == 'unauthenticated'){
    return <div>
    Unauthenticated
  </div>
  }

  return <div>{balance}</div>;
}
