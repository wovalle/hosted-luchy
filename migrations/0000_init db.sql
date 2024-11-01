CREATE TABLE IF NOT EXISTS "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"data" text,
	"created_at" timestamp DEFAULT now()
);
