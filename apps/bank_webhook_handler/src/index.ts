import express from "express";
import { db } from "@repo/db";

const PORT = 3002;

const app = express();
app.use(express.json());

type PaymentInfo = {
  token: string;
  amount: number;
  userId: string;
  status: string;
};


app.post("/bank1_webhook", async (req, res, next) => {
  //zod validations
  //encryption/decryption/digitalsignature

  const paymentInfo: PaymentInfo = req.body;

  try {
    await db.$transaction([
      db.balance.update({
        where: {
          userId: +paymentInfo.userId,
        },
        data: {
          amount: {
            increment: Number(paymentInfo.amount),
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInfo.token,
        },
        data: {
          status: paymentInfo.status === 'Success' ? 'Success' : 'Failure'            
        },
      }),
    ]);

    console.log("Transaction Captured");

    return res.status(201).json({message : "Captured"})
  } catch (error) {
    console.log("Error while saving payment info");
    console.log(error);
  }

  return res
    .status(500)
    .json({ message: "Not Captured" });
});

// app.post("/bank2_webhook",()=>{

// })

// app.post("/bank3_webhook",()=>{

// })

app.listen(PORT, () => {
  console.log("Server Started on Port : ", PORT);
});
