"use server";

import { db } from "@repo/db";
import { getServerSession } from "next-auth";
import { AUTH_CONFIG, SessionWithIdType } from "../auth";

interface P2PReturnMSG {
  status: number;
  message: string;
}

export async function P2PTransferAction(
  amount: number,
  to: string
): Promise<P2PReturnMSG> {
  const session = (await getServerSession(AUTH_CONFIG)) as SessionWithIdType;

  if (!session.user || !session.user.id) {
    return {
      status: 401,
      message: "Unauhorized",
    };
  }

  try {
    await db.$transaction(async (tx) => {
      const toUser = await tx.user.findFirst({
        where: {
          number : to
        },
      });

      if (!toUser) throw new Error("501");

      const balance : [{ amount : number}] =
        await tx.$queryRaw`SELECT "amount" from "Balance" where "userId" = ${Number(session.user.id)} FOR UPDATE`;

        console.log("Balance : " , Number(balance[0].amount));

      if (Number(balance[0].amount) < amount * 100) {
        throw new Error("116");
      }

      await tx.balance.update({
        where: {
          userId: Number(session.user.id),
        },
        data: {
          amount: {
            decrement: amount*100,
          },
        },
      });

      await tx.balance.update({
        where: {
          userId: Number(toUser.id),
        },
        data: {
          amount: {
            increment: amount*100,
          },
        },
      });
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      if (error.message === "116") {
        return { status: 116, message: "Insufficient Balance" };
      }

      if (error.message === "501") {
        return { status: 501, message: "Invalid benificiary" };
      }
    }

    return {
      status: 500,
      message: "Internal Server Error",
    };
  }

  return {
    status: 200,
    message: "Transferred Successfully",
  };
}
