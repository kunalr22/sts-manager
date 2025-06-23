import { sql } from "drizzle-orm";
import { pgTable, varchar, timestamp, boolean, uuid, integer, check, primaryKey, unique, date } from "drizzle-orm/pg-core";

export const User = pgTable("usr", {
    id: uuid("id").primaryKey().defaultRandom(),
    username: varchar("username", { length: 255 }).notNull().unique(), 
    password: varchar("password", { length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
    isAdmin: boolean("is_admin").default(false),
});

export const Student = pgTable("student", {
    id: uuid("id").primaryKey().defaultRandom(),
    fullName: varchar("full_name", { length: 255 }).notNull(),
    phoneNumber: varchar("phone_number", { length: 20 }).notNull(),
    email: varchar("email", { length: 255 }),
    createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow(),
});

export const Timeslot = pgTable("timeslot", {
    id: uuid("id").primaryKey().defaultRandom(),
    dayOfWeek: integer("day_of_week").notNull(),
    startHour: integer("start_hour").notNull(),
    endHour: integer("end_hour").notNull(),
}, (table) => [
        check("one_hour_block", sql`end_hour = start_hour + 1`),
        check("valid_day", sql`day_of_week BETWEEN 1 and 5`),
        unique().on(table.dayOfWeek, table.startHour),
    ]
);

export const ClassSchedule = pgTable("class_schedule", {
    student: uuid("student").references(() => Student.id).notNull(),
    timeslot: uuid("timeslot").references(() => Timeslot.id).notNull(),
    classDate: date("class_date").notNull(),
    teacher: uuid("teacher").references(() => User.id).notNull(),
    attendance: boolean("attendance").notNull().default(true),
    cancelled: boolean("cancelled").notNull().default(false)
}, (table) => [
    primaryKey({ columns: [table.student, table.timeslot, table.classDate]}),
]);