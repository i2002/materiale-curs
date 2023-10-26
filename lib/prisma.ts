import { Prisma, PrismaClient } from '@prisma/client'

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

const augumentedResourceArgs = Prisma.validator<Prisma.ResourceDefaultArgs>()({
  include: {
    fileData: true,
    _count: {
      select: {
        children: true
      }
    }
  }
});
  
const resourceWithFileDataArgs = Prisma.validator<Prisma.ResourceDefaultArgs>()({
  include: {
    fileData: true,
  }
});

export {
  augumentedResourceArgs,
  resourceWithFileDataArgs
}

export type AugumentedResource = Prisma.ResourceGetPayload<typeof augumentedResourceArgs>;
export type ResourceWithFileData = Prisma.ResourceGetPayload<typeof resourceWithFileDataArgs>;
export default prisma;
