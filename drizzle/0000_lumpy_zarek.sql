CREATE TABLE "connect" (
	"id" bigint PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "connections" (
	"id" bigint PRIMARY KEY NOT NULL,
	"username" text,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "contact" (
	"id" bigint PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" bigint PRIMARY KEY NOT NULL,
	"username" text,
	"ucode" text,
	"hashed_password" text,
	"avatar" text,
	"api_key" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "connections" ADD CONSTRAINT "connections_username_users_username_fk" FOREIGN KEY ("username") REFERENCES "public"."users"("username") ON DELETE no action ON UPDATE no action;