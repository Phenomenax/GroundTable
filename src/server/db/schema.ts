import { relations, sql } from "drizzle-orm";
import { index, pgEnum, pgTableCreator, primaryKey } from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `airtable_cloned_${name}`);

export const users = createTable("user", (d) => ({
  id: d
    .uuid()
    .notNull()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: d.varchar({ length: 255 }),
  email: d.varchar({ length: 255 }).notNull(),
  emailVerified: d
    .timestamp({
      mode: "date",
      withTimezone: true,
    })
    .default(sql`CURRENT_TIMESTAMP`),
  image: d.varchar({ length: 255 }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  (d) => ({
    userId: d
      .uuid()
      .notNull()
      .references(() => users.id),
    type: d.varchar({ length: 255 }).$type<AdapterAccount["type"]>().notNull(),
    provider: d.varchar({ length: 255 }).notNull(),
    providerAccountId: d.varchar({ length: 255 }).notNull(),
    refresh_token: d.text(),
    access_token: d.text(),
    expires_at: d.integer(),
    token_type: d.varchar({ length: 255 }),
    scope: d.varchar({ length: 255 }),
    id_token: d.text(),
    session_state: d.varchar({ length: 255 }),
  }),
  (t) => [
    primaryKey({ columns: [t.provider, t.providerAccountId] }),
    index("account_user_id_idx").on(t.userId),
  ],
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  (d) => ({
    sessionToken: d.varchar({ length: 255 }).notNull().primaryKey(),
    userId: d
      .uuid()
      .notNull()
      .references(() => users.id),
    expires: d.timestamp({ mode: "date", withTimezone: true }).notNull(),
  }),
  (t) => [index("t_user_id_idx").on(t.userId)],
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const bases = createTable(
  "base",
  (d) => ({
    id: d
      .uuid()
      .notNull()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: d.varchar({ length: 256 }).default("Untitled Base").notNull(),
    userId: d
      .uuid()
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    updatedAt: d.timestamp({ withTimezone: true }).defaultNow().notNull(),
    tableCount: d.integer().default(0).notNull(),
  }),
  (t) => [index("user_id_idx").on(t.userId)],
);

export const tables = createTable(
  "table",
  (d) => ({
    id: d
      .uuid()
      .notNull()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    name: d.varchar({ length: 256 }).notNull(),
    createdAt: d.timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: d.timestamp("updated_at", { withTimezone: true }).defaultNow(),
    baseId: d
      .uuid("base_id")
      .notNull()
      .references(() => bases.id, { onDelete: "cascade" }),
  }),
  (t) => [index("base_id_idx").on(t.baseId)],
);

export const basesRelations = relations(bases, ({ many }) => ({
  tables: many(tables),
}));

export const tablesRelations = relations(tables, ({ one }) => ({
  base: one(bases, {
    fields: [tables.baseId],
    references: [bases.id],
  }),
}));

export const columnTypeEnum = pgEnum("column_type", ["text", "number"]);

export const columns = createTable(
  "column",
  (d) => ({
    id: d
      .uuid()
      .notNull()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    tableId: d
      .uuid("table_id")
      .notNull()
      .references(() => tables.id, { onDelete: "cascade" }),
    name: d.varchar({ length: 256 }).notNull(),
    type: columnTypeEnum("type").notNull(),
    position: d.numeric({ precision: 12, scale: 3 }).notNull().default("1000"),
    isRequired: d.boolean("is_required").notNull().default(false),
    createdAt: d.timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: d.timestamp("updated_at", { withTimezone: true }).defaultNow(),
  }),
  (t) => [
    index("column_table_idx").on(t.tableId),
    index("column_pos_idx").on(t.position),
  ],
);

export const rows = createTable(
  "row",
  (d) => ({
    id: d
      .uuid()
      .notNull()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    tableId: d
      .uuid("table_id")
      .notNull()
      .references(() => tables.id, { onDelete: "cascade" }),
    position: d.numeric({ precision: 12, scale: 3 }).notNull().default("1000"),
    createdAt: d.timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: d.timestamp("updated_at", { withTimezone: true }).defaultNow(),
  }),
  (t) => [
    index("row_table_idx").on(t.tableId),
    index("row_pos_idx").on(t.position),
  ],
);

export const cells = createTable(
  "cell",
  (d) => ({
    rowId: d
      .uuid("row_id")
      .notNull()
      .references(() => rows.id, { onDelete: "cascade" }),
    columnId: d
      .uuid("column_id")
      .notNull()
      .references(() => columns.id, { onDelete: "cascade" }),
    value: d.text().notNull().default(""),
    updatedAt: d.timestamp("updated_at", { withTimezone: true }).defaultNow(),
  }),
  (t) => [
    primaryKey({ columns: [t.rowId, t.columnId], name: "cell_pk" }),
    index("cell_row_idx").on(t.rowId),
    index("cell_col_idx").on(t.columnId),
  ],
);
