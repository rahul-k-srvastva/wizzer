"use server"

import { db } from "@repo/db";
import { getServerSession } from "next-auth";
import { AUTH_CONFIG, SessionWithIdType } from "../auth";
import dns from "dns";

export async function onRampTransaction(amount: number, provider: string) {
  const session = (await getServerSession(AUTH_CONFIG)) as SessionWithIdType;

  if (!session?.user || !session.user.id) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  try {
    const tranToken = new Date().getTime().toString();

    await db.onRampTransaction.create({
      data: {
        amount: amount * 100,
        provider,
        startTime: new Date(),
        status: "Processing",
        token: tranToken,
        userId: Number(session.user.id),
      },
    });

    //code to stub successful transaction start

    // setTimeout(async () => {
    //   const resp = await fetch(`http://localhost:3002/bank1_webhook`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       token: tranToken,
    //       userId: session.user.id,
    //       amount: amount * 100,
    //       status: "Success",
    //     }),
    //   });

    //   const jsonResp = await resp.json();

    //   console.log("bank_webhook_handler_response : ", resp.status, jsonResp);
    // }, 5000);

    //code to stub successful transaction finish

    return {
      status: 201,
      message: "Updated in DB",
    };
  } catch (error) {
    console.log(error);
  }

  return {
    status: 500,
    message: "Technical Error",
  };
}


