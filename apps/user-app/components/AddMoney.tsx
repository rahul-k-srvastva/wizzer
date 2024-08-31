"use client";

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Select } from "@repo/ui/Select";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { onRampTransaction } from "../app/lib/actions/onRampTransaction";
// import { onRampTransaction } from "../app/lib/actions/onRampTransaction";

const BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "http://redirect.hdfc.com?token=",
  },
  {
    name: "AXIS Bank",
    redirectUrl: "http://redirect.hdfc.com?token=",
  },
  {
    name: "DBC Bank",
    redirectUrl: "http://redirect.hdfc.com?token=",
  },
  {
    name: "CORP Bank",
    redirectUrl: "http://redirect.hdfc.com?token=",
  },
  {
    name: "AND Bank",
    redirectUrl: "http://redirect.hdfc.com?token=",
  },
  {
    name: "UNION Bank",
    redirectUrl: "http://redirect.hdfc.com?token=",
  },
];

export default function Addmoney() {
  const [amount, setAmount] = useState(0);
  const [selectedBank, setSelectedBank] = useState(BANKS[0]);

  return (
    <Card title="Add Money">
      <div className="space-y-3">
        <TextInput
          label="Amount"
          placeholder="Amount"
          onChange={(value) => {
            setAmount(Number(value));
          }}
        />
        <Select
          label="Bank"
          onSelect={(value) => {
            const selectedBank = BANKS.find((bank) => bank.name === value);
            setSelectedBank(selectedBank);
          }}
          options={BANKS.map((x) => ({ label: x.name, value: x.name }))}
        />
        <div className="flex justify-center">
          <Button
            onClick={
              async () => {
              const response = await onRampTransaction(amount,selectedBank?.name as string);

              if(response.status === 401){
                return alert("Unauthorized");
              }else if(response.status === 500){
                return alert("Server Error");
              }else if(response.status === 201){
                window.location.href= selectedBank?.redirectUrl as string;
              }
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
}
