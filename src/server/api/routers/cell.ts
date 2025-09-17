// ~/server/api/routers/cell.ts
import { z } from "zod";
import { eq, sql } from "drizzle-orm";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { bases, tables, columns, rows, cells } from "~/server/db/schema";

export const cellRouter = createTRPCRouter({
  createColumn: protectedProcedure
    .input(
      z.object({
        tableId: z.string().uuid(),
        name: z.string().min(1).max(256),
        type: z.enum(["text", "number"]),
        position: z.number().optional(),
        isRequired: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { tableId, name, type, position, isRequired } = input;

      return await ctx.db.transaction(async (tx) => {
        let pos = position;
        if (pos === undefined) {
          const max = await tx
            .select({ max: sql<number>`max(${columns.position})` })
            .from(columns)
            .where(eq(columns.tableId, tableId));
          const maxVal = (max?.[0]?.max as number | null) ?? 0;
          pos = Number(maxVal) + 1000;
        }

        // 2) 插入列
        const [col] = await tx
          .insert(columns)
          .values({
            tableId,
            name,
            type, // "text" | "number"
            position: String(pos), // 列是 numeric(12,3)，drizzle 可用 string/number，统一成字符串更稳
            isRequired: isRequired ?? false,
          })
          .returning();

        if (!col) {
          throw new Error("Failed to create column");
        }

        // 3) 为该表的每一行初始化一个空 cell（防止 UI 读取时报错）
        const allRows = await tx.query.rows.findMany({
          where: eq(rows.tableId, tableId),
          columns: { id: true },
        });

        if (allRows.length > 0) {
          await tx.insert(cells).values(
            allRows.map((r) => ({
              rowId: r.id,
              columnId: col.id,
              value: "", // 约定空串
            })),
          );
        }

        // 4) 刷新表的 updatedAt
        await tx
          .update(tables)
          .set({ updatedAt: sql`now()` })
          .where(eq(tables.id, tableId));

        return col;
      });
    }),

  /**
   * 新建行：createRow
   * - 输入：tableId， 可选 position
   * - 逻辑：插入行；为该表现有每一列初始化一个空 cell；刷新表 updatedAt
   */
  createRow: protectedProcedure
    .input(
      z.object({
        tableId: z.string().uuid(),
        position: z.number().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { tableId, position } = input;

      return await ctx.db.transaction(async (tx) => {
        // 1) 计算行的 position（简单策略：取现有最大 position + 1000）
        let pos = position;
        if (pos === undefined) {
          const max = await tx
            .select({ max: sql<number>`max(${rows.position})` })
            .from(rows)
            .where(eq(rows.tableId, tableId));
          const maxVal = (max?.[0]?.max as number | null) ?? 0;
          pos = Number(maxVal) + 1000;
        }

        // 2) 插入行
        const [row] = await tx
          .insert(rows)
          .values({
            tableId,
            position: String(pos),
          })
          .returning();

        if (!row) {
          throw new Error("Failed to create row");
        }

        // 3) 为该表的每一列初始化一个空 cell
        const allCols = await tx.query.columns.findMany({
          where: eq(columns.tableId, tableId),
          columns: { id: true },
        });

        if (allCols.length > 0) {
          await tx.insert(cells).values(
            allCols.map((c) => ({
              rowId: row.id,
              columnId: c.id,
              value: "",
            })),
          );
        }

        // 4) 刷新表的 updatedAt
        await tx
          .update(tables)
          .set({ updatedAt: sql`now()` })
          .where(eq(tables.id, tableId));

        return row;
      });
    }),

  /**
   * 编辑单元格：editCell
   * - 输入：rowId, columnId, value(string)
   * - 逻辑：按 (rowId, columnId) upsert；刷新 row/table 的 updatedAt
   */
  editCell: protectedProcedure
    .input(
      z.object({
        rowId: z.string().uuid(),
        columnId: z.string().uuid(),
        value: z.string(), // 你已将 DB 设为 TEXT，这里就统一前端负责格式
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { rowId, columnId, value } = input;

      return await ctx.db.transaction(async (tx) => {
        // 1) upsert cell
        await tx
          .insert(cells)
          .values({ rowId, columnId, value })
          .onConflictDoUpdate({
            target: [cells.rowId, cells.columnId],
            set: { value, updatedAt: sql`now()` },
          });

        // 2) 找到 tableId，用于刷新表 updatedAt
        const row = await tx.query.rows.findFirst({
          where: eq(rows.id, rowId),
          columns: { tableId: true },
        });
        if (!row) throw new Error("Row not found");

        // 3) 刷新 row / table 的 updatedAt
        await tx
          .update(rows)
          .set({ updatedAt: sql`now()` })
          .where(eq(rows.id, rowId));

        await tx
          .update(tables)
          .set({ updatedAt: sql`now()` })
          .where(eq(tables.id, row.tableId));

        return { ok: true };
      });
    }),
});
