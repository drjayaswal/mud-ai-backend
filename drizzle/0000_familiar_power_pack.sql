CREATE TABLE "connect" (
	"id" bigint PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"message" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "connections" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"message" text NOT NULL,
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
ALTER TABLE "connections" ADD CONSTRAINT "connections_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;