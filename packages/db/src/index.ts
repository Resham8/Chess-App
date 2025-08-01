import { PrismaClient, AuthProvider,GameStatus } from "@prisma/client";

export const prismaClient = new PrismaClient();

export { AuthProvider, GameStatus};
