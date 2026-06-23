import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_sover_services_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_sover_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_wtrust_testimonials_tone" AS ENUM('red', 'amber', 'teal', 'green', 'obsidian');
  CREATE TYPE "public"."enum_wtrust_testimonials_span" AS ENUM('short', 'regular', 'tall');
  CREATE TYPE "public"."enum_scta_assurances_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_scta_tone" AS ENUM('carbon', 'metallic');
  CREATE TYPE "public"."enum_pserve_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_pserve_included_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_sentiment_tone" AS ENUM('red', 'amber', 'teal', 'green');
  CREATE TYPE "public"."enum_tstshow_testimonials_tone" AS ENUM('red', 'amber', 'teal', 'green', 'obsidian');
  CREATE TYPE "public"."enum_tstshow_testimonials_span" AS ENUM('short', 'regular', 'tall');
  CREATE TYPE "public"."enum_promo_stats_tone" AS ENUM('red', 'amber', 'teal', 'green');
  CREATE TYPE "public"."enum_tfh_primary_action_tone" AS ENUM('red', 'chrome', 'ghost');
  CREATE TYPE "public"."enum_tfh_secondary_action_tone" AS ENUM('red', 'chrome', 'ghost');
  CREATE TYPE "public"."enum_tfh_layout" AS ENUM('left-aligned', 'centered', 'split-credit');
  CREATE TYPE "public"."enum_fgrid_features_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_fgrid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_fspot_bullets_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_twall_entries_tone" AS ENUM('red', 'amber', 'teal', 'green', 'obsidian');
  CREATE TYPE "public"."enum_twall_entries_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum_twall_entries_span" AS ENUM('short', 'regular', 'tall');
  CREATE TYPE "public"."enum_pcta_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum_lcloud_entries_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_stats_entries_tone" AS ENUM('red', 'amber', 'teal', 'green');
  CREATE TYPE "public"."enum_fmega_socials_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_psteps_steps_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__sover_v_services_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__sover_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__wtrust_v_testimonials_tone" AS ENUM('red', 'amber', 'teal', 'green', 'obsidian');
  CREATE TYPE "public"."enum__wtrust_v_testimonials_span" AS ENUM('short', 'regular', 'tall');
  CREATE TYPE "public"."enum__scta_v_assurances_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__scta_v_tone" AS ENUM('carbon', 'metallic');
  CREATE TYPE "public"."enum__pserve_v_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__pserve_v_included_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__sentiment_v_tone" AS ENUM('red', 'amber', 'teal', 'green');
  CREATE TYPE "public"."enum__tstshow_v_testimonials_tone" AS ENUM('red', 'amber', 'teal', 'green', 'obsidian');
  CREATE TYPE "public"."enum__tstshow_v_testimonials_span" AS ENUM('short', 'regular', 'tall');
  CREATE TYPE "public"."enum__promo_v_stats_tone" AS ENUM('red', 'amber', 'teal', 'green');
  CREATE TYPE "public"."enum__tfh_v_primary_action_tone" AS ENUM('red', 'chrome', 'ghost');
  CREATE TYPE "public"."enum__tfh_v_secondary_action_tone" AS ENUM('red', 'chrome', 'ghost');
  CREATE TYPE "public"."enum__tfh_v_layout" AS ENUM('left-aligned', 'centered', 'split-credit');
  CREATE TYPE "public"."enum__fgrid_v_features_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__fgrid_v_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__fspot_v_bullets_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__twall_v_entries_tone" AS ENUM('red', 'amber', 'teal', 'green', 'obsidian');
  CREATE TYPE "public"."enum__twall_v_entries_rating" AS ENUM('1', '2', '3', '4', '5');
  CREATE TYPE "public"."enum__twall_v_entries_span" AS ENUM('short', 'regular', 'tall');
  CREATE TYPE "public"."enum__pcta_v_actions_variant" AS ENUM('primary', 'secondary');
  CREATE TYPE "public"."enum__lcloud_v_entries_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__stats_v_entries_tone" AS ENUM('red', 'amber', 'teal', 'green');
  CREATE TYPE "public"."enum__fmega_v_socials_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum__psteps_v_steps_icon" AS ENUM('wrench', 'gauge', 'shield-check', 'badge-check', 'flame', 'car', 'truck', 'settings', 'hammer', 'volume-2', 'timer', 'zap', 'phone', 'map-pin', 'clock', 'calendar', 'message-circle', 'star', 'check', 'award', 'thumbs-up', 'dollar-sign', 'tag', 'quote', 'sparkles', 'arrow-right');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  ALTER TYPE "public"."enum_marketing_pages_page_type" ADD VALUE 'landing' BEFORE 'standard';
  ALTER TYPE "public"."enum__marketing_pages_v_version_page_type" ADD VALUE 'landing' BEFORE 'standard';
  ALTER TYPE "public"."enum_media_asset_role" ADD VALUE 'brand';
  ALTER TYPE "public"."enum_media_asset_role" ADD VALUE 'cinematic';
  ALTER TYPE "public"."enum_media_asset_role" ADD VALUE 'generated';
  ALTER TYPE "public"."enum_media_asset_role" ADD VALUE 'icon';
  ALTER TYPE "public"."enum_media_asset_role" ADD VALUE 'marketing';
  CREATE TABLE "whero_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"line" varchar
  );
  
  CREATE TABLE "whero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"subhead" varchar,
  	"primary_label" varchar,
  	"primary_href" varchar,
  	"secondary_label" varchar,
  	"secondary_href" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "vhero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subhead" varchar,
  	"video_id" integer,
  	"poster_image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"timestamp_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "sover_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_sover_services_icon",
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "sover" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"columns" "enum_sover_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "wtrust_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5,
  	"tone" "enum_wtrust_testimonials_tone",
  	"span" "enum_wtrust_testimonials_span"
  );
  
  CREATE TABLE "wtrust_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "wtrust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "beforeafter_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"before_image_id" integer,
  	"before_alt" varchar,
  	"after_image_id" integer,
  	"after_alt" varchar,
  	"result" varchar
  );
  
  CREATE TABLE "beforeafter" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "scta_assurances" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_scta_assurances_icon",
  	"label" varchar
  );
  
  CREATE TABLE "scta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"tone" "enum_scta_tone" DEFAULT 'carbon',
  	"block_name" varchar
  );
  
  CREATE TABLE "pserve_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"caption" varchar,
  	"popular" boolean DEFAULT false
  );
  
  CREATE TABLE "pserve_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pserve_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar
  );
  
  CREATE TABLE "pserve_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pserve_actions_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pserve_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_pserve_included_icon",
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pserve" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"footnote" varchar,
  	"included_heading" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "tstshow_summary_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"stars" numeric,
  	"count" numeric
  );
  
  CREATE TABLE "sentiment" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"tone" "enum_sentiment_tone" DEFAULT 'teal'
  );
  
  CREATE TABLE "tstshow_summary_trend" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric
  );
  
  CREATE TABLE "tstshow_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5,
  	"tone" "enum_tstshow_testimonials_tone",
  	"span" "enum_tstshow_testimonials_span"
  );
  
  CREATE TABLE "tstshow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"summary_overall_rating" numeric,
  	"summary_total_reviews" numeric,
  	"summary_recommend_percentage" numeric,
  	"summary_meta" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "promo_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"decimals" numeric,
  	"tone" "enum_promo_stats_tone"
  );
  
  CREATE TABLE "promo_spotlight_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "promo" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"offer_label" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"spotlight_image_id" integer,
  	"spotlight_image_alt" varchar,
  	"spotlight_heading" varchar,
  	"spotlight_body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "cenq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "tfh_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "tfh" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_tone" "enum_tfh_primary_action_tone" DEFAULT 'red',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_tone" "enum_tfh_secondary_action_tone",
  	"layout" "enum_tfh_layout" DEFAULT 'left-aligned',
  	"credit" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "fgrid_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_fgrid_features_icon",
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"link_label" varchar
  );
  
  CREATE TABLE "fgrid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"columns" "enum_fgrid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "fspot_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_fspot_bullets_icon",
  	"label" varchar
  );
  
  CREATE TABLE "fspot" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"reversed" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "twall_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"tone" "enum_twall_entries_tone",
  	"rating" "enum_twall_entries_rating",
  	"span" "enum_twall_entries_span"
  );
  
  CREATE TABLE "twall" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pcta_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"caption" varchar,
  	"popular" boolean DEFAULT false
  );
  
  CREATE TABLE "pcta_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar
  );
  
  CREATE TABLE "pcta_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pcta_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum_pcta_actions_variant" DEFAULT 'primary'
  );
  
  CREATE TABLE "pcta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"footnote" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "faqacc_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"default_open" boolean DEFAULT false
  );
  
  CREATE TABLE "faqacc" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "lcloud_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"icon" "enum_lcloud_entries_icon"
  );
  
  CREATE TABLE "lcloud" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "stats_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric DEFAULT 0,
  	"decimals" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"body" varchar,
  	"tone" "enum_stats_entries_tone" DEFAULT 'amber'
  );
  
  CREATE TABLE "stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "newscta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"privacy_note" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "fmega_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "fmega_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar
  );
  
  CREATE TABLE "fmega_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "fmega_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"icon" "enum_fmega_socials_icon"
  );
  
  CREATE TABLE "fmega_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar
  );
  
  CREATE TABLE "fmega_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "fmega" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"brand" varchar,
  	"description" varchar,
  	"legal" varchar,
  	"selected_region" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "psteps_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_psteps_steps_icon",
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "psteps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_whero_v_headline_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"line" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_whero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"subhead" varchar,
  	"primary_label" varchar,
  	"primary_href" varchar,
  	"secondary_label" varchar,
  	"secondary_href" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_vhero_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"headline" varchar,
  	"subhead" varchar,
  	"video_id" integer,
  	"poster_image_id" integer,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"timestamp_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_sover_v_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__sover_v_services_icon",
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sover_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"columns" "enum__sover_v_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_wtrust_v_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5,
  	"tone" "enum__wtrust_v_testimonials_tone",
  	"span" "enum__wtrust_v_testimonials_span",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_wtrust_v_brands" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_wtrust_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_beforeafter_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"summary" varchar,
  	"before_image_id" integer,
  	"before_alt" varchar,
  	"after_image_id" integer,
  	"after_alt" varchar,
  	"result" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_beforeafter_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_scta_v_assurances" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__scta_v_assurances_icon",
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_scta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"tone" "enum__scta_v_tone" DEFAULT 'carbon',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pserve_v_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"caption" varchar,
  	"popular" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pserve_v_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pserve_v_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pserve_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pserve_v_actions_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pserve_v_included" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__pserve_v_included_icon",
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pserve_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"footnote" varchar,
  	"included_heading" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tstshow_v_summary_tiers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"stars" numeric,
  	"count" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_sentiment_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"tone" "enum__sentiment_v_tone" DEFAULT 'teal',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tstshow_v_summary_trend" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tstshow_v_testimonials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"rating" numeric DEFAULT 5,
  	"tone" "enum__tstshow_v_testimonials_tone",
  	"span" "enum__tstshow_v_testimonials_span",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tstshow_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"summary_overall_rating" numeric,
  	"summary_total_reviews" numeric,
  	"summary_recommend_percentage" numeric,
  	"summary_meta" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_promo_v_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"decimals" numeric,
  	"tone" "enum__promo_v_stats_tone",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_promo_v_spotlight_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_promo_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"offer_label" varchar,
  	"cta_label" varchar,
  	"cta_href" varchar,
  	"spotlight_image_id" integer,
  	"spotlight_image_alt" varchar,
  	"spotlight_heading" varchar,
  	"spotlight_body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_cenq_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"show_contact_details" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_tfh_v_trust" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_tfh_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"headline" varchar,
  	"subhead" varchar,
  	"primary_action_label" varchar,
  	"primary_action_href" varchar,
  	"primary_action_tone" "enum__tfh_v_primary_action_tone" DEFAULT 'red',
  	"secondary_action_label" varchar,
  	"secondary_action_href" varchar,
  	"secondary_action_tone" "enum__tfh_v_secondary_action_tone",
  	"layout" "enum__tfh_v_layout" DEFAULT 'left-aligned',
  	"credit" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_fgrid_v_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__fgrid_v_features_icon",
  	"title" varchar,
  	"description" varchar,
  	"href" varchar,
  	"link_label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fgrid_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"columns" "enum__fgrid_v_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_fspot_v_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__fspot_v_bullets_icon",
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fspot_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"action_label" varchar,
  	"action_href" varchar,
  	"reversed" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_twall_v_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"quote" varchar,
  	"name" varchar,
  	"role" varchar,
  	"tone" "enum__twall_v_entries_tone",
  	"rating" "enum__twall_v_entries_rating",
  	"span" "enum__twall_v_entries_span",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_twall_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pcta_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"caption" varchar,
  	"popular" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pcta_v_rows_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pcta_v_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"feature" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pcta_v_actions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"variant" "enum__pcta_v_actions_variant" DEFAULT 'primary',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pcta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"footnote" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_faqacc_v_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"default_open" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_faqacc_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_lcloud_v_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"icon" "enum__lcloud_v_entries_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_lcloud_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_stats_v_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" numeric DEFAULT 0,
  	"decimals" numeric,
  	"prefix" varchar,
  	"suffix" varchar,
  	"body" varchar,
  	"tone" "enum__stats_v_entries_tone" DEFAULT 'amber',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_stats_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_newscta_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"cta_label" varchar,
  	"privacy_note" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_fmega_v_columns_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fmega_v_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fmega_v_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fmega_v_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"icon" "enum__fmega_v_socials_icon",
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fmega_v_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fmega_v_regions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"code" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_fmega_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"brand" varchar,
  	"description" varchar,
  	"legal" varchar,
  	"selected_region" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_psteps_v_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__psteps_v_steps_icon",
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_psteps_v" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kicker" varchar,
  	"heading" varchar,
  	"body" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "media_tags" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "site_settings_marketing_footer_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_social_profiles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_robots_additional_disallow" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings_local_business_opening_hours" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"days" varchar NOT NULL,
  	"opens" varchar NOT NULL,
  	"closes" varchar NOT NULL
  );
  
  CREATE TABLE "seo_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title_template" varchar DEFAULT '%s | Oak Flats Mufflermen',
  	"default_title" varchar DEFAULT 'Oak Flats Mufflermen | Performance Exhaust Systems NSW',
  	"default_description" varchar DEFAULT 'Oak Flats Mufflermen builds custom exhaust systems, muffler repairs, extractors, chrome tips, exhaust parts and intake upgrades across the Illawarra.',
  	"default_og_image_id" integer,
  	"robots_site_no_index" boolean DEFAULT false,
  	"verification_google" varchar,
  	"verification_bing" varchar,
  	"local_business_legal_name" varchar,
  	"local_business_telephone" varchar,
  	"local_business_price_range" varchar DEFAULT '$$',
  	"local_business_latitude" numeric,
  	"local_business_longitude" numeric,
  	"local_business_street_address" varchar,
  	"local_business_locality" varchar,
  	"local_business_region" varchar DEFAULT 'NSW',
  	"local_business_postcode" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "_blog_posts_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "marketing_pages" ADD COLUMN "show_hero" boolean DEFAULT true;
  ALTER TABLE "marketing_pages" ADD COLUMN "show_contact_band" boolean DEFAULT true;
  ALTER TABLE "_marketing_pages_v" ADD COLUMN "version_show_hero" boolean DEFAULT true;
  ALTER TABLE "_marketing_pages_v" ADD COLUMN "version_show_contact_band" boolean DEFAULT true;
  ALTER TABLE "_marketing_pages_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "media" ADD COLUMN "credit" varchar;
  ALTER TABLE "media" ADD COLUMN "folder_id" integer;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_thumbnail_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_card_filename" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filename" varchar;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_folders_id" integer;
  ALTER TABLE "whero_headline_lines" ADD CONSTRAINT "whero_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."whero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "whero" ADD CONSTRAINT "whero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vhero" ADD CONSTRAINT "vhero_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vhero" ADD CONSTRAINT "vhero_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "vhero" ADD CONSTRAINT "vhero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sover_services" ADD CONSTRAINT "sover_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."sover"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sover" ADD CONSTRAINT "sover_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wtrust_testimonials" ADD CONSTRAINT "wtrust_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wtrust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wtrust_brands" ADD CONSTRAINT "wtrust_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."wtrust"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "wtrust" ADD CONSTRAINT "wtrust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "beforeafter_items" ADD CONSTRAINT "beforeafter_items_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "beforeafter_items" ADD CONSTRAINT "beforeafter_items_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "beforeafter_items" ADD CONSTRAINT "beforeafter_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."beforeafter"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "beforeafter" ADD CONSTRAINT "beforeafter_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scta_assurances" ADD CONSTRAINT "scta_assurances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."scta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "scta" ADD CONSTRAINT "scta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pserve_tiers" ADD CONSTRAINT "pserve_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pserve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pserve_rows_values" ADD CONSTRAINT "pserve_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pserve_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pserve_rows" ADD CONSTRAINT "pserve_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pserve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pserve_actions" ADD CONSTRAINT "pserve_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pserve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pserve_included" ADD CONSTRAINT "pserve_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pserve"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pserve" ADD CONSTRAINT "pserve_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tstshow_summary_tiers" ADD CONSTRAINT "tstshow_summary_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tstshow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "sentiment" ADD CONSTRAINT "sentiment_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tstshow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tstshow_summary_trend" ADD CONSTRAINT "tstshow_summary_trend_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tstshow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tstshow_testimonials" ADD CONSTRAINT "tstshow_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tstshow"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tstshow" ADD CONSTRAINT "tstshow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promo_stats" ADD CONSTRAINT "promo_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promo_spotlight_bullets" ADD CONSTRAINT "promo_spotlight_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."promo"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "promo" ADD CONSTRAINT "promo_spotlight_image_id_media_id_fk" FOREIGN KEY ("spotlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "promo" ADD CONSTRAINT "promo_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cenq" ADD CONSTRAINT "cenq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tfh_trust" ADD CONSTRAINT "tfh_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tfh"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tfh" ADD CONSTRAINT "tfh_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fgrid_features" ADD CONSTRAINT "fgrid_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fgrid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fgrid" ADD CONSTRAINT "fgrid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fspot_bullets" ADD CONSTRAINT "fspot_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fspot"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fspot" ADD CONSTRAINT "fspot_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "fspot" ADD CONSTRAINT "fspot_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "twall_entries" ADD CONSTRAINT "twall_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."twall"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "twall" ADD CONSTRAINT "twall_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcta_columns" ADD CONSTRAINT "pcta_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcta_rows_values" ADD CONSTRAINT "pcta_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcta_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcta_rows" ADD CONSTRAINT "pcta_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcta_actions" ADD CONSTRAINT "pcta_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pcta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pcta" ADD CONSTRAINT "pcta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqacc_items" ADD CONSTRAINT "faqacc_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqacc"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqacc" ADD CONSTRAINT "faqacc_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lcloud_entries" ADD CONSTRAINT "lcloud_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."lcloud"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "lcloud" ADD CONSTRAINT "lcloud_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats_entries" ADD CONSTRAINT "stats_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stats" ADD CONSTRAINT "stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "newscta" ADD CONSTRAINT "newscta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega_columns_links" ADD CONSTRAINT "fmega_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fmega_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega_columns" ADD CONSTRAINT "fmega_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fmega"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega_contact" ADD CONSTRAINT "fmega_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fmega"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega_socials" ADD CONSTRAINT "fmega_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fmega"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega_legal_links" ADD CONSTRAINT "fmega_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fmega"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega_regions" ADD CONSTRAINT "fmega_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."fmega"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "fmega" ADD CONSTRAINT "fmega_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "psteps_steps" ADD CONSTRAINT "psteps_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."psteps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "psteps" ADD CONSTRAINT "psteps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_whero_v_headline_lines" ADD CONSTRAINT "_whero_v_headline_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_whero_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_whero_v" ADD CONSTRAINT "_whero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_vhero_v" ADD CONSTRAINT "_vhero_v_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vhero_v" ADD CONSTRAINT "_vhero_v_poster_image_id_media_id_fk" FOREIGN KEY ("poster_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_vhero_v" ADD CONSTRAINT "_vhero_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sover_v_services" ADD CONSTRAINT "_sover_v_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_sover_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sover_v" ADD CONSTRAINT "_sover_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wtrust_v_testimonials" ADD CONSTRAINT "_wtrust_v_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wtrust_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wtrust_v_brands" ADD CONSTRAINT "_wtrust_v_brands_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_wtrust_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_wtrust_v" ADD CONSTRAINT "_wtrust_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_beforeafter_v_items" ADD CONSTRAINT "_beforeafter_v_items_before_image_id_media_id_fk" FOREIGN KEY ("before_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_beforeafter_v_items" ADD CONSTRAINT "_beforeafter_v_items_after_image_id_media_id_fk" FOREIGN KEY ("after_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_beforeafter_v_items" ADD CONSTRAINT "_beforeafter_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_beforeafter_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_beforeafter_v" ADD CONSTRAINT "_beforeafter_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scta_v_assurances" ADD CONSTRAINT "_scta_v_assurances_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_scta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_scta_v" ADD CONSTRAINT "_scta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pserve_v_tiers" ADD CONSTRAINT "_pserve_v_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pserve_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pserve_v_rows_values" ADD CONSTRAINT "_pserve_v_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pserve_v_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pserve_v_rows" ADD CONSTRAINT "_pserve_v_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pserve_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pserve_v_actions" ADD CONSTRAINT "_pserve_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pserve_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pserve_v_included" ADD CONSTRAINT "_pserve_v_included_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pserve_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pserve_v" ADD CONSTRAINT "_pserve_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tstshow_v_summary_tiers" ADD CONSTRAINT "_tstshow_v_summary_tiers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tstshow_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_sentiment_v" ADD CONSTRAINT "_sentiment_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tstshow_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tstshow_v_summary_trend" ADD CONSTRAINT "_tstshow_v_summary_trend_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tstshow_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tstshow_v_testimonials" ADD CONSTRAINT "_tstshow_v_testimonials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tstshow_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tstshow_v" ADD CONSTRAINT "_tstshow_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_promo_v_stats" ADD CONSTRAINT "_promo_v_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_promo_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_promo_v_spotlight_bullets" ADD CONSTRAINT "_promo_v_spotlight_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_promo_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_promo_v" ADD CONSTRAINT "_promo_v_spotlight_image_id_media_id_fk" FOREIGN KEY ("spotlight_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_promo_v" ADD CONSTRAINT "_promo_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_cenq_v" ADD CONSTRAINT "_cenq_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tfh_v_trust" ADD CONSTRAINT "_tfh_v_trust_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_tfh_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_tfh_v" ADD CONSTRAINT "_tfh_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fgrid_v_features" ADD CONSTRAINT "_fgrid_v_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fgrid_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fgrid_v" ADD CONSTRAINT "_fgrid_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fspot_v_bullets" ADD CONSTRAINT "_fspot_v_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fspot_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fspot_v" ADD CONSTRAINT "_fspot_v_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_fspot_v" ADD CONSTRAINT "_fspot_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_twall_v_entries" ADD CONSTRAINT "_twall_v_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_twall_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_twall_v" ADD CONSTRAINT "_twall_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcta_v_columns" ADD CONSTRAINT "_pcta_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcta_v_rows_values" ADD CONSTRAINT "_pcta_v_rows_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcta_v_rows"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcta_v_rows" ADD CONSTRAINT "_pcta_v_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcta_v_actions" ADD CONSTRAINT "_pcta_v_actions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pcta_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pcta_v" ADD CONSTRAINT "_pcta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqacc_v_items" ADD CONSTRAINT "_faqacc_v_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_faqacc_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_faqacc_v" ADD CONSTRAINT "_faqacc_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lcloud_v_entries" ADD CONSTRAINT "_lcloud_v_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_lcloud_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_lcloud_v" ADD CONSTRAINT "_lcloud_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stats_v_entries" ADD CONSTRAINT "_stats_v_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_stats_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_stats_v" ADD CONSTRAINT "_stats_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_newscta_v" ADD CONSTRAINT "_newscta_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v_columns_links" ADD CONSTRAINT "_fmega_v_columns_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fmega_v_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v_columns" ADD CONSTRAINT "_fmega_v_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fmega_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v_contact" ADD CONSTRAINT "_fmega_v_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fmega_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v_socials" ADD CONSTRAINT "_fmega_v_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fmega_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v_legal_links" ADD CONSTRAINT "_fmega_v_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fmega_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v_regions" ADD CONSTRAINT "_fmega_v_regions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_fmega_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_fmega_v" ADD CONSTRAINT "_fmega_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_psteps_v_steps" ADD CONSTRAINT "_psteps_v_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_psteps_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_psteps_v" ADD CONSTRAINT "_psteps_v_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "media_tags" ADD CONSTRAINT "media_tags_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "site_settings_marketing_footer_links" ADD CONSTRAINT "site_settings_marketing_footer_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_social_profiles" ADD CONSTRAINT "seo_settings_social_profiles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_robots_additional_disallow" ADD CONSTRAINT "seo_settings_robots_additional_disallow_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings_local_business_opening_hours" ADD CONSTRAINT "seo_settings_local_business_opening_hours_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."seo_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "seo_settings" ADD CONSTRAINT "seo_settings_default_og_image_id_media_id_fk" FOREIGN KEY ("default_og_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "whero_headline_lines_order_idx" ON "whero_headline_lines" USING btree ("_order");
  CREATE INDEX "whero_headline_lines_parent_id_idx" ON "whero_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "whero_order_idx" ON "whero" USING btree ("_order");
  CREATE INDEX "whero_parent_id_idx" ON "whero" USING btree ("_parent_id");
  CREATE INDEX "whero_path_idx" ON "whero" USING btree ("_path");
  CREATE INDEX "vhero_order_idx" ON "vhero" USING btree ("_order");
  CREATE INDEX "vhero_parent_id_idx" ON "vhero" USING btree ("_parent_id");
  CREATE INDEX "vhero_path_idx" ON "vhero" USING btree ("_path");
  CREATE INDEX "vhero_video_idx" ON "vhero" USING btree ("video_id");
  CREATE INDEX "vhero_poster_image_idx" ON "vhero" USING btree ("poster_image_id");
  CREATE INDEX "sover_services_order_idx" ON "sover_services" USING btree ("_order");
  CREATE INDEX "sover_services_parent_id_idx" ON "sover_services" USING btree ("_parent_id");
  CREATE INDEX "sover_order_idx" ON "sover" USING btree ("_order");
  CREATE INDEX "sover_parent_id_idx" ON "sover" USING btree ("_parent_id");
  CREATE INDEX "sover_path_idx" ON "sover" USING btree ("_path");
  CREATE INDEX "wtrust_testimonials_order_idx" ON "wtrust_testimonials" USING btree ("_order");
  CREATE INDEX "wtrust_testimonials_parent_id_idx" ON "wtrust_testimonials" USING btree ("_parent_id");
  CREATE INDEX "wtrust_brands_order_idx" ON "wtrust_brands" USING btree ("_order");
  CREATE INDEX "wtrust_brands_parent_id_idx" ON "wtrust_brands" USING btree ("_parent_id");
  CREATE INDEX "wtrust_order_idx" ON "wtrust" USING btree ("_order");
  CREATE INDEX "wtrust_parent_id_idx" ON "wtrust" USING btree ("_parent_id");
  CREATE INDEX "wtrust_path_idx" ON "wtrust" USING btree ("_path");
  CREATE INDEX "beforeafter_items_order_idx" ON "beforeafter_items" USING btree ("_order");
  CREATE INDEX "beforeafter_items_parent_id_idx" ON "beforeafter_items" USING btree ("_parent_id");
  CREATE INDEX "beforeafter_items_before_image_idx" ON "beforeafter_items" USING btree ("before_image_id");
  CREATE INDEX "beforeafter_items_after_image_idx" ON "beforeafter_items" USING btree ("after_image_id");
  CREATE INDEX "beforeafter_order_idx" ON "beforeafter" USING btree ("_order");
  CREATE INDEX "beforeafter_parent_id_idx" ON "beforeafter" USING btree ("_parent_id");
  CREATE INDEX "beforeafter_path_idx" ON "beforeafter" USING btree ("_path");
  CREATE INDEX "scta_assurances_order_idx" ON "scta_assurances" USING btree ("_order");
  CREATE INDEX "scta_assurances_parent_id_idx" ON "scta_assurances" USING btree ("_parent_id");
  CREATE INDEX "scta_order_idx" ON "scta" USING btree ("_order");
  CREATE INDEX "scta_parent_id_idx" ON "scta" USING btree ("_parent_id");
  CREATE INDEX "scta_path_idx" ON "scta" USING btree ("_path");
  CREATE INDEX "pserve_tiers_order_idx" ON "pserve_tiers" USING btree ("_order");
  CREATE INDEX "pserve_tiers_parent_id_idx" ON "pserve_tiers" USING btree ("_parent_id");
  CREATE INDEX "pserve_rows_values_order_idx" ON "pserve_rows_values" USING btree ("_order");
  CREATE INDEX "pserve_rows_values_parent_id_idx" ON "pserve_rows_values" USING btree ("_parent_id");
  CREATE INDEX "pserve_rows_order_idx" ON "pserve_rows" USING btree ("_order");
  CREATE INDEX "pserve_rows_parent_id_idx" ON "pserve_rows" USING btree ("_parent_id");
  CREATE INDEX "pserve_actions_order_idx" ON "pserve_actions" USING btree ("_order");
  CREATE INDEX "pserve_actions_parent_id_idx" ON "pserve_actions" USING btree ("_parent_id");
  CREATE INDEX "pserve_included_order_idx" ON "pserve_included" USING btree ("_order");
  CREATE INDEX "pserve_included_parent_id_idx" ON "pserve_included" USING btree ("_parent_id");
  CREATE INDEX "pserve_order_idx" ON "pserve" USING btree ("_order");
  CREATE INDEX "pserve_parent_id_idx" ON "pserve" USING btree ("_parent_id");
  CREATE INDEX "pserve_path_idx" ON "pserve" USING btree ("_path");
  CREATE INDEX "tstshow_summary_tiers_order_idx" ON "tstshow_summary_tiers" USING btree ("_order");
  CREATE INDEX "tstshow_summary_tiers_parent_id_idx" ON "tstshow_summary_tiers" USING btree ("_parent_id");
  CREATE INDEX "sentiment_order_idx" ON "sentiment" USING btree ("_order");
  CREATE INDEX "sentiment_parent_id_idx" ON "sentiment" USING btree ("_parent_id");
  CREATE INDEX "tstshow_summary_trend_order_idx" ON "tstshow_summary_trend" USING btree ("_order");
  CREATE INDEX "tstshow_summary_trend_parent_id_idx" ON "tstshow_summary_trend" USING btree ("_parent_id");
  CREATE INDEX "tstshow_testimonials_order_idx" ON "tstshow_testimonials" USING btree ("_order");
  CREATE INDEX "tstshow_testimonials_parent_id_idx" ON "tstshow_testimonials" USING btree ("_parent_id");
  CREATE INDEX "tstshow_order_idx" ON "tstshow" USING btree ("_order");
  CREATE INDEX "tstshow_parent_id_idx" ON "tstshow" USING btree ("_parent_id");
  CREATE INDEX "tstshow_path_idx" ON "tstshow" USING btree ("_path");
  CREATE INDEX "promo_stats_order_idx" ON "promo_stats" USING btree ("_order");
  CREATE INDEX "promo_stats_parent_id_idx" ON "promo_stats" USING btree ("_parent_id");
  CREATE INDEX "promo_spotlight_bullets_order_idx" ON "promo_spotlight_bullets" USING btree ("_order");
  CREATE INDEX "promo_spotlight_bullets_parent_id_idx" ON "promo_spotlight_bullets" USING btree ("_parent_id");
  CREATE INDEX "promo_order_idx" ON "promo" USING btree ("_order");
  CREATE INDEX "promo_parent_id_idx" ON "promo" USING btree ("_parent_id");
  CREATE INDEX "promo_path_idx" ON "promo" USING btree ("_path");
  CREATE INDEX "promo_spotlight_image_idx" ON "promo" USING btree ("spotlight_image_id");
  CREATE INDEX "cenq_order_idx" ON "cenq" USING btree ("_order");
  CREATE INDEX "cenq_parent_id_idx" ON "cenq" USING btree ("_parent_id");
  CREATE INDEX "cenq_path_idx" ON "cenq" USING btree ("_path");
  CREATE INDEX "tfh_trust_order_idx" ON "tfh_trust" USING btree ("_order");
  CREATE INDEX "tfh_trust_parent_id_idx" ON "tfh_trust" USING btree ("_parent_id");
  CREATE INDEX "tfh_order_idx" ON "tfh" USING btree ("_order");
  CREATE INDEX "tfh_parent_id_idx" ON "tfh" USING btree ("_parent_id");
  CREATE INDEX "tfh_path_idx" ON "tfh" USING btree ("_path");
  CREATE INDEX "fgrid_features_order_idx" ON "fgrid_features" USING btree ("_order");
  CREATE INDEX "fgrid_features_parent_id_idx" ON "fgrid_features" USING btree ("_parent_id");
  CREATE INDEX "fgrid_order_idx" ON "fgrid" USING btree ("_order");
  CREATE INDEX "fgrid_parent_id_idx" ON "fgrid" USING btree ("_parent_id");
  CREATE INDEX "fgrid_path_idx" ON "fgrid" USING btree ("_path");
  CREATE INDEX "fspot_bullets_order_idx" ON "fspot_bullets" USING btree ("_order");
  CREATE INDEX "fspot_bullets_parent_id_idx" ON "fspot_bullets" USING btree ("_parent_id");
  CREATE INDEX "fspot_order_idx" ON "fspot" USING btree ("_order");
  CREATE INDEX "fspot_parent_id_idx" ON "fspot" USING btree ("_parent_id");
  CREATE INDEX "fspot_path_idx" ON "fspot" USING btree ("_path");
  CREATE INDEX "fspot_image_idx" ON "fspot" USING btree ("image_id");
  CREATE INDEX "twall_entries_order_idx" ON "twall_entries" USING btree ("_order");
  CREATE INDEX "twall_entries_parent_id_idx" ON "twall_entries" USING btree ("_parent_id");
  CREATE INDEX "twall_order_idx" ON "twall" USING btree ("_order");
  CREATE INDEX "twall_parent_id_idx" ON "twall" USING btree ("_parent_id");
  CREATE INDEX "twall_path_idx" ON "twall" USING btree ("_path");
  CREATE INDEX "pcta_columns_order_idx" ON "pcta_columns" USING btree ("_order");
  CREATE INDEX "pcta_columns_parent_id_idx" ON "pcta_columns" USING btree ("_parent_id");
  CREATE INDEX "pcta_rows_values_order_idx" ON "pcta_rows_values" USING btree ("_order");
  CREATE INDEX "pcta_rows_values_parent_id_idx" ON "pcta_rows_values" USING btree ("_parent_id");
  CREATE INDEX "pcta_rows_order_idx" ON "pcta_rows" USING btree ("_order");
  CREATE INDEX "pcta_rows_parent_id_idx" ON "pcta_rows" USING btree ("_parent_id");
  CREATE INDEX "pcta_actions_order_idx" ON "pcta_actions" USING btree ("_order");
  CREATE INDEX "pcta_actions_parent_id_idx" ON "pcta_actions" USING btree ("_parent_id");
  CREATE INDEX "pcta_order_idx" ON "pcta" USING btree ("_order");
  CREATE INDEX "pcta_parent_id_idx" ON "pcta" USING btree ("_parent_id");
  CREATE INDEX "pcta_path_idx" ON "pcta" USING btree ("_path");
  CREATE INDEX "faqacc_items_order_idx" ON "faqacc_items" USING btree ("_order");
  CREATE INDEX "faqacc_items_parent_id_idx" ON "faqacc_items" USING btree ("_parent_id");
  CREATE INDEX "faqacc_order_idx" ON "faqacc" USING btree ("_order");
  CREATE INDEX "faqacc_parent_id_idx" ON "faqacc" USING btree ("_parent_id");
  CREATE INDEX "faqacc_path_idx" ON "faqacc" USING btree ("_path");
  CREATE INDEX "lcloud_entries_order_idx" ON "lcloud_entries" USING btree ("_order");
  CREATE INDEX "lcloud_entries_parent_id_idx" ON "lcloud_entries" USING btree ("_parent_id");
  CREATE INDEX "lcloud_order_idx" ON "lcloud" USING btree ("_order");
  CREATE INDEX "lcloud_parent_id_idx" ON "lcloud" USING btree ("_parent_id");
  CREATE INDEX "lcloud_path_idx" ON "lcloud" USING btree ("_path");
  CREATE INDEX "stats_entries_order_idx" ON "stats_entries" USING btree ("_order");
  CREATE INDEX "stats_entries_parent_id_idx" ON "stats_entries" USING btree ("_parent_id");
  CREATE INDEX "stats_order_idx" ON "stats" USING btree ("_order");
  CREATE INDEX "stats_parent_id_idx" ON "stats" USING btree ("_parent_id");
  CREATE INDEX "stats_path_idx" ON "stats" USING btree ("_path");
  CREATE INDEX "newscta_order_idx" ON "newscta" USING btree ("_order");
  CREATE INDEX "newscta_parent_id_idx" ON "newscta" USING btree ("_parent_id");
  CREATE INDEX "newscta_path_idx" ON "newscta" USING btree ("_path");
  CREATE INDEX "fmega_columns_links_order_idx" ON "fmega_columns_links" USING btree ("_order");
  CREATE INDEX "fmega_columns_links_parent_id_idx" ON "fmega_columns_links" USING btree ("_parent_id");
  CREATE INDEX "fmega_columns_order_idx" ON "fmega_columns" USING btree ("_order");
  CREATE INDEX "fmega_columns_parent_id_idx" ON "fmega_columns" USING btree ("_parent_id");
  CREATE INDEX "fmega_contact_order_idx" ON "fmega_contact" USING btree ("_order");
  CREATE INDEX "fmega_contact_parent_id_idx" ON "fmega_contact" USING btree ("_parent_id");
  CREATE INDEX "fmega_socials_order_idx" ON "fmega_socials" USING btree ("_order");
  CREATE INDEX "fmega_socials_parent_id_idx" ON "fmega_socials" USING btree ("_parent_id");
  CREATE INDEX "fmega_legal_links_order_idx" ON "fmega_legal_links" USING btree ("_order");
  CREATE INDEX "fmega_legal_links_parent_id_idx" ON "fmega_legal_links" USING btree ("_parent_id");
  CREATE INDEX "fmega_regions_order_idx" ON "fmega_regions" USING btree ("_order");
  CREATE INDEX "fmega_regions_parent_id_idx" ON "fmega_regions" USING btree ("_parent_id");
  CREATE INDEX "fmega_order_idx" ON "fmega" USING btree ("_order");
  CREATE INDEX "fmega_parent_id_idx" ON "fmega" USING btree ("_parent_id");
  CREATE INDEX "fmega_path_idx" ON "fmega" USING btree ("_path");
  CREATE INDEX "psteps_steps_order_idx" ON "psteps_steps" USING btree ("_order");
  CREATE INDEX "psteps_steps_parent_id_idx" ON "psteps_steps" USING btree ("_parent_id");
  CREATE INDEX "psteps_order_idx" ON "psteps" USING btree ("_order");
  CREATE INDEX "psteps_parent_id_idx" ON "psteps" USING btree ("_parent_id");
  CREATE INDEX "psteps_path_idx" ON "psteps" USING btree ("_path");
  CREATE INDEX "_whero_v_headline_lines_order_idx" ON "_whero_v_headline_lines" USING btree ("_order");
  CREATE INDEX "_whero_v_headline_lines_parent_id_idx" ON "_whero_v_headline_lines" USING btree ("_parent_id");
  CREATE INDEX "_whero_v_order_idx" ON "_whero_v" USING btree ("_order");
  CREATE INDEX "_whero_v_parent_id_idx" ON "_whero_v" USING btree ("_parent_id");
  CREATE INDEX "_whero_v_path_idx" ON "_whero_v" USING btree ("_path");
  CREATE INDEX "_vhero_v_order_idx" ON "_vhero_v" USING btree ("_order");
  CREATE INDEX "_vhero_v_parent_id_idx" ON "_vhero_v" USING btree ("_parent_id");
  CREATE INDEX "_vhero_v_path_idx" ON "_vhero_v" USING btree ("_path");
  CREATE INDEX "_vhero_v_video_idx" ON "_vhero_v" USING btree ("video_id");
  CREATE INDEX "_vhero_v_poster_image_idx" ON "_vhero_v" USING btree ("poster_image_id");
  CREATE INDEX "_sover_v_services_order_idx" ON "_sover_v_services" USING btree ("_order");
  CREATE INDEX "_sover_v_services_parent_id_idx" ON "_sover_v_services" USING btree ("_parent_id");
  CREATE INDEX "_sover_v_order_idx" ON "_sover_v" USING btree ("_order");
  CREATE INDEX "_sover_v_parent_id_idx" ON "_sover_v" USING btree ("_parent_id");
  CREATE INDEX "_sover_v_path_idx" ON "_sover_v" USING btree ("_path");
  CREATE INDEX "_wtrust_v_testimonials_order_idx" ON "_wtrust_v_testimonials" USING btree ("_order");
  CREATE INDEX "_wtrust_v_testimonials_parent_id_idx" ON "_wtrust_v_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_wtrust_v_brands_order_idx" ON "_wtrust_v_brands" USING btree ("_order");
  CREATE INDEX "_wtrust_v_brands_parent_id_idx" ON "_wtrust_v_brands" USING btree ("_parent_id");
  CREATE INDEX "_wtrust_v_order_idx" ON "_wtrust_v" USING btree ("_order");
  CREATE INDEX "_wtrust_v_parent_id_idx" ON "_wtrust_v" USING btree ("_parent_id");
  CREATE INDEX "_wtrust_v_path_idx" ON "_wtrust_v" USING btree ("_path");
  CREATE INDEX "_beforeafter_v_items_order_idx" ON "_beforeafter_v_items" USING btree ("_order");
  CREATE INDEX "_beforeafter_v_items_parent_id_idx" ON "_beforeafter_v_items" USING btree ("_parent_id");
  CREATE INDEX "_beforeafter_v_items_before_image_idx" ON "_beforeafter_v_items" USING btree ("before_image_id");
  CREATE INDEX "_beforeafter_v_items_after_image_idx" ON "_beforeafter_v_items" USING btree ("after_image_id");
  CREATE INDEX "_beforeafter_v_order_idx" ON "_beforeafter_v" USING btree ("_order");
  CREATE INDEX "_beforeafter_v_parent_id_idx" ON "_beforeafter_v" USING btree ("_parent_id");
  CREATE INDEX "_beforeafter_v_path_idx" ON "_beforeafter_v" USING btree ("_path");
  CREATE INDEX "_scta_v_assurances_order_idx" ON "_scta_v_assurances" USING btree ("_order");
  CREATE INDEX "_scta_v_assurances_parent_id_idx" ON "_scta_v_assurances" USING btree ("_parent_id");
  CREATE INDEX "_scta_v_order_idx" ON "_scta_v" USING btree ("_order");
  CREATE INDEX "_scta_v_parent_id_idx" ON "_scta_v" USING btree ("_parent_id");
  CREATE INDEX "_scta_v_path_idx" ON "_scta_v" USING btree ("_path");
  CREATE INDEX "_pserve_v_tiers_order_idx" ON "_pserve_v_tiers" USING btree ("_order");
  CREATE INDEX "_pserve_v_tiers_parent_id_idx" ON "_pserve_v_tiers" USING btree ("_parent_id");
  CREATE INDEX "_pserve_v_rows_values_order_idx" ON "_pserve_v_rows_values" USING btree ("_order");
  CREATE INDEX "_pserve_v_rows_values_parent_id_idx" ON "_pserve_v_rows_values" USING btree ("_parent_id");
  CREATE INDEX "_pserve_v_rows_order_idx" ON "_pserve_v_rows" USING btree ("_order");
  CREATE INDEX "_pserve_v_rows_parent_id_idx" ON "_pserve_v_rows" USING btree ("_parent_id");
  CREATE INDEX "_pserve_v_actions_order_idx" ON "_pserve_v_actions" USING btree ("_order");
  CREATE INDEX "_pserve_v_actions_parent_id_idx" ON "_pserve_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pserve_v_included_order_idx" ON "_pserve_v_included" USING btree ("_order");
  CREATE INDEX "_pserve_v_included_parent_id_idx" ON "_pserve_v_included" USING btree ("_parent_id");
  CREATE INDEX "_pserve_v_order_idx" ON "_pserve_v" USING btree ("_order");
  CREATE INDEX "_pserve_v_parent_id_idx" ON "_pserve_v" USING btree ("_parent_id");
  CREATE INDEX "_pserve_v_path_idx" ON "_pserve_v" USING btree ("_path");
  CREATE INDEX "_tstshow_v_summary_tiers_order_idx" ON "_tstshow_v_summary_tiers" USING btree ("_order");
  CREATE INDEX "_tstshow_v_summary_tiers_parent_id_idx" ON "_tstshow_v_summary_tiers" USING btree ("_parent_id");
  CREATE INDEX "_sentiment_v_order_idx" ON "_sentiment_v" USING btree ("_order");
  CREATE INDEX "_sentiment_v_parent_id_idx" ON "_sentiment_v" USING btree ("_parent_id");
  CREATE INDEX "_tstshow_v_summary_trend_order_idx" ON "_tstshow_v_summary_trend" USING btree ("_order");
  CREATE INDEX "_tstshow_v_summary_trend_parent_id_idx" ON "_tstshow_v_summary_trend" USING btree ("_parent_id");
  CREATE INDEX "_tstshow_v_testimonials_order_idx" ON "_tstshow_v_testimonials" USING btree ("_order");
  CREATE INDEX "_tstshow_v_testimonials_parent_id_idx" ON "_tstshow_v_testimonials" USING btree ("_parent_id");
  CREATE INDEX "_tstshow_v_order_idx" ON "_tstshow_v" USING btree ("_order");
  CREATE INDEX "_tstshow_v_parent_id_idx" ON "_tstshow_v" USING btree ("_parent_id");
  CREATE INDEX "_tstshow_v_path_idx" ON "_tstshow_v" USING btree ("_path");
  CREATE INDEX "_promo_v_stats_order_idx" ON "_promo_v_stats" USING btree ("_order");
  CREATE INDEX "_promo_v_stats_parent_id_idx" ON "_promo_v_stats" USING btree ("_parent_id");
  CREATE INDEX "_promo_v_spotlight_bullets_order_idx" ON "_promo_v_spotlight_bullets" USING btree ("_order");
  CREATE INDEX "_promo_v_spotlight_bullets_parent_id_idx" ON "_promo_v_spotlight_bullets" USING btree ("_parent_id");
  CREATE INDEX "_promo_v_order_idx" ON "_promo_v" USING btree ("_order");
  CREATE INDEX "_promo_v_parent_id_idx" ON "_promo_v" USING btree ("_parent_id");
  CREATE INDEX "_promo_v_path_idx" ON "_promo_v" USING btree ("_path");
  CREATE INDEX "_promo_v_spotlight_image_idx" ON "_promo_v" USING btree ("spotlight_image_id");
  CREATE INDEX "_cenq_v_order_idx" ON "_cenq_v" USING btree ("_order");
  CREATE INDEX "_cenq_v_parent_id_idx" ON "_cenq_v" USING btree ("_parent_id");
  CREATE INDEX "_cenq_v_path_idx" ON "_cenq_v" USING btree ("_path");
  CREATE INDEX "_tfh_v_trust_order_idx" ON "_tfh_v_trust" USING btree ("_order");
  CREATE INDEX "_tfh_v_trust_parent_id_idx" ON "_tfh_v_trust" USING btree ("_parent_id");
  CREATE INDEX "_tfh_v_order_idx" ON "_tfh_v" USING btree ("_order");
  CREATE INDEX "_tfh_v_parent_id_idx" ON "_tfh_v" USING btree ("_parent_id");
  CREATE INDEX "_tfh_v_path_idx" ON "_tfh_v" USING btree ("_path");
  CREATE INDEX "_fgrid_v_features_order_idx" ON "_fgrid_v_features" USING btree ("_order");
  CREATE INDEX "_fgrid_v_features_parent_id_idx" ON "_fgrid_v_features" USING btree ("_parent_id");
  CREATE INDEX "_fgrid_v_order_idx" ON "_fgrid_v" USING btree ("_order");
  CREATE INDEX "_fgrid_v_parent_id_idx" ON "_fgrid_v" USING btree ("_parent_id");
  CREATE INDEX "_fgrid_v_path_idx" ON "_fgrid_v" USING btree ("_path");
  CREATE INDEX "_fspot_v_bullets_order_idx" ON "_fspot_v_bullets" USING btree ("_order");
  CREATE INDEX "_fspot_v_bullets_parent_id_idx" ON "_fspot_v_bullets" USING btree ("_parent_id");
  CREATE INDEX "_fspot_v_order_idx" ON "_fspot_v" USING btree ("_order");
  CREATE INDEX "_fspot_v_parent_id_idx" ON "_fspot_v" USING btree ("_parent_id");
  CREATE INDEX "_fspot_v_path_idx" ON "_fspot_v" USING btree ("_path");
  CREATE INDEX "_fspot_v_image_idx" ON "_fspot_v" USING btree ("image_id");
  CREATE INDEX "_twall_v_entries_order_idx" ON "_twall_v_entries" USING btree ("_order");
  CREATE INDEX "_twall_v_entries_parent_id_idx" ON "_twall_v_entries" USING btree ("_parent_id");
  CREATE INDEX "_twall_v_order_idx" ON "_twall_v" USING btree ("_order");
  CREATE INDEX "_twall_v_parent_id_idx" ON "_twall_v" USING btree ("_parent_id");
  CREATE INDEX "_twall_v_path_idx" ON "_twall_v" USING btree ("_path");
  CREATE INDEX "_pcta_v_columns_order_idx" ON "_pcta_v_columns" USING btree ("_order");
  CREATE INDEX "_pcta_v_columns_parent_id_idx" ON "_pcta_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_pcta_v_rows_values_order_idx" ON "_pcta_v_rows_values" USING btree ("_order");
  CREATE INDEX "_pcta_v_rows_values_parent_id_idx" ON "_pcta_v_rows_values" USING btree ("_parent_id");
  CREATE INDEX "_pcta_v_rows_order_idx" ON "_pcta_v_rows" USING btree ("_order");
  CREATE INDEX "_pcta_v_rows_parent_id_idx" ON "_pcta_v_rows" USING btree ("_parent_id");
  CREATE INDEX "_pcta_v_actions_order_idx" ON "_pcta_v_actions" USING btree ("_order");
  CREATE INDEX "_pcta_v_actions_parent_id_idx" ON "_pcta_v_actions" USING btree ("_parent_id");
  CREATE INDEX "_pcta_v_order_idx" ON "_pcta_v" USING btree ("_order");
  CREATE INDEX "_pcta_v_parent_id_idx" ON "_pcta_v" USING btree ("_parent_id");
  CREATE INDEX "_pcta_v_path_idx" ON "_pcta_v" USING btree ("_path");
  CREATE INDEX "_faqacc_v_items_order_idx" ON "_faqacc_v_items" USING btree ("_order");
  CREATE INDEX "_faqacc_v_items_parent_id_idx" ON "_faqacc_v_items" USING btree ("_parent_id");
  CREATE INDEX "_faqacc_v_order_idx" ON "_faqacc_v" USING btree ("_order");
  CREATE INDEX "_faqacc_v_parent_id_idx" ON "_faqacc_v" USING btree ("_parent_id");
  CREATE INDEX "_faqacc_v_path_idx" ON "_faqacc_v" USING btree ("_path");
  CREATE INDEX "_lcloud_v_entries_order_idx" ON "_lcloud_v_entries" USING btree ("_order");
  CREATE INDEX "_lcloud_v_entries_parent_id_idx" ON "_lcloud_v_entries" USING btree ("_parent_id");
  CREATE INDEX "_lcloud_v_order_idx" ON "_lcloud_v" USING btree ("_order");
  CREATE INDEX "_lcloud_v_parent_id_idx" ON "_lcloud_v" USING btree ("_parent_id");
  CREATE INDEX "_lcloud_v_path_idx" ON "_lcloud_v" USING btree ("_path");
  CREATE INDEX "_stats_v_entries_order_idx" ON "_stats_v_entries" USING btree ("_order");
  CREATE INDEX "_stats_v_entries_parent_id_idx" ON "_stats_v_entries" USING btree ("_parent_id");
  CREATE INDEX "_stats_v_order_idx" ON "_stats_v" USING btree ("_order");
  CREATE INDEX "_stats_v_parent_id_idx" ON "_stats_v" USING btree ("_parent_id");
  CREATE INDEX "_stats_v_path_idx" ON "_stats_v" USING btree ("_path");
  CREATE INDEX "_newscta_v_order_idx" ON "_newscta_v" USING btree ("_order");
  CREATE INDEX "_newscta_v_parent_id_idx" ON "_newscta_v" USING btree ("_parent_id");
  CREATE INDEX "_newscta_v_path_idx" ON "_newscta_v" USING btree ("_path");
  CREATE INDEX "_fmega_v_columns_links_order_idx" ON "_fmega_v_columns_links" USING btree ("_order");
  CREATE INDEX "_fmega_v_columns_links_parent_id_idx" ON "_fmega_v_columns_links" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_columns_order_idx" ON "_fmega_v_columns" USING btree ("_order");
  CREATE INDEX "_fmega_v_columns_parent_id_idx" ON "_fmega_v_columns" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_contact_order_idx" ON "_fmega_v_contact" USING btree ("_order");
  CREATE INDEX "_fmega_v_contact_parent_id_idx" ON "_fmega_v_contact" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_socials_order_idx" ON "_fmega_v_socials" USING btree ("_order");
  CREATE INDEX "_fmega_v_socials_parent_id_idx" ON "_fmega_v_socials" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_legal_links_order_idx" ON "_fmega_v_legal_links" USING btree ("_order");
  CREATE INDEX "_fmega_v_legal_links_parent_id_idx" ON "_fmega_v_legal_links" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_regions_order_idx" ON "_fmega_v_regions" USING btree ("_order");
  CREATE INDEX "_fmega_v_regions_parent_id_idx" ON "_fmega_v_regions" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_order_idx" ON "_fmega_v" USING btree ("_order");
  CREATE INDEX "_fmega_v_parent_id_idx" ON "_fmega_v" USING btree ("_parent_id");
  CREATE INDEX "_fmega_v_path_idx" ON "_fmega_v" USING btree ("_path");
  CREATE INDEX "_psteps_v_steps_order_idx" ON "_psteps_v_steps" USING btree ("_order");
  CREATE INDEX "_psteps_v_steps_parent_id_idx" ON "_psteps_v_steps" USING btree ("_parent_id");
  CREATE INDEX "_psteps_v_order_idx" ON "_psteps_v" USING btree ("_order");
  CREATE INDEX "_psteps_v_parent_id_idx" ON "_psteps_v" USING btree ("_parent_id");
  CREATE INDEX "_psteps_v_path_idx" ON "_psteps_v" USING btree ("_path");
  CREATE INDEX "media_tags_order_idx" ON "media_tags" USING btree ("_order");
  CREATE INDEX "media_tags_parent_id_idx" ON "media_tags" USING btree ("_parent_id");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "site_settings_marketing_footer_links_order_idx" ON "site_settings_marketing_footer_links" USING btree ("_order");
  CREATE INDEX "site_settings_marketing_footer_links_parent_id_idx" ON "site_settings_marketing_footer_links" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_social_profiles_order_idx" ON "seo_settings_social_profiles" USING btree ("_order");
  CREATE INDEX "seo_settings_social_profiles_parent_id_idx" ON "seo_settings_social_profiles" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_robots_additional_disallow_order_idx" ON "seo_settings_robots_additional_disallow" USING btree ("_order");
  CREATE INDEX "seo_settings_robots_additional_disallow_parent_id_idx" ON "seo_settings_robots_additional_disallow" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_local_business_opening_hours_order_idx" ON "seo_settings_local_business_opening_hours" USING btree ("_order");
  CREATE INDEX "seo_settings_local_business_opening_hours_parent_id_idx" ON "seo_settings_local_business_opening_hours" USING btree ("_parent_id");
  CREATE INDEX "seo_settings_default_og_image_idx" ON "seo_settings" USING btree ("default_og_image_id");
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_blog_posts_v_autosave_idx" ON "_blog_posts_v" USING btree ("autosave");
  CREATE INDEX "_marketing_pages_v_autosave_idx" ON "_marketing_pages_v" USING btree ("autosave");
  CREATE INDEX "_content_overrides_v_autosave_idx" ON "_content_overrides_v" USING btree ("autosave");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "whero_headline_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "whero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "vhero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sover_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sover" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "wtrust_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "wtrust_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "wtrust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "beforeafter_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "beforeafter" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "scta_assurances" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "scta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pserve_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pserve_rows_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pserve_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pserve_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pserve_included" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pserve" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tstshow_summary_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "sentiment" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tstshow_summary_trend" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tstshow_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tstshow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo_spotlight_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "promo" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "cenq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tfh_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tfh" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fgrid_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fgrid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fspot_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fspot" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "twall_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "twall" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pcta_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pcta_rows_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pcta_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pcta_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pcta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqacc_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "faqacc" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lcloud_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "lcloud" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stats_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "newscta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega_regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "fmega" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "psteps_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "psteps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_whero_v_headline_lines" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_whero_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_vhero_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sover_v_services" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sover_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_wtrust_v_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_wtrust_v_brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_wtrust_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_beforeafter_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_beforeafter_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_scta_v_assurances" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_scta_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pserve_v_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pserve_v_rows_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pserve_v_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pserve_v_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pserve_v_included" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pserve_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tstshow_v_summary_tiers" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_sentiment_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tstshow_v_summary_trend" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tstshow_v_testimonials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tstshow_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_promo_v_stats" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_promo_v_spotlight_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_promo_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_cenq_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tfh_v_trust" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_tfh_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fgrid_v_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fgrid_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fspot_v_bullets" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fspot_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_twall_v_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_twall_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pcta_v_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pcta_v_rows_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pcta_v_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pcta_v_actions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pcta_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqacc_v_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_faqacc_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lcloud_v_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_lcloud_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_stats_v_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_stats_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_newscta_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v_columns_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v_contact" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v_socials" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v_regions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_fmega_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_psteps_v_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_psteps_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "media_tags" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders_folder_type" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_folders" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "site_settings_marketing_footer_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_social_profiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_robots_additional_disallow" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings_local_business_opening_hours" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "seo_settings" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "whero_headline_lines" CASCADE;
  DROP TABLE "whero" CASCADE;
  DROP TABLE "vhero" CASCADE;
  DROP TABLE "sover_services" CASCADE;
  DROP TABLE "sover" CASCADE;
  DROP TABLE "wtrust_testimonials" CASCADE;
  DROP TABLE "wtrust_brands" CASCADE;
  DROP TABLE "wtrust" CASCADE;
  DROP TABLE "beforeafter_items" CASCADE;
  DROP TABLE "beforeafter" CASCADE;
  DROP TABLE "scta_assurances" CASCADE;
  DROP TABLE "scta" CASCADE;
  DROP TABLE "pserve_tiers" CASCADE;
  DROP TABLE "pserve_rows_values" CASCADE;
  DROP TABLE "pserve_rows" CASCADE;
  DROP TABLE "pserve_actions" CASCADE;
  DROP TABLE "pserve_included" CASCADE;
  DROP TABLE "pserve" CASCADE;
  DROP TABLE "tstshow_summary_tiers" CASCADE;
  DROP TABLE "sentiment" CASCADE;
  DROP TABLE "tstshow_summary_trend" CASCADE;
  DROP TABLE "tstshow_testimonials" CASCADE;
  DROP TABLE "tstshow" CASCADE;
  DROP TABLE "promo_stats" CASCADE;
  DROP TABLE "promo_spotlight_bullets" CASCADE;
  DROP TABLE "promo" CASCADE;
  DROP TABLE "cenq" CASCADE;
  DROP TABLE "tfh_trust" CASCADE;
  DROP TABLE "tfh" CASCADE;
  DROP TABLE "fgrid_features" CASCADE;
  DROP TABLE "fgrid" CASCADE;
  DROP TABLE "fspot_bullets" CASCADE;
  DROP TABLE "fspot" CASCADE;
  DROP TABLE "twall_entries" CASCADE;
  DROP TABLE "twall" CASCADE;
  DROP TABLE "pcta_columns" CASCADE;
  DROP TABLE "pcta_rows_values" CASCADE;
  DROP TABLE "pcta_rows" CASCADE;
  DROP TABLE "pcta_actions" CASCADE;
  DROP TABLE "pcta" CASCADE;
  DROP TABLE "faqacc_items" CASCADE;
  DROP TABLE "faqacc" CASCADE;
  DROP TABLE "lcloud_entries" CASCADE;
  DROP TABLE "lcloud" CASCADE;
  DROP TABLE "stats_entries" CASCADE;
  DROP TABLE "stats" CASCADE;
  DROP TABLE "newscta" CASCADE;
  DROP TABLE "fmega_columns_links" CASCADE;
  DROP TABLE "fmega_columns" CASCADE;
  DROP TABLE "fmega_contact" CASCADE;
  DROP TABLE "fmega_socials" CASCADE;
  DROP TABLE "fmega_legal_links" CASCADE;
  DROP TABLE "fmega_regions" CASCADE;
  DROP TABLE "fmega" CASCADE;
  DROP TABLE "psteps_steps" CASCADE;
  DROP TABLE "psteps" CASCADE;
  DROP TABLE "_whero_v_headline_lines" CASCADE;
  DROP TABLE "_whero_v" CASCADE;
  DROP TABLE "_vhero_v" CASCADE;
  DROP TABLE "_sover_v_services" CASCADE;
  DROP TABLE "_sover_v" CASCADE;
  DROP TABLE "_wtrust_v_testimonials" CASCADE;
  DROP TABLE "_wtrust_v_brands" CASCADE;
  DROP TABLE "_wtrust_v" CASCADE;
  DROP TABLE "_beforeafter_v_items" CASCADE;
  DROP TABLE "_beforeafter_v" CASCADE;
  DROP TABLE "_scta_v_assurances" CASCADE;
  DROP TABLE "_scta_v" CASCADE;
  DROP TABLE "_pserve_v_tiers" CASCADE;
  DROP TABLE "_pserve_v_rows_values" CASCADE;
  DROP TABLE "_pserve_v_rows" CASCADE;
  DROP TABLE "_pserve_v_actions" CASCADE;
  DROP TABLE "_pserve_v_included" CASCADE;
  DROP TABLE "_pserve_v" CASCADE;
  DROP TABLE "_tstshow_v_summary_tiers" CASCADE;
  DROP TABLE "_sentiment_v" CASCADE;
  DROP TABLE "_tstshow_v_summary_trend" CASCADE;
  DROP TABLE "_tstshow_v_testimonials" CASCADE;
  DROP TABLE "_tstshow_v" CASCADE;
  DROP TABLE "_promo_v_stats" CASCADE;
  DROP TABLE "_promo_v_spotlight_bullets" CASCADE;
  DROP TABLE "_promo_v" CASCADE;
  DROP TABLE "_cenq_v" CASCADE;
  DROP TABLE "_tfh_v_trust" CASCADE;
  DROP TABLE "_tfh_v" CASCADE;
  DROP TABLE "_fgrid_v_features" CASCADE;
  DROP TABLE "_fgrid_v" CASCADE;
  DROP TABLE "_fspot_v_bullets" CASCADE;
  DROP TABLE "_fspot_v" CASCADE;
  DROP TABLE "_twall_v_entries" CASCADE;
  DROP TABLE "_twall_v" CASCADE;
  DROP TABLE "_pcta_v_columns" CASCADE;
  DROP TABLE "_pcta_v_rows_values" CASCADE;
  DROP TABLE "_pcta_v_rows" CASCADE;
  DROP TABLE "_pcta_v_actions" CASCADE;
  DROP TABLE "_pcta_v" CASCADE;
  DROP TABLE "_faqacc_v_items" CASCADE;
  DROP TABLE "_faqacc_v" CASCADE;
  DROP TABLE "_lcloud_v_entries" CASCADE;
  DROP TABLE "_lcloud_v" CASCADE;
  DROP TABLE "_stats_v_entries" CASCADE;
  DROP TABLE "_stats_v" CASCADE;
  DROP TABLE "_newscta_v" CASCADE;
  DROP TABLE "_fmega_v_columns_links" CASCADE;
  DROP TABLE "_fmega_v_columns" CASCADE;
  DROP TABLE "_fmega_v_contact" CASCADE;
  DROP TABLE "_fmega_v_socials" CASCADE;
  DROP TABLE "_fmega_v_legal_links" CASCADE;
  DROP TABLE "_fmega_v_regions" CASCADE;
  DROP TABLE "_fmega_v" CASCADE;
  DROP TABLE "_psteps_v_steps" CASCADE;
  DROP TABLE "_psteps_v" CASCADE;
  DROP TABLE "media_tags" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "site_settings_marketing_footer_links" CASCADE;
  DROP TABLE "seo_settings_social_profiles" CASCADE;
  DROP TABLE "seo_settings_robots_additional_disallow" CASCADE;
  DROP TABLE "seo_settings_local_business_opening_hours" CASCADE;
  DROP TABLE "seo_settings" CASCADE;
  ALTER TABLE "media" DROP CONSTRAINT "media_folder_id_payload_folders_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_folders_fk";
  
  ALTER TABLE "marketing_pages" ALTER COLUMN "page_type" SET DATA TYPE text;
  ALTER TABLE "marketing_pages" ALTER COLUMN "page_type" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum_marketing_pages_page_type";
  CREATE TYPE "public"."enum_marketing_pages_page_type" AS ENUM('homepage', 'service', 'location', 'parts', 'standard');
  ALTER TABLE "marketing_pages" ALTER COLUMN "page_type" SET DEFAULT 'standard'::"public"."enum_marketing_pages_page_type";
  ALTER TABLE "marketing_pages" ALTER COLUMN "page_type" SET DATA TYPE "public"."enum_marketing_pages_page_type" USING "page_type"::"public"."enum_marketing_pages_page_type";
  ALTER TABLE "_marketing_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE text;
  ALTER TABLE "_marketing_pages_v" ALTER COLUMN "version_page_type" SET DEFAULT 'standard'::text;
  DROP TYPE "public"."enum__marketing_pages_v_version_page_type";
  CREATE TYPE "public"."enum__marketing_pages_v_version_page_type" AS ENUM('homepage', 'service', 'location', 'parts', 'standard');
  ALTER TABLE "_marketing_pages_v" ALTER COLUMN "version_page_type" SET DEFAULT 'standard'::"public"."enum__marketing_pages_v_version_page_type";
  ALTER TABLE "_marketing_pages_v" ALTER COLUMN "version_page_type" SET DATA TYPE "public"."enum__marketing_pages_v_version_page_type" USING "version_page_type"::"public"."enum__marketing_pages_v_version_page_type";
  ALTER TABLE "media" ALTER COLUMN "asset_role" SET DATA TYPE text;
  ALTER TABLE "media" ALTER COLUMN "asset_role" SET DEFAULT 'page'::text;
  DROP TYPE "public"."enum_media_asset_role";
  CREATE TYPE "public"."enum_media_asset_role" AS ENUM('page', 'blog', 'open-graph');
  ALTER TABLE "media" ALTER COLUMN "asset_role" SET DEFAULT 'page'::"public"."enum_media_asset_role";
  ALTER TABLE "media" ALTER COLUMN "asset_role" SET DATA TYPE "public"."enum_media_asset_role" USING "asset_role"::"public"."enum_media_asset_role";
  DROP INDEX "_blog_posts_v_autosave_idx";
  DROP INDEX "_marketing_pages_v_autosave_idx";
  DROP INDEX "_content_overrides_v_autosave_idx";
  DROP INDEX "media_folder_idx";
  DROP INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx";
  DROP INDEX "media_sizes_card_sizes_card_filename_idx";
  DROP INDEX "media_sizes_hero_sizes_hero_filename_idx";
  DROP INDEX "payload_locked_documents_rels_payload_folders_id_idx";
  ALTER TABLE "_blog_posts_v" DROP COLUMN "autosave";
  ALTER TABLE "marketing_pages" DROP COLUMN "show_hero";
  ALTER TABLE "marketing_pages" DROP COLUMN "show_contact_band";
  ALTER TABLE "_marketing_pages_v" DROP COLUMN "version_show_hero";
  ALTER TABLE "_marketing_pages_v" DROP COLUMN "version_show_contact_band";
  ALTER TABLE "_marketing_pages_v" DROP COLUMN "autosave";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "autosave";
  ALTER TABLE "media" DROP COLUMN "credit";
  ALTER TABLE "media" DROP COLUMN "folder_id";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_url";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_width";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_height";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_thumbnail_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_card_url";
  ALTER TABLE "media" DROP COLUMN "sizes_card_width";
  ALTER TABLE "media" DROP COLUMN "sizes_card_height";
  ALTER TABLE "media" DROP COLUMN "sizes_card_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_card_filename";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filename";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_folders_id";
  DROP TYPE "public"."enum_sover_services_icon";
  DROP TYPE "public"."enum_sover_columns";
  DROP TYPE "public"."enum_wtrust_testimonials_tone";
  DROP TYPE "public"."enum_wtrust_testimonials_span";
  DROP TYPE "public"."enum_scta_assurances_icon";
  DROP TYPE "public"."enum_scta_tone";
  DROP TYPE "public"."enum_pserve_actions_variant";
  DROP TYPE "public"."enum_pserve_included_icon";
  DROP TYPE "public"."enum_sentiment_tone";
  DROP TYPE "public"."enum_tstshow_testimonials_tone";
  DROP TYPE "public"."enum_tstshow_testimonials_span";
  DROP TYPE "public"."enum_promo_stats_tone";
  DROP TYPE "public"."enum_tfh_primary_action_tone";
  DROP TYPE "public"."enum_tfh_secondary_action_tone";
  DROP TYPE "public"."enum_tfh_layout";
  DROP TYPE "public"."enum_fgrid_features_icon";
  DROP TYPE "public"."enum_fgrid_columns";
  DROP TYPE "public"."enum_fspot_bullets_icon";
  DROP TYPE "public"."enum_twall_entries_tone";
  DROP TYPE "public"."enum_twall_entries_rating";
  DROP TYPE "public"."enum_twall_entries_span";
  DROP TYPE "public"."enum_pcta_actions_variant";
  DROP TYPE "public"."enum_lcloud_entries_icon";
  DROP TYPE "public"."enum_stats_entries_tone";
  DROP TYPE "public"."enum_fmega_socials_icon";
  DROP TYPE "public"."enum_psteps_steps_icon";
  DROP TYPE "public"."enum__sover_v_services_icon";
  DROP TYPE "public"."enum__sover_v_columns";
  DROP TYPE "public"."enum__wtrust_v_testimonials_tone";
  DROP TYPE "public"."enum__wtrust_v_testimonials_span";
  DROP TYPE "public"."enum__scta_v_assurances_icon";
  DROP TYPE "public"."enum__scta_v_tone";
  DROP TYPE "public"."enum__pserve_v_actions_variant";
  DROP TYPE "public"."enum__pserve_v_included_icon";
  DROP TYPE "public"."enum__sentiment_v_tone";
  DROP TYPE "public"."enum__tstshow_v_testimonials_tone";
  DROP TYPE "public"."enum__tstshow_v_testimonials_span";
  DROP TYPE "public"."enum__promo_v_stats_tone";
  DROP TYPE "public"."enum__tfh_v_primary_action_tone";
  DROP TYPE "public"."enum__tfh_v_secondary_action_tone";
  DROP TYPE "public"."enum__tfh_v_layout";
  DROP TYPE "public"."enum__fgrid_v_features_icon";
  DROP TYPE "public"."enum__fgrid_v_columns";
  DROP TYPE "public"."enum__fspot_v_bullets_icon";
  DROP TYPE "public"."enum__twall_v_entries_tone";
  DROP TYPE "public"."enum__twall_v_entries_rating";
  DROP TYPE "public"."enum__twall_v_entries_span";
  DROP TYPE "public"."enum__pcta_v_actions_variant";
  DROP TYPE "public"."enum__lcloud_v_entries_icon";
  DROP TYPE "public"."enum__stats_v_entries_tone";
  DROP TYPE "public"."enum__fmega_v_socials_icon";
  DROP TYPE "public"."enum__psteps_v_steps_icon";
  DROP TYPE "public"."enum_payload_folders_folder_type";`)
}
