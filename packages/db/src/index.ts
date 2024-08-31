import { PrismaClient } from "@prisma/client";

export * from "@prisma/client";
export { PrismaClient } from "@prisma/client";
export const db = new PrismaClient();