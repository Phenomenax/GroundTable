import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { bases, tables } from "~/server/db/schema";

export const tableRouter = createTRPCRouter({
  createByBaseId: protectedProcedure
    .input(z.string().uuid())
    .mutation(async ({ ctx, input }) => {
      const baseId = input;

      const result = await ctx.db
        .update(bases)
        .set({
          tableCount: sql`${bases.tableCount} + 1`,
          updatedAt: sql`now()`,
        })
        .where(eq(bases.id, baseId))
        .returning({ tableCount: bases.tableCount });

      const row = result[0];
      if (!row) {
        throw new Error("Base not found");
      }
      const { tableCount } = row;

      const name = `Table ${tableCount}`;

      const [created] = await ctx.db
        .insert(tables)
        .values({ baseId, name })
        .returning();

      if (!created) {
        throw new Error("Insert failed or no row returned");
      }

      return created;
    }),
});
