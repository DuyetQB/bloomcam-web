import { Prisma, PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  if (!process.env.DATABASE_URL) return null;
  if (process.env.DATABASE_ENABLED === "false") return null;
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma: PrismaClient | null =
  globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production" && prisma) {
  globalForPrisma.prisma = prisma;
}

export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL && prisma);
}

export function getPrisma(): PrismaClient {
  if (!prisma) {
    throw new Error("DATABASE_URL is not configured");
  }
  return prisma;
}

const CONNECTION_ERROR_CODES = new Set(["P1000", "P1001", "P1017"]);

export function isDatabaseConnectionError(error: unknown): boolean {
  if (error instanceof Prisma.PrismaClientInitializationError) {
    return true;
  }
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    CONNECTION_ERROR_CODES.has(error.code)
  ) {
    return true;
  }
  if (error && typeof error === "object" && "code" in error) {
    const code = String((error as { code: string }).code);
    return CONNECTION_ERROR_CODES.has(code);
  }
  return false;
}

/** Dev / explicit demo: persist orders in memory when Postgres is down or unset. */
export function shouldFallbackPreorderToDemo(error?: unknown): boolean {
  if (process.env.PREORDER_DEMO_MODE === "true") return true;
  if (process.env.NODE_ENV === "production") return false;
  if (!isDatabaseConfigured()) return true;
  return error !== undefined && isDatabaseConnectionError(error);
}
