CREATE TABLE IF NOT EXISTS "bikes" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"image" text NOT NULL,
	"price" integer NOT NULL,
	"description" text NOT NULL,
	"type" varchar(100),
	"quantity" integer DEFAULT 0,
	"rating" numeric(2, 1)
);
