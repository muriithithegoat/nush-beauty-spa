ALTER TABLE "users" ALTER COLUMN "_temp" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "_temp" SET DEFAULT 'none';--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "IsVerified" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "VerificationCode" varchar(255);