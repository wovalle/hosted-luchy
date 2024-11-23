ALTER TABLE "messages" ALTER COLUMN "data" SET DATA TYPE jsonb;--> statement-breakpoint
ALTER TABLE "messages" ALTER COLUMN "data" SET NOT NULL;