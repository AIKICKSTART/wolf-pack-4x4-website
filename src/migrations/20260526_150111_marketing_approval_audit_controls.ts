import type { MigrateDownArgs, MigrateUpArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_marketing_approvals_status_history_from" AS ENUM('draft', 'needs_review', 'approved', 'scheduled', 'rejected');
  CREATE TYPE "public"."enum_marketing_approvals_status_history_to" AS ENUM('draft', 'needs_review', 'approved', 'scheduled', 'rejected');
  CREATE TYPE "public"."enum__marketing_approvals_v_version_risk_flags_severity" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum__marketing_approvals_v_version_status_history_from" AS ENUM('draft', 'needs_review', 'approved', 'scheduled', 'rejected');
  CREATE TYPE "public"."enum__marketing_approvals_v_version_status_history_to" AS ENUM('draft', 'needs_review', 'approved', 'scheduled', 'rejected');
  CREATE TYPE "public"."enum__marketing_approvals_v_version_status" AS ENUM('draft', 'needs_review', 'approved', 'scheduled', 'rejected');
  CREATE TYPE "public"."enum__marketing_approvals_v_version_source_system" AS ENUM('hermes', 'codex', 'claude', 'manual');
  CREATE TYPE "public"."enum__marketing_approvals_v_version_channel" AS ENUM('cms', 'postiz', 'blog', 'campaign', 'email');
  CREATE TABLE "marketing_approvals_status_history" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"from" "enum_marketing_approvals_status_history_from",
	"to" "enum_marketing_approvals_status_history_to",
	"actor_id" integer,
	"at" timestamp(3) with time zone
  );

  CREATE TABLE "_marketing_approvals_v_version_risk_flags" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"severity" "enum__marketing_approvals_v_version_risk_flags_severity" DEFAULT 'medium' NOT NULL,
	"_uuid" varchar
  );

  CREATE TABLE "_marketing_approvals_v_version_review_notes" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"note" varchar NOT NULL,
	"author_id" integer,
	"_uuid" varchar
  );

  CREATE TABLE "_marketing_approvals_v_version_status_history" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"from" "enum__marketing_approvals_v_version_status_history_from",
	"to" "enum__marketing_approvals_v_version_status_history_to",
	"actor_id" integer,
	"at" timestamp(3) with time zone,
	"_uuid" varchar
  );

  CREATE TABLE "_marketing_approvals_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar NOT NULL,
	"version_status" "enum__marketing_approvals_v_version_status" DEFAULT 'draft' NOT NULL,
	"version_source_system" "enum__marketing_approvals_v_version_source_system" DEFAULT 'hermes' NOT NULL,
	"version_channel" "enum__marketing_approvals_v_version_channel" DEFAULT 'cms' NOT NULL,
	"version_proposed_copy" varchar NOT NULL,
	"version_target_url" varchar,
	"version_scheduled_for" timestamp(3) with time zone,
	"version_related_blog_post_id" integer,
	"version_related_campaign_page_id" integer,
	"version_approved_by_id" integer,
	"version_approved_at" timestamp(3) with time zone,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  ALTER TABLE "marketing_approvals_status_history" ADD CONSTRAINT "marketing_approvals_status_history_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_approvals_status_history" ADD CONSTRAINT "marketing_approvals_status_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_approvals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v_version_risk_flags" ADD CONSTRAINT "_marketing_approvals_v_version_risk_flags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_approvals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v_version_review_notes" ADD CONSTRAINT "_marketing_approvals_v_version_review_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v_version_review_notes" ADD CONSTRAINT "_marketing_approvals_v_version_review_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_approvals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v_version_status_history" ADD CONSTRAINT "_marketing_approvals_v_version_status_history_actor_id_users_id_fk" FOREIGN KEY ("actor_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v_version_status_history" ADD CONSTRAINT "_marketing_approvals_v_version_status_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_approvals_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v" ADD CONSTRAINT "_marketing_approvals_v_parent_id_marketing_approvals_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."marketing_approvals"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v" ADD CONSTRAINT "_marketing_approvals_v_version_related_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("version_related_blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v" ADD CONSTRAINT "_marketing_approvals_v_version_related_campaign_page_id_marketing_pages_id_fk" FOREIGN KEY ("version_related_campaign_page_id") REFERENCES "public"."marketing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_approvals_v" ADD CONSTRAINT "_marketing_approvals_v_version_approved_by_id_users_id_fk" FOREIGN KEY ("version_approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "marketing_approvals_status_history_order_idx" ON "marketing_approvals_status_history" USING btree ("_order");
  CREATE INDEX "marketing_approvals_status_history_parent_id_idx" ON "marketing_approvals_status_history" USING btree ("_parent_id");
  CREATE INDEX "marketing_approvals_status_history_actor_idx" ON "marketing_approvals_status_history" USING btree ("actor_id");
  CREATE INDEX "_marketing_approvals_v_version_risk_flags_order_idx" ON "_marketing_approvals_v_version_risk_flags" USING btree ("_order");
  CREATE INDEX "_marketing_approvals_v_version_risk_flags_parent_id_idx" ON "_marketing_approvals_v_version_risk_flags" USING btree ("_parent_id");
  CREATE INDEX "_marketing_approvals_v_version_review_notes_order_idx" ON "_marketing_approvals_v_version_review_notes" USING btree ("_order");
  CREATE INDEX "_marketing_approvals_v_version_review_notes_parent_id_idx" ON "_marketing_approvals_v_version_review_notes" USING btree ("_parent_id");
  CREATE INDEX "_marketing_approvals_v_version_review_notes_author_idx" ON "_marketing_approvals_v_version_review_notes" USING btree ("author_id");
  CREATE INDEX "_marketing_approvals_v_version_status_history_order_idx" ON "_marketing_approvals_v_version_status_history" USING btree ("_order");
  CREATE INDEX "_marketing_approvals_v_version_status_history_parent_id_idx" ON "_marketing_approvals_v_version_status_history" USING btree ("_parent_id");
  CREATE INDEX "_marketing_approvals_v_version_status_history_actor_idx" ON "_marketing_approvals_v_version_status_history" USING btree ("actor_id");
  CREATE INDEX "_marketing_approvals_v_parent_idx" ON "_marketing_approvals_v" USING btree ("parent_id");
  CREATE INDEX "_marketing_approvals_v_version_version_related_blog_post_idx" ON "_marketing_approvals_v" USING btree ("version_related_blog_post_id");
  CREATE INDEX "_marketing_approvals_v_version_version_related_campaign__idx" ON "_marketing_approvals_v" USING btree ("version_related_campaign_page_id");
  CREATE INDEX "_marketing_approvals_v_version_version_approved_by_idx" ON "_marketing_approvals_v" USING btree ("version_approved_by_id");
  CREATE INDEX "_marketing_approvals_v_version_version_updated_at_idx" ON "_marketing_approvals_v" USING btree ("version_updated_at");
  CREATE INDEX "_marketing_approvals_v_version_version_created_at_idx" ON "_marketing_approvals_v" USING btree ("version_created_at");
  CREATE INDEX "_marketing_approvals_v_created_at_idx" ON "_marketing_approvals_v" USING btree ("created_at");
  CREATE INDEX "_marketing_approvals_v_updated_at_idx" ON "_marketing_approvals_v" USING btree ("updated_at");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "marketing_approvals_status_history" CASCADE;
  DROP TABLE "_marketing_approvals_v_version_risk_flags" CASCADE;
  DROP TABLE "_marketing_approvals_v_version_review_notes" CASCADE;
  DROP TABLE "_marketing_approvals_v_version_status_history" CASCADE;
  DROP TABLE "_marketing_approvals_v" CASCADE;
  DROP TYPE "public"."enum_marketing_approvals_status_history_from";
  DROP TYPE "public"."enum_marketing_approvals_status_history_to";
  DROP TYPE "public"."enum__marketing_approvals_v_version_risk_flags_severity";
  DROP TYPE "public"."enum__marketing_approvals_v_version_status_history_from";
  DROP TYPE "public"."enum__marketing_approvals_v_version_status_history_to";
  DROP TYPE "public"."enum__marketing_approvals_v_version_status";
  DROP TYPE "public"."enum__marketing_approvals_v_version_source_system";
  DROP TYPE "public"."enum__marketing_approvals_v_version_channel";`)
}
