import { z } from "zod";
import { eq } from "drizzle-orm";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { bases } from "~/server/db/schema";

export const baseRouter = createTRPCRouter({
  getById: protectedProcedure.query(async ({ ctx }) => {
    const base = await ctx.db.query.bases.findMany({
      where: eq(bases.userId, ctx.session.user.id),
    });
    return base;
  }),

  create: protectedProcedure.mutation(async ({ ctx }) => {
    const newBase = await ctx.db.insert(bases).values({
      userId: ctx.session.user.id,
    });
    return newBase;
  }),
});
