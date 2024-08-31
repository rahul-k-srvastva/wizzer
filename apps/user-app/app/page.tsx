import { getServerSession } from "next-auth";
import { AUTH_CONFIG } from "./lib/auth";
import {redirect} from "next/navigation"

export default async function Home() {

  const session = await getServerSession(AUTH_CONFIG);

  if(session?.user){
    redirect("/dashboard")
  }

  redirect("/api/auth/signin");
}
