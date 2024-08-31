import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const bob = await prisma.user.upsert({
    where: {
      number: "9999999998",
    },
    create: {
      number: "9999999998",
      password: await bcrypt.hash("9999999998", 10),
      email: "bob@bob.com",
      name: "Bob the Builder",
      OnRampTransactions: {
        createMany: {
          data: [
            {
              amount: 44000,
              provider: "HDFC Bank",
              status: "Success",
              startTime: new Date(),
              token: "1",
            },
            {
              amount: 44550,
              provider: "DBFC Bank",
              status: "Failure",
              startTime: new Date(),
              token: "2",
            },
            {
              amount: 20430,
              provider: "ABCD Bank",
              status: "Processing",
              startTime: new Date(),
              token: "3",
            },
            {
              amount: 414520,
              provider: "XYZD Bank",
              status: "Success",
              startTime: new Date(),
              token: "4",
            },
            {
              amount: 98541254,
              provider: "FCDH Bank",
              status: "Failure",
              startTime: new Date(),
              token: "5",
            },
            {
              amount: 54258741,
              provider: "LMPS Bank",
              status: "Processing",
              startTime: new Date(),
              token: "6",
            },
            {
              amount: 963200,
              provider: "KVPY Bank",
              status: "Success",
              startTime: new Date(),
              token: "7",
            },
            {
              amount: 958214,
              provider: "ZPSM Bank",
              status: "Success",
              startTime: new Date(),
              token: "8",
            },
          ],
        },
      },
      Balance: {
        create: {
          amount: 180000,
          locked: 520,
        },
      },
    },
    update: {},
  });

  const alice = await prisma.user.upsert({
    where: {
      number: "9999999997",
    },
    create: {
      number: "9999999997",
      password: await bcrypt.hash("9999999997", 10),
      email: "alice@alice.com",
      name: "Alice in Wonderland",
      OnRampTransactions: {
        createMany: {
          data: [
            {
              amount: 44000,
              provider: "HDFC Bank",
              status: "Success",
              startTime: new Date(),
              token: "9",
            },
            {
              amount: 44550,
              provider: "DBFC Bank",
              status: "Failure",
              startTime: new Date(),
              token: "10",
            },
            {
              amount: 20430,
              provider: "ABCD Bank",
              status: "Processing",
              startTime: new Date(),
              token: "11",
            },
            {
              amount: 414520,
              provider: "XYZD Bank",
              status: "Success",
              startTime: new Date(),
              token: "12",
            },
            {
              amount: 98541254,
              provider: "FCDH Bank",
              status: "Failure",
              startTime: new Date(),
              token: "13",
            },
            {
              amount: 54258741,
              provider: "LMPS Bank",
              status: "Processing",
              startTime: new Date(),
              token: "14",
            },
            {
              amount: 963200,
              provider: "KVPY Bank",
              status: "Success",
              startTime: new Date(),
              token: "15",
            },
            {
              amount: 958214,
              provider: "ZPSM Bank",
              status: "Success",
              startTime: new Date(),
              token: "16",
            },
          ],
        },
      },
      Balance: {
        create: {
          amount: 180000,
          locked: 520,
        },
      },
    },
    update: {},
  });
}

main()
  .then(() => {
    console.log("seed data inserted.");
  })
  .catch((err) => {
    console.log("Error while inserting seed data");
    console.log(err);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log("DB Disconnected");
  });
