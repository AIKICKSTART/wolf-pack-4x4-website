import { sql } from '@payloadcms/db-postgres'
import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('operator', 'admin', 'editor', 'seo-manager', 'client-reviewer');
  CREATE TYPE "public"."enum_blog_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__blog_posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_marketing_pages_page_type" AS ENUM('homepage', 'service', 'location', 'parts', 'standard');
  CREATE TYPE "public"."enum_marketing_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__marketing_pages_v_version_page_type" AS ENUM('homepage', 'service', 'location', 'parts', 'standard');
  CREATE TYPE "public"."enum__marketing_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_content_overrides_target_type" AS ENUM('homepage', 'standard-page', 'service', 'location', 'service-location', 'part', 'part-category');
  CREATE TYPE "public"."enum_content_overrides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__content_overrides_v_version_target_type" AS ENUM('homepage', 'standard-page', 'service', 'location', 'service-location', 'part', 'part-category');
  CREATE TYPE "public"."enum__content_overrides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_redirects_status_code" AS ENUM('301', '302');
  CREATE TYPE "public"."enum_enquiries_service_interest" AS ENUM('muffler-repairs-replacement', 'custom-exhaust-systems', 'performance-exhausts', 'extractors-headers', 'parts', 'other');
  CREATE TYPE "public"."enum_enquiries_source" AS ENUM('website', 'phone', 'email', 'postiz', 'manual');
  CREATE TYPE "public"."enum_enquiries_status" AS ENUM('new', 'needs-follow-up', 'quoted', 'booked', 'closed');
  CREATE TYPE "public"."enum_marketing_approvals_risk_flags_severity" AS ENUM('low', 'medium', 'high');
  CREATE TYPE "public"."enum_marketing_approvals_status" AS ENUM('draft', 'needs_review', 'approved', 'scheduled', 'rejected');
  CREATE TYPE "public"."enum_marketing_approvals_source_system" AS ENUM('hermes', 'codex', 'claude', 'manual');
  CREATE TYPE "public"."enum_marketing_approvals_channel" AS ENUM('cms', 'postiz', 'blog', 'campaign', 'email');
  CREATE TYPE "public"."enum_media_asset_role" AS ENUM('page', 'blog', 'open-graph', 'workshop-proof', 'document');
  CREATE TABLE "users_sessions" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp(3) with time zone,
	"expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"role" "enum_users_role" DEFAULT 'client-reviewer' NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"email" varchar NOT NULL,
	"reset_password_token" varchar,
	"reset_password_expiration" timestamp(3) with time zone,
	"salt" varchar,
	"hash" varchar,
	"login_attempts" numeric DEFAULT 0,
	"lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "blog_posts_topics" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar
  );

  CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"published_at" timestamp(3) with time zone,
	"excerpt" varchar,
	"hero_image_id" integer,
	"content" jsonb,
	"author_id" integer,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_canonical_path" varchar,
	"seo_focus_keyword" varchar,
	"seo_no_index" boolean DEFAULT false,
	"social_title" varchar,
	"social_description" varchar,
	"social_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_blog_posts_status" DEFAULT 'draft'
  );

  CREATE TABLE "_blog_posts_v_version_topics" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" serial PRIMARY KEY NOT NULL,
	"label" varchar,
	"_uuid" varchar
  );

  CREATE TABLE "_blog_posts_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_slug" varchar,
	"version_published_at" timestamp(3) with time zone,
	"version_excerpt" varchar,
	"version_hero_image_id" integer,
	"version_content" jsonb,
	"version_author_id" integer,
	"version_seo_meta_title" varchar,
	"version_seo_meta_description" varchar,
	"version_seo_canonical_path" varchar,
	"version_seo_focus_keyword" varchar,
	"version_seo_no_index" boolean DEFAULT false,
	"version_social_title" varchar,
	"version_social_description" varchar,
	"version_social_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__blog_posts_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "marketing_pages" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"path" varchar,
	"page_type" "enum_marketing_pages_page_type" DEFAULT 'standard',
	"excerpt" varchar,
	"hero_eyebrow" varchar,
	"hero_headline" varchar,
	"hero_lede" varchar,
	"hero_image_id" integer,
	"content" jsonb,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_canonical_path" varchar,
	"seo_focus_keyword" varchar,
	"seo_no_index" boolean DEFAULT false,
	"social_title" varchar,
	"social_description" varchar,
	"social_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_marketing_pages_status" DEFAULT 'draft'
  );

  CREATE TABLE "_marketing_pages_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_slug" varchar,
	"version_path" varchar,
	"version_page_type" "enum__marketing_pages_v_version_page_type" DEFAULT 'standard',
	"version_excerpt" varchar,
	"version_hero_eyebrow" varchar,
	"version_hero_headline" varchar,
	"version_hero_lede" varchar,
	"version_hero_image_id" integer,
	"version_content" jsonb,
	"version_seo_meta_title" varchar,
	"version_seo_meta_description" varchar,
	"version_seo_canonical_path" varchar,
	"version_seo_focus_keyword" varchar,
	"version_seo_no_index" boolean DEFAULT false,
	"version_social_title" varchar,
	"version_social_description" varchar,
	"version_social_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__marketing_pages_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "content_overrides" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar,
	"slug" varchar,
	"target_type" "enum_content_overrides_target_type" DEFAULT 'standard-page',
	"target_path" varchar,
	"summary" varchar,
	"hero_eyebrow" varchar,
	"hero_headline" varchar,
	"hero_lede" varchar,
	"hero_image_id" integer,
	"body" jsonb,
	"internal_notes" varchar,
	"seo_meta_title" varchar,
	"seo_meta_description" varchar,
	"seo_canonical_path" varchar,
	"seo_focus_keyword" varchar,
	"seo_no_index" boolean DEFAULT false,
	"social_title" varchar,
	"social_description" varchar,
	"social_image_id" integer,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"_status" "enum_content_overrides_status" DEFAULT 'draft'
  );

  CREATE TABLE "_content_overrides_v" (
	"id" serial PRIMARY KEY NOT NULL,
	"parent_id" integer,
	"version_title" varchar,
	"version_slug" varchar,
	"version_target_type" "enum__content_overrides_v_version_target_type" DEFAULT 'standard-page',
	"version_target_path" varchar,
	"version_summary" varchar,
	"version_hero_eyebrow" varchar,
	"version_hero_headline" varchar,
	"version_hero_lede" varchar,
	"version_hero_image_id" integer,
	"version_body" jsonb,
	"version_internal_notes" varchar,
	"version_seo_meta_title" varchar,
	"version_seo_meta_description" varchar,
	"version_seo_canonical_path" varchar,
	"version_seo_focus_keyword" varchar,
	"version_seo_no_index" boolean DEFAULT false,
	"version_social_title" varchar,
	"version_social_description" varchar,
	"version_social_image_id" integer,
	"version_updated_at" timestamp(3) with time zone,
	"version_created_at" timestamp(3) with time zone,
	"version__status" "enum__content_overrides_v_version_status" DEFAULT 'draft',
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"latest" boolean
  );

  CREATE TABLE "redirects" (
	"id" serial PRIMARY KEY NOT NULL,
	"from_path" varchar NOT NULL,
	"to_path" varchar NOT NULL,
	"status_code" "enum_redirects_status_code" DEFAULT '301' NOT NULL,
	"is_active" boolean DEFAULT true,
	"notes" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "enquiries" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_name" varchar NOT NULL,
	"email" varchar,
	"phone" varchar NOT NULL,
	"vehicle" varchar,
	"service_interest" "enum_enquiries_service_interest",
	"message" varchar NOT NULL,
	"source" "enum_enquiries_source" DEFAULT 'website' NOT NULL,
	"status" "enum_enquiries_status" DEFAULT 'new' NOT NULL,
	"internal_notes" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "marketing_approvals_risk_flags" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"severity" "enum_marketing_approvals_risk_flags_severity" DEFAULT 'medium' NOT NULL
  );

  CREATE TABLE "marketing_approvals_review_notes" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"note" varchar NOT NULL,
	"author_id" integer
  );

  CREATE TABLE "marketing_approvals" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"status" "enum_marketing_approvals_status" DEFAULT 'draft' NOT NULL,
	"source_system" "enum_marketing_approvals_source_system" DEFAULT 'hermes' NOT NULL,
	"channel" "enum_marketing_approvals_channel" DEFAULT 'cms' NOT NULL,
	"proposed_copy" varchar NOT NULL,
	"target_url" varchar,
	"scheduled_for" timestamp(3) with time zone,
	"related_blog_post_id" integer,
	"related_campaign_page_id" integer,
	"approved_by_id" integer,
	"approved_at" timestamp(3) with time zone,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "media" (
	"id" serial PRIMARY KEY NOT NULL,
	"alt" varchar NOT NULL,
	"caption" varchar,
	"asset_role" "enum_media_asset_role" DEFAULT 'page' NOT NULL,
	"source_url" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"url" varchar,
	"thumbnail_u_r_l" varchar,
	"filename" varchar,
	"mime_type" varchar,
	"filesize" numeric,
	"width" numeric,
	"height" numeric,
	"focal_x" numeric,
	"focal_y" numeric
  );

  CREATE TABLE "payload_kv" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar NOT NULL,
	"data" jsonb NOT NULL
  );

  CREATE TABLE "payload_locked_documents" (
	"id" serial PRIMARY KEY NOT NULL,
	"global_slug" varchar,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer,
	"blog_posts_id" integer,
	"marketing_pages_id" integer,
	"content_overrides_id" integer,
	"redirects_id" integer,
	"enquiries_id" integer,
	"marketing_approvals_id" integer,
	"media_id" integer
  );

  CREATE TABLE "payload_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"key" varchar,
	"value" jsonb,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_preferences_rels" (
	"id" serial PRIMARY KEY NOT NULL,
	"order" integer,
	"parent_id" integer NOT NULL,
	"path" varchar NOT NULL,
	"users_id" integer
  );

  CREATE TABLE "payload_migrations" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar,
	"batch" numeric,
	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "site_settings_marketing_social_links" (
	"_order" integer NOT NULL,
	"_parent_id" integer NOT NULL,
	"id" varchar PRIMARY KEY NOT NULL,
	"label" varchar NOT NULL,
	"url" varchar NOT NULL
  );

  CREATE TABLE "site_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"business_display_name" varchar DEFAULT 'Oak Flats Mufflermen' NOT NULL,
	"business_phone" varchar,
	"business_email" varchar,
	"business_address" varchar,
	"business_opening_hours" varchar,
	"marketing_announcement" varchar,
	"marketing_primary_call_to_action" varchar DEFAULT 'Call the workshop',
	"operator_notes" varchar,
	"updated_at" timestamp(3) with time zone,
	"created_at" timestamp(3) with time zone
  );

  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts_topics" ADD CONSTRAINT "blog_posts_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "blog_posts" ADD CONSTRAINT "blog_posts_social_image_id_media_id_fk" FOREIGN KEY ("social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v_version_topics" ADD CONSTRAINT "_blog_posts_v_version_topics_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_blog_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_parent_id_blog_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_author_id_users_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_blog_posts_v" ADD CONSTRAINT "_blog_posts_v_version_social_image_id_media_id_fk" FOREIGN KEY ("version_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_pages" ADD CONSTRAINT "marketing_pages_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_pages" ADD CONSTRAINT "marketing_pages_social_image_id_media_id_fk" FOREIGN KEY ("social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v" ADD CONSTRAINT "_marketing_pages_v_parent_id_marketing_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v" ADD CONSTRAINT "_marketing_pages_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v" ADD CONSTRAINT "_marketing_pages_v_version_social_image_id_media_id_fk" FOREIGN KEY ("version_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_overrides" ADD CONSTRAINT "content_overrides_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_overrides" ADD CONSTRAINT "content_overrides_social_image_id_media_id_fk" FOREIGN KEY ("social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_overrides_v" ADD CONSTRAINT "_content_overrides_v_parent_id_content_overrides_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_overrides_v" ADD CONSTRAINT "_content_overrides_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_overrides_v" ADD CONSTRAINT "_content_overrides_v_version_social_image_id_media_id_fk" FOREIGN KEY ("version_social_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_approvals_risk_flags" ADD CONSTRAINT "marketing_approvals_risk_flags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_approvals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_approvals_review_notes" ADD CONSTRAINT "marketing_approvals_review_notes_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_approvals_review_notes" ADD CONSTRAINT "marketing_approvals_review_notes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_approvals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_approvals" ADD CONSTRAINT "marketing_approvals_related_blog_post_id_blog_posts_id_fk" FOREIGN KEY ("related_blog_post_id") REFERENCES "public"."blog_posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_approvals" ADD CONSTRAINT "marketing_approvals_related_campaign_page_id_marketing_pages_id_fk" FOREIGN KEY ("related_campaign_page_id") REFERENCES "public"."marketing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "marketing_approvals" ADD CONSTRAINT "marketing_approvals_approved_by_id_users_id_fk" FOREIGN KEY ("approved_by_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_blog_posts_fk" FOREIGN KEY ("blog_posts_id") REFERENCES "public"."blog_posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_marketing_pages_fk" FOREIGN KEY ("marketing_pages_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_content_overrides_fk" FOREIGN KEY ("content_overrides_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_redirects_fk" FOREIGN KEY ("redirects_id") REFERENCES "public"."redirects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_enquiries_fk" FOREIGN KEY ("enquiries_id") REFERENCES "public"."enquiries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_marketing_approvals_fk" FOREIGN KEY ("marketing_approvals_id") REFERENCES "public"."marketing_approvals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_marketing_social_links" ADD CONSTRAINT "site_settings_marketing_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "blog_posts_topics_order_idx" ON "blog_posts_topics" USING btree ("_order");
  CREATE INDEX "blog_posts_topics_parent_id_idx" ON "blog_posts_topics" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "blog_posts_slug_idx" ON "blog_posts" USING btree ("slug");
  CREATE INDEX "blog_posts_hero_image_idx" ON "blog_posts" USING btree ("hero_image_id");
  CREATE INDEX "blog_posts_author_idx" ON "blog_posts" USING btree ("author_id");
  CREATE INDEX "blog_posts_social_social_image_idx" ON "blog_posts" USING btree ("social_image_id");
  CREATE INDEX "blog_posts_updated_at_idx" ON "blog_posts" USING btree ("updated_at");
  CREATE INDEX "blog_posts_created_at_idx" ON "blog_posts" USING btree ("created_at");
  CREATE INDEX "blog_posts__status_idx" ON "blog_posts" USING btree ("_status");
  CREATE INDEX "_blog_posts_v_version_topics_order_idx" ON "_blog_posts_v_version_topics" USING btree ("_order");
  CREATE INDEX "_blog_posts_v_version_topics_parent_id_idx" ON "_blog_posts_v_version_topics" USING btree ("_parent_id");
  CREATE INDEX "_blog_posts_v_parent_idx" ON "_blog_posts_v" USING btree ("parent_id");
  CREATE INDEX "_blog_posts_v_version_version_slug_idx" ON "_blog_posts_v" USING btree ("version_slug");
  CREATE INDEX "_blog_posts_v_version_version_hero_image_idx" ON "_blog_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_blog_posts_v_version_version_author_idx" ON "_blog_posts_v" USING btree ("version_author_id");
  CREATE INDEX "_blog_posts_v_version_social_version_social_image_idx" ON "_blog_posts_v" USING btree ("version_social_image_id");
  CREATE INDEX "_blog_posts_v_version_version_updated_at_idx" ON "_blog_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_blog_posts_v_version_version_created_at_idx" ON "_blog_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_blog_posts_v_version_version__status_idx" ON "_blog_posts_v" USING btree ("version__status");
  CREATE INDEX "_blog_posts_v_created_at_idx" ON "_blog_posts_v" USING btree ("created_at");
  CREATE INDEX "_blog_posts_v_updated_at_idx" ON "_blog_posts_v" USING btree ("updated_at");
  CREATE INDEX "_blog_posts_v_latest_idx" ON "_blog_posts_v" USING btree ("latest");
  CREATE UNIQUE INDEX "marketing_pages_slug_idx" ON "marketing_pages" USING btree ("slug");
  CREATE UNIQUE INDEX "marketing_pages_path_idx" ON "marketing_pages" USING btree ("path");
  CREATE INDEX "marketing_pages_hero_hero_image_idx" ON "marketing_pages" USING btree ("hero_image_id");
  CREATE INDEX "marketing_pages_social_social_image_idx" ON "marketing_pages" USING btree ("social_image_id");
  CREATE INDEX "marketing_pages_updated_at_idx" ON "marketing_pages" USING btree ("updated_at");
  CREATE INDEX "marketing_pages_created_at_idx" ON "marketing_pages" USING btree ("created_at");
  CREATE INDEX "marketing_pages__status_idx" ON "marketing_pages" USING btree ("_status");
  CREATE INDEX "_marketing_pages_v_parent_idx" ON "_marketing_pages_v" USING btree ("parent_id");
  CREATE INDEX "_marketing_pages_v_version_version_slug_idx" ON "_marketing_pages_v" USING btree ("version_slug");
  CREATE INDEX "_marketing_pages_v_version_version_path_idx" ON "_marketing_pages_v" USING btree ("version_path");
  CREATE INDEX "_marketing_pages_v_version_hero_version_hero_image_idx" ON "_marketing_pages_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_marketing_pages_v_version_social_version_social_image_idx" ON "_marketing_pages_v" USING btree ("version_social_image_id");
  CREATE INDEX "_marketing_pages_v_version_version_updated_at_idx" ON "_marketing_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_marketing_pages_v_version_version_created_at_idx" ON "_marketing_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_marketing_pages_v_version_version__status_idx" ON "_marketing_pages_v" USING btree ("version__status");
  CREATE INDEX "_marketing_pages_v_created_at_idx" ON "_marketing_pages_v" USING btree ("created_at");
  CREATE INDEX "_marketing_pages_v_updated_at_idx" ON "_marketing_pages_v" USING btree ("updated_at");
  CREATE INDEX "_marketing_pages_v_latest_idx" ON "_marketing_pages_v" USING btree ("latest");
  CREATE UNIQUE INDEX "content_overrides_slug_idx" ON "content_overrides" USING btree ("slug");
  CREATE UNIQUE INDEX "content_overrides_target_path_idx" ON "content_overrides" USING btree ("target_path");
  CREATE INDEX "content_overrides_hero_hero_image_idx" ON "content_overrides" USING btree ("hero_image_id");
  CREATE INDEX "content_overrides_social_social_image_idx" ON "content_overrides" USING btree ("social_image_id");
  CREATE INDEX "content_overrides_updated_at_idx" ON "content_overrides" USING btree ("updated_at");
  CREATE INDEX "content_overrides_created_at_idx" ON "content_overrides" USING btree ("created_at");
  CREATE INDEX "content_overrides__status_idx" ON "content_overrides" USING btree ("_status");
  CREATE INDEX "_content_overrides_v_parent_idx" ON "_content_overrides_v" USING btree ("parent_id");
  CREATE INDEX "_content_overrides_v_version_version_slug_idx" ON "_content_overrides_v" USING btree ("version_slug");
  CREATE INDEX "_content_overrides_v_version_version_target_path_idx" ON "_content_overrides_v" USING btree ("version_target_path");
  CREATE INDEX "_content_overrides_v_version_hero_version_hero_image_idx" ON "_content_overrides_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_content_overrides_v_version_social_version_social_image_idx" ON "_content_overrides_v" USING btree ("version_social_image_id");
  CREATE INDEX "_content_overrides_v_version_version_updated_at_idx" ON "_content_overrides_v" USING btree ("version_updated_at");
  CREATE INDEX "_content_overrides_v_version_version_created_at_idx" ON "_content_overrides_v" USING btree ("version_created_at");
  CREATE INDEX "_content_overrides_v_version_version__status_idx" ON "_content_overrides_v" USING btree ("version__status");
  CREATE INDEX "_content_overrides_v_created_at_idx" ON "_content_overrides_v" USING btree ("created_at");
  CREATE INDEX "_content_overrides_v_updated_at_idx" ON "_content_overrides_v" USING btree ("updated_at");
  CREATE INDEX "_content_overrides_v_latest_idx" ON "_content_overrides_v" USING btree ("latest");
  CREATE UNIQUE INDEX "redirects_from_path_idx" ON "redirects" USING btree ("from_path");
  CREATE INDEX "redirects_updated_at_idx" ON "redirects" USING btree ("updated_at");
  CREATE INDEX "redirects_created_at_idx" ON "redirects" USING btree ("created_at");
  CREATE INDEX "enquiries_updated_at_idx" ON "enquiries" USING btree ("updated_at");
  CREATE INDEX "enquiries_created_at_idx" ON "enquiries" USING btree ("created_at");
  CREATE INDEX "marketing_approvals_risk_flags_order_idx" ON "marketing_approvals_risk_flags" USING btree ("_order");
  CREATE INDEX "marketing_approvals_risk_flags_parent_id_idx" ON "marketing_approvals_risk_flags" USING btree ("_parent_id");
  CREATE INDEX "marketing_approvals_review_notes_order_idx" ON "marketing_approvals_review_notes" USING btree ("_order");
  CREATE INDEX "marketing_approvals_review_notes_parent_id_idx" ON "marketing_approvals_review_notes" USING btree ("_parent_id");
  CREATE INDEX "marketing_approvals_review_notes_author_idx" ON "marketing_approvals_review_notes" USING btree ("author_id");
  CREATE INDEX "marketing_approvals_related_blog_post_idx" ON "marketing_approvals" USING btree ("related_blog_post_id");
  CREATE INDEX "marketing_approvals_related_campaign_page_idx" ON "marketing_approvals" USING btree ("related_campaign_page_id");
  CREATE INDEX "marketing_approvals_approved_by_idx" ON "marketing_approvals" USING btree ("approved_by_id");
  CREATE INDEX "marketing_approvals_updated_at_idx" ON "marketing_approvals" USING btree ("updated_at");
  CREATE INDEX "marketing_approvals_created_at_idx" ON "marketing_approvals" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_blog_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("blog_posts_id");
  CREATE INDEX "payload_locked_documents_rels_marketing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("marketing_pages_id");
  CREATE INDEX "payload_locked_documents_rels_content_overrides_id_idx" ON "payload_locked_documents_rels" USING btree ("content_overrides_id");
  CREATE INDEX "payload_locked_documents_rels_redirects_id_idx" ON "payload_locked_documents_rels" USING btree ("redirects_id");
  CREATE INDEX "payload_locked_documents_rels_enquiries_id_idx" ON "payload_locked_documents_rels" USING btree ("enquiries_id");
  CREATE INDEX "payload_locked_documents_rels_marketing_approvals_id_idx" ON "payload_locked_documents_rels" USING btree ("marketing_approvals_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "site_settings_marketing_social_links_order_idx" ON "site_settings_marketing_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_marketing_social_links_parent_id_idx" ON "site_settings_marketing_social_links" USING btree ("_parent_id");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "blog_posts_topics" CASCADE;
  DROP TABLE "blog_posts" CASCADE;
  DROP TABLE "_blog_posts_v_version_topics" CASCADE;
  DROP TABLE "_blog_posts_v" CASCADE;
  DROP TABLE "marketing_pages" CASCADE;
  DROP TABLE "_marketing_pages_v" CASCADE;
  DROP TABLE "content_overrides" CASCADE;
  DROP TABLE "_content_overrides_v" CASCADE;
  DROP TABLE "redirects" CASCADE;
  DROP TABLE "enquiries" CASCADE;
  DROP TABLE "marketing_approvals_risk_flags" CASCADE;
  DROP TABLE "marketing_approvals_review_notes" CASCADE;
  DROP TABLE "marketing_approvals" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings_marketing_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_blog_posts_status";
  DROP TYPE "public"."enum__blog_posts_v_version_status";
  DROP TYPE "public"."enum_marketing_pages_page_type";
  DROP TYPE "public"."enum_marketing_pages_status";
  DROP TYPE "public"."enum__marketing_pages_v_version_page_type";
  DROP TYPE "public"."enum__marketing_pages_v_version_status";
  DROP TYPE "public"."enum_content_overrides_target_type";
  DROP TYPE "public"."enum_content_overrides_status";
  DROP TYPE "public"."enum__content_overrides_v_version_target_type";
  DROP TYPE "public"."enum__content_overrides_v_version_status";
  DROP TYPE "public"."enum_redirects_status_code";
  DROP TYPE "public"."enum_enquiries_service_interest";
  DROP TYPE "public"."enum_enquiries_source";
  DROP TYPE "public"."enum_enquiries_status";
  DROP TYPE "public"."enum_marketing_approvals_risk_flags_severity";
  DROP TYPE "public"."enum_marketing_approvals_status";
  DROP TYPE "public"."enum_marketing_approvals_source_system";
  DROP TYPE "public"."enum_marketing_approvals_channel";
  DROP TYPE "public"."enum_media_asset_role";`)
}
