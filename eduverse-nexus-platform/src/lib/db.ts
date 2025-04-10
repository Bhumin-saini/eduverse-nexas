import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

// Prisma schema (to be added to prisma/schema.prisma)
/*
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id                String    @id @default(cuid())
  email             String    @unique
  password          String
  walletAddress     String    @unique
  isWalletRegistered Boolean  @default(false)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
  studentSummary    StudentSummary?
}

model StudentSummary {
  id                String    @id @default(cuid())
  userId            String    @unique
  user              User      @relation(fields: [userId], references: [id])
  totalPointsEarned Int       @default(0)
  stakedPoints      Int       @default(0)
  researchPoints    Int       @default(0)
  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt
}
*/ 