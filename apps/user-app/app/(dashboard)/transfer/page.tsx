import { getServerSession } from "next-auth";
import Addmoney from "../../../components/AddMoney";
import Balance from "../../../components/Balance";
import RecentTransactionsCard, {
  onRampTransaction,
} from "../../../components/RecentTransactions";
import { AUTH_CONFIG, SessionWithIdType } from "../../lib/auth";
import { db } from "@repo/db";


async function getOnRampTransactions(): Promise<onRampTransaction[]> {
  const session = (await getServerSession(AUTH_CONFIG)) as SessionWithIdType;

  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session.user.id),
    },
  });

  return txns.map((txn) => ({
    amount: txn.amount,
    status: txn.status,
    provider: txn.provider,
    startTime: txn.startTime,
  }));
}

async function getBalance() {
  const session = (await getServerSession(AUTH_CONFIG)) as SessionWithIdType;

  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session.user.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function Transfer() {
  const txnsArray = await getOnRampTransactions();
  const {amount, locked} = await getBalance();

  return (
    <div className="p-3 space-y-6">
      <h1 className="text-3xl text-purple-900 font-medium">Transfer</h1>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Addmoney />
        </div>
        <div className="space-y-4">
          <Balance amount={amount} locked={locked}/>
          <RecentTransactionsCard onRampTransactions={txnsArray} />
        </div>
      </div>
    </div>
  );
}
