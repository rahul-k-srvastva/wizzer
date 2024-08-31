import { OnRampTransaction } from "@repo/db";
import { Card } from "@repo/ui/card";

export type onRampTransaction = Omit<
  OnRampTransaction,
  "id" | "token" | "userId"
>;

export default function RecentTransactionsCard({
  onRampTransactions,
}: {
  onRampTransactions: onRampTransaction[];
}) {
  if (onRampTransactions.length <= 0) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center mt-6 text-sm font-medium">
          No Recent Transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="Recent Transactions">
      {onRampTransactions.map((transaction,idx) => {
        return (
          <div className="flex justify-between border-b pb-2" key={idx}>
            <div className="space-y-1">
              <p className="font-medium">{transaction.startTime.toDateString() + ", " + transaction.startTime.toLocaleTimeString()}</p>
              <p className="text-sm">{transaction.provider}</p>
              <p
                className={`rounded-full text-white font-medium text-xs text-center w-max px-2 py-1 ${transaction.status === "Processing" ? "bg-yellow-700" : transaction.status === "Failure" ? "bg-red-700" : "bg-green-700"}`}
              >
                {transaction.status}
              </p>
            </div>
            <div className="flex items-center">
              {`+Rs. ${transaction.amount / 100}`}
            </div>
          </div>
        );
      })}
    </Card>
  );
}
