"use client";

import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { P2PTransferAction } from "../app/lib/actions/p2ptransfer";

export default function SendCard() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className="h-full w-full flex items-center justify-center">
      <Card title="Send Money" className="bg-white">
        <TextInput
          label="Number"
          placeholder="1234567890"
          onChange={(value) => {
            setTo(value);
          }}
        />
        <TextInput
          label="Amount"
          placeholder="Amount in Rs."
          onChange={(value) => {
            setAmount(+value);
          }}
        />
        <div className="text-center mt-4">
          <Button
            onClick={async () => {
              console.log("Buton Clicked");

              const result = await P2PTransferAction(amount, to);
              console.log(result);

              alert(result.message);
            }}
          >
            Send
          </Button>
        </div>
      </Card>
    </div>
  );
}
