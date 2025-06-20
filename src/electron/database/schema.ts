import { pgTable, varchar, timestamp, boolean, uuid } from "drizzle-orm/pg-core";

export const UserTable = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).notNull().unique(), 
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    isAdmin: boolean("is_admin").default(false),
});

export const StudentTable = pgTable("students", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
})