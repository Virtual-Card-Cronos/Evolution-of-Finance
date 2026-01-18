CREATE TABLE "cart_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"card_id" integer NOT NULL,
	"card_name" text NOT NULL,
	"category" text NOT NULL,
	"image" text NOT NULL,
	"selected_amount" numeric(10, 2) NOT NULL,
	"quantity" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
