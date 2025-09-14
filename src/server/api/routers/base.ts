import { z } from "zod";
import { eq } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { bases } from "~/server/db/schema";

export const baseRouter = createTRPCRouter({
  getByUserId: protectedProcedure.query(async ({ ctx }) => {
    const base = await ctx.db.query.bases.findMany({
      where: eq(bases.userId, ctx.session.user.id),
    });

    if (!base) {
      throw new Error("Bases not found");
    }

    return base;
  }),

  getByBaseId: protectedProcedure
    .input(z.string().uuid())
    .query(async ({ ctx, input }) => {
      const base = await ctx.db.query.bases.findFirst({
        where: eq(bases.id, input),
      });

      if (!base) {
        throw new Error("Base not found");
      }

      return base;
    }),

  create: protectedProcedure.mutation(async ({ ctx }) => {
    const [newBase] = await ctx.db
      .insert(bases)
      .values({
        userId: ctx.session.user.id,
      })
      .returning();

    if (!newBase) {
      throw new Error("Insert failed or no row returned");
    }

    return newBase;
  }),

  deleteById: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(bases).where(eq(bases.id, input));
    }),
});
