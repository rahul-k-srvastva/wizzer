import { Balance } from "@repo/db";
import { Card } from "@repo/ui/card";

export default function BalanceCard({amount , locked} : Pick<Balance , 'amount' | 'locked' >) {
  return (
    <Card title="Balance">
      <div className="space-y-2">
        <div className="flex justify-between border-b pb-2">
          <p>Unlocked Balance</p>
          <p>{(amount-locked)/100} INR</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p>Total Locked Balance</p>
          <p>{locked/100} INR</p>
        </div>
        <div className="flex justify-between border-b pb-2">
          <p>Total Balance</p>
          <p>{amount/100} INR</p>
        </div>
      </div>
    </Card>
  );
}
