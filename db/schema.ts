import { serial, integer, text, pgTable, varchar, numeric } from "drizzle-orm/pg-core";

export const bikes = pgTable("bikes", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    image: text("image").notNull(),
    price: integer("price").notNull(),
    description: text("description").notNull(),
    type: varchar("type", { length: 100 }).notNull(),
    quantity: integer("quantity").default(0).notNull(),
    rating: numeric("rating", { precision: 2, scale: 1 }).notNull(),
});