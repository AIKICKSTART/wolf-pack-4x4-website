import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_marketing_pages_blocks_cta_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum_marketing_pages_blocks_callout_kind" AS ENUM('info', 'warning', 'tip', 'danger');
  CREATE TYPE "public"."enum_marketing_pages_blocks_quote_variant" AS ENUM('plain', 'image');
  CREATE TYPE "public"."enum_marketing_pages_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_marketing_pages_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'codepen', 'twitter');
  CREATE TYPE "public"."enum_marketing_pages_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1', '9:16');
  CREATE TYPE "public"."enum_marketing_pages_blocks_divider_variant" AS ENUM('line', 'dot', 'icon', 'wave', 'zigzag');
  CREATE TYPE "public"."enum_marketing_pages_blocks_timeline_events_granularity" AS ENUM('year', 'month', 'event');
  CREATE TYPE "public"."enum_marketing_pages_blocks_timeline_events_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum_marketing_pages_blocks_table_columns_align" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum_marketing_pages_blocks_table_columns_format" AS ENUM('text', 'currency', 'number', 'percent');
  CREATE TYPE "public"."enum_marketing_pages_blocks_code_language" AS ENUM('bash', 'javascript', 'typescript', 'json', 'yaml', 'css', 'html');
  CREATE TYPE "public"."enum_marketing_pages_blocks_code_theme" AS ENUM('graphite', 'amber', 'teal', 'violet');
  CREATE TYPE "public"."enum_marketing_pages_blocks_code_sandbox_active_pane" AS ENUM('html', 'css', 'javascript');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_cta_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_callout_kind" AS ENUM('info', 'warning', 'tip', 'danger');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_quote_variant" AS ENUM('plain', 'image');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'codepen', 'twitter');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1', '9:16');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_divider_variant" AS ENUM('line', 'dot', 'icon', 'wave', 'zigzag');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_timeline_events_granularity" AS ENUM('year', 'month', 'event');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_timeline_events_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_table_columns_align" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_table_columns_format" AS ENUM('text', 'currency', 'number', 'percent');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_code_language" AS ENUM('bash', 'javascript', 'typescript', 'json', 'yaml', 'css', 'html');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_code_theme" AS ENUM('graphite', 'amber', 'teal', 'violet');
  CREATE TYPE "public"."enum__marketing_pages_v_blocks_code_sandbox_active_pane" AS ENUM('html', 'css', 'javascript');
  CREATE TYPE "public"."enum_content_overrides_blocks_cta_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum_content_overrides_blocks_callout_kind" AS ENUM('info', 'warning', 'tip', 'danger');
  CREATE TYPE "public"."enum_content_overrides_blocks_quote_variant" AS ENUM('plain', 'image');
  CREATE TYPE "public"."enum_content_overrides_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum_content_overrides_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'codepen', 'twitter');
  CREATE TYPE "public"."enum_content_overrides_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1', '9:16');
  CREATE TYPE "public"."enum_content_overrides_blocks_divider_variant" AS ENUM('line', 'dot', 'icon', 'wave', 'zigzag');
  CREATE TYPE "public"."enum_content_overrides_blocks_timeline_events_granularity" AS ENUM('year', 'month', 'event');
  CREATE TYPE "public"."enum_content_overrides_blocks_timeline_events_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum_content_overrides_blocks_table_columns_align" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum_content_overrides_blocks_table_columns_format" AS ENUM('text', 'currency', 'number', 'percent');
  CREATE TYPE "public"."enum_content_overrides_blocks_code_language" AS ENUM('bash', 'javascript', 'typescript', 'json', 'yaml', 'css', 'html');
  CREATE TYPE "public"."enum_content_overrides_blocks_code_theme" AS ENUM('graphite', 'amber', 'teal', 'violet');
  CREATE TYPE "public"."enum_content_overrides_blocks_code_sandbox_active_pane" AS ENUM('html', 'css', 'javascript');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_cta_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_callout_kind" AS ENUM('info', 'warning', 'tip', 'danger');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_quote_variant" AS ENUM('plain', 'image');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_gallery_layout" AS ENUM('grid', 'carousel', 'masonry');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_embed_provider" AS ENUM('youtube', 'vimeo', 'codepen', 'twitter');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_embed_aspect" AS ENUM('16:9', '4:3', '1:1', '9:16');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_divider_variant" AS ENUM('line', 'dot', 'icon', 'wave', 'zigzag');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_timeline_events_granularity" AS ENUM('year', 'month', 'event');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_timeline_events_tone" AS ENUM('neutral', 'teal', 'amber', 'red', 'green', 'violet');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_table_columns_align" AS ENUM('left', 'right', 'center');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_table_columns_format" AS ENUM('text', 'currency', 'number', 'percent');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_code_language" AS ENUM('bash', 'javascript', 'typescript', 'json', 'yaml', 'css', 'html');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_code_theme" AS ENUM('graphite', 'amber', 'teal', 'violet');
  CREATE TYPE "public"."enum__content_overrides_v_blocks_code_sandbox_active_pane" AS ENUM('html', 'css', 'javascript');
  CREATE TABLE "marketing_pages_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"background_image_url" varchar,
  	"tone" "enum_marketing_pages_blocks_cta_tone" DEFAULT 'amber',
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_marketing_pages_blocks_callout_kind" DEFAULT 'info',
  	"title" varchar,
  	"body" varchar,
  	"dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_marketing_pages_blocks_quote_variant" DEFAULT 'plain',
  	"text" varchar,
  	"author" varchar,
  	"citation" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"alt" varchar,
  	"caption" varchar,
  	"ratio" numeric
  );
  
  CREATE TABLE "marketing_pages_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_marketing_pages_blocks_gallery_layout" DEFAULT 'grid',
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_video_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"start" numeric DEFAULT 0
  );
  
  CREATE TABLE "marketing_pages_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"poster_url" varchar,
  	"title" varchar,
  	"duration_seconds" numeric DEFAULT 0,
  	"captions_enabled" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" "enum_marketing_pages_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum_marketing_pages_blocks_embed_aspect" DEFAULT '16:9',
  	"author_handle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_accordion_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"open" boolean DEFAULT false
  );
  
  CREATE TABLE "marketing_pages_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"done" boolean DEFAULT false
  );
  
  CREATE TABLE "marketing_pages_blocks_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_marketing_pages_blocks_divider_variant" DEFAULT 'line',
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"label" varchar,
  	"description" varchar,
  	"granularity" "enum_marketing_pages_blocks_timeline_events_granularity" DEFAULT 'year',
  	"tone" "enum_marketing_pages_blocks_timeline_events_tone" DEFAULT 'neutral'
  );
  
  CREATE TABLE "marketing_pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_poll_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"votes" numeric DEFAULT 0
  );
  
  CREATE TABLE "marketing_pages_blocks_poll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"total_votes" numeric DEFAULT 0,
  	"multi_select" boolean DEFAULT false,
  	"closes_at" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"align" "enum_marketing_pages_blocks_table_columns_align" DEFAULT 'left',
  	"format" "enum_marketing_pages_blocks_table_columns_format" DEFAULT 'text',
  	"width" numeric DEFAULT 160,
  	"sortable" boolean DEFAULT false
  );
  
  CREATE TABLE "marketing_pages_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cells" jsonb
  );
  
  CREATE TABLE "marketing_pages_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_marketing_pages_blocks_code_language" DEFAULT 'typescript',
  	"theme" "enum_marketing_pages_blocks_code_theme" DEFAULT 'graphite',
  	"source" varchar,
  	"show_line_numbers" boolean DEFAULT true,
  	"filename" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "marketing_pages_blocks_code_sandbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"css" varchar,
  	"javascript" varchar,
  	"active_pane" "enum_marketing_pages_blocks_code_sandbox_active_pane" DEFAULT 'html',
  	"preview_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"background_image_url" varchar,
  	"tone" "enum__marketing_pages_v_blocks_cta_tone" DEFAULT 'amber',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__marketing_pages_v_blocks_callout_kind" DEFAULT 'info',
  	"title" varchar,
  	"body" varchar,
  	"dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__marketing_pages_v_blocks_quote_variant" DEFAULT 'plain',
  	"text" varchar,
  	"author" varchar,
  	"citation" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"alt" varchar,
  	"caption" varchar,
  	"ratio" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__marketing_pages_v_blocks_gallery_layout" DEFAULT 'grid',
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_video_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"start" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"poster_url" varchar,
  	"title" varchar,
  	"duration_seconds" numeric DEFAULT 0,
  	"captions_enabled" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum__marketing_pages_v_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum__marketing_pages_v_blocks_embed_aspect" DEFAULT '16:9',
  	"author_handle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_accordion_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"open" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"done" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__marketing_pages_v_blocks_divider_variant" DEFAULT 'line',
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"label" varchar,
  	"description" varchar,
  	"granularity" "enum__marketing_pages_v_blocks_timeline_events_granularity" DEFAULT 'year',
  	"tone" "enum__marketing_pages_v_blocks_timeline_events_tone" DEFAULT 'neutral',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_poll_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"votes" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_poll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"total_votes" numeric DEFAULT 0,
  	"multi_select" boolean DEFAULT false,
  	"closes_at" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"align" "enum__marketing_pages_v_blocks_table_columns_align" DEFAULT 'left',
  	"format" "enum__marketing_pages_v_blocks_table_columns_format" DEFAULT 'text',
  	"width" numeric DEFAULT 160,
  	"sortable" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cells" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum__marketing_pages_v_blocks_code_language" DEFAULT 'typescript',
  	"theme" "enum__marketing_pages_v_blocks_code_theme" DEFAULT 'graphite',
  	"source" varchar,
  	"show_line_numbers" boolean DEFAULT true,
  	"filename" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_marketing_pages_v_blocks_code_sandbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"css" varchar,
  	"javascript" varchar,
  	"active_pane" "enum__marketing_pages_v_blocks_code_sandbox_active_pane" DEFAULT 'html',
  	"preview_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"background_image_url" varchar,
  	"tone" "enum_content_overrides_blocks_cta_tone" DEFAULT 'amber',
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_content_overrides_blocks_callout_kind" DEFAULT 'info',
  	"title" varchar,
  	"body" varchar,
  	"dismissible" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_content_overrides_blocks_quote_variant" DEFAULT 'plain',
  	"text" varchar,
  	"author" varchar,
  	"citation" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"alt" varchar,
  	"caption" varchar,
  	"ratio" numeric
  );
  
  CREATE TABLE "content_overrides_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"layout" "enum_content_overrides_blocks_gallery_layout" DEFAULT 'grid',
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_video_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"start" numeric DEFAULT 0
  );
  
  CREATE TABLE "content_overrides_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"poster_url" varchar,
  	"title" varchar,
  	"duration_seconds" numeric DEFAULT 0,
  	"captions_enabled" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"provider" "enum_content_overrides_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum_content_overrides_blocks_embed_aspect" DEFAULT '16:9',
  	"author_handle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_accordion_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"open" boolean DEFAULT false
  );
  
  CREATE TABLE "content_overrides_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"done" boolean DEFAULT false
  );
  
  CREATE TABLE "content_overrides_blocks_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_content_overrides_blocks_divider_variant" DEFAULT 'line',
  	"label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"label" varchar,
  	"description" varchar,
  	"granularity" "enum_content_overrides_blocks_timeline_events_granularity" DEFAULT 'year',
  	"tone" "enum_content_overrides_blocks_timeline_events_tone" DEFAULT 'neutral'
  );
  
  CREATE TABLE "content_overrides_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_poll_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"votes" numeric DEFAULT 0
  );
  
  CREATE TABLE "content_overrides_blocks_poll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"total_votes" numeric DEFAULT 0,
  	"multi_select" boolean DEFAULT false,
  	"closes_at" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"align" "enum_content_overrides_blocks_table_columns_align" DEFAULT 'left',
  	"format" "enum_content_overrides_blocks_table_columns_format" DEFAULT 'text',
  	"width" numeric DEFAULT 160,
  	"sortable" boolean DEFAULT false
  );
  
  CREATE TABLE "content_overrides_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cells" jsonb
  );
  
  CREATE TABLE "content_overrides_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"language" "enum_content_overrides_blocks_code_language" DEFAULT 'typescript',
  	"theme" "enum_content_overrides_blocks_code_theme" DEFAULT 'graphite',
  	"source" varchar,
  	"show_line_numbers" boolean DEFAULT true,
  	"filename" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "content_overrides_blocks_code_sandbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"css" varchar,
  	"javascript" varchar,
  	"active_pane" "enum_content_overrides_blocks_code_sandbox_active_pane" DEFAULT 'html',
  	"preview_label" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"heading" varchar,
  	"body" varchar,
  	"button_label" varchar,
  	"button_href" varchar,
  	"background_image_url" varchar,
  	"tone" "enum__content_overrides_v_blocks_cta_tone" DEFAULT 'amber',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_callout" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__content_overrides_v_blocks_callout_kind" DEFAULT 'info',
  	"title" varchar,
  	"body" varchar,
  	"dismissible" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_quote" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__content_overrides_v_blocks_quote_variant" DEFAULT 'plain',
  	"text" varchar,
  	"author" varchar,
  	"citation" varchar,
  	"image_url" varchar,
  	"image_alt" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"alt" varchar,
  	"caption" varchar,
  	"ratio" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"layout" "enum__content_overrides_v_blocks_gallery_layout" DEFAULT 'grid',
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_video_chapters" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"start" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_video" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"src" varchar,
  	"poster_url" varchar,
  	"title" varchar,
  	"duration_seconds" numeric DEFAULT 0,
  	"captions_enabled" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_embed" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"provider" "enum__content_overrides_v_blocks_embed_provider" DEFAULT 'youtube',
  	"url" varchar,
  	"title" varchar,
  	"aspect" "enum__content_overrides_v_blocks_embed_aspect" DEFAULT '16:9',
  	"author_handle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_accordion_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"open" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_accordion" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_checklist_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"done" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_checklist" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_divider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__content_overrides_v_blocks_divider_variant" DEFAULT 'line',
  	"label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_timeline_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar,
  	"label" varchar,
  	"description" varchar,
  	"granularity" "enum__content_overrides_v_blocks_timeline_events_granularity" DEFAULT 'year',
  	"tone" "enum__content_overrides_v_blocks_timeline_events_tone" DEFAULT 'neutral',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_poll_choices" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"votes" numeric DEFAULT 0,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_poll" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"total_votes" numeric DEFAULT 0,
  	"multi_select" boolean DEFAULT false,
  	"closes_at" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_table_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"align" "enum__content_overrides_v_blocks_table_columns_align" DEFAULT 'left',
  	"format" "enum__content_overrides_v_blocks_table_columns_format" DEFAULT 'text',
  	"width" numeric DEFAULT 160,
  	"sortable" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"cells" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"caption" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_code" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"language" "enum__content_overrides_v_blocks_code_language" DEFAULT 'typescript',
  	"theme" "enum__content_overrides_v_blocks_code_theme" DEFAULT 'graphite',
  	"source" varchar,
  	"show_line_numbers" boolean DEFAULT true,
  	"filename" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_content_overrides_v_blocks_code_sandbox" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"html" varchar,
  	"css" varchar,
  	"javascript" varchar,
  	"active_pane" "enum__content_overrides_v_blocks_code_sandbox_active_pane" DEFAULT 'html',
  	"preview_label" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "marketing_pages_blocks_cta" ADD CONSTRAINT "marketing_pages_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_callout" ADD CONSTRAINT "marketing_pages_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_quote" ADD CONSTRAINT "marketing_pages_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_gallery_items" ADD CONSTRAINT "marketing_pages_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_gallery" ADD CONSTRAINT "marketing_pages_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_video_chapters" ADD CONSTRAINT "marketing_pages_blocks_video_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_video" ADD CONSTRAINT "marketing_pages_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_embed" ADD CONSTRAINT "marketing_pages_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_accordion_entries" ADD CONSTRAINT "marketing_pages_blocks_accordion_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_accordion" ADD CONSTRAINT "marketing_pages_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_checklist_items" ADD CONSTRAINT "marketing_pages_blocks_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_checklist" ADD CONSTRAINT "marketing_pages_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_divider" ADD CONSTRAINT "marketing_pages_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_timeline_events" ADD CONSTRAINT "marketing_pages_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_timeline" ADD CONSTRAINT "marketing_pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_poll_choices" ADD CONSTRAINT "marketing_pages_blocks_poll_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_poll"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_poll" ADD CONSTRAINT "marketing_pages_blocks_poll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_table_columns" ADD CONSTRAINT "marketing_pages_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_table_rows" ADD CONSTRAINT "marketing_pages_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_table" ADD CONSTRAINT "marketing_pages_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_code" ADD CONSTRAINT "marketing_pages_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "marketing_pages_blocks_code_sandbox" ADD CONSTRAINT "marketing_pages_blocks_code_sandbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."marketing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_cta" ADD CONSTRAINT "_marketing_pages_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_callout" ADD CONSTRAINT "_marketing_pages_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_quote" ADD CONSTRAINT "_marketing_pages_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_gallery_items" ADD CONSTRAINT "_marketing_pages_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_gallery" ADD CONSTRAINT "_marketing_pages_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_video_chapters" ADD CONSTRAINT "_marketing_pages_v_blocks_video_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_video" ADD CONSTRAINT "_marketing_pages_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_embed" ADD CONSTRAINT "_marketing_pages_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_accordion_entries" ADD CONSTRAINT "_marketing_pages_v_blocks_accordion_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_accordion" ADD CONSTRAINT "_marketing_pages_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_checklist_items" ADD CONSTRAINT "_marketing_pages_v_blocks_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_checklist" ADD CONSTRAINT "_marketing_pages_v_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_divider" ADD CONSTRAINT "_marketing_pages_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_timeline_events" ADD CONSTRAINT "_marketing_pages_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_timeline" ADD CONSTRAINT "_marketing_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_poll_choices" ADD CONSTRAINT "_marketing_pages_v_blocks_poll_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_poll"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_poll" ADD CONSTRAINT "_marketing_pages_v_blocks_poll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_table_columns" ADD CONSTRAINT "_marketing_pages_v_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_table_rows" ADD CONSTRAINT "_marketing_pages_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_table" ADD CONSTRAINT "_marketing_pages_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_code" ADD CONSTRAINT "_marketing_pages_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_marketing_pages_v_blocks_code_sandbox" ADD CONSTRAINT "_marketing_pages_v_blocks_code_sandbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_marketing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_cta" ADD CONSTRAINT "content_overrides_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_callout" ADD CONSTRAINT "content_overrides_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_quote" ADD CONSTRAINT "content_overrides_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_gallery_items" ADD CONSTRAINT "content_overrides_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_gallery" ADD CONSTRAINT "content_overrides_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_video_chapters" ADD CONSTRAINT "content_overrides_blocks_video_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_video" ADD CONSTRAINT "content_overrides_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_embed" ADD CONSTRAINT "content_overrides_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_accordion_entries" ADD CONSTRAINT "content_overrides_blocks_accordion_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_accordion" ADD CONSTRAINT "content_overrides_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_checklist_items" ADD CONSTRAINT "content_overrides_blocks_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_checklist" ADD CONSTRAINT "content_overrides_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_divider" ADD CONSTRAINT "content_overrides_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_timeline_events" ADD CONSTRAINT "content_overrides_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_timeline" ADD CONSTRAINT "content_overrides_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_poll_choices" ADD CONSTRAINT "content_overrides_blocks_poll_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_poll"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_poll" ADD CONSTRAINT "content_overrides_blocks_poll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_table_columns" ADD CONSTRAINT "content_overrides_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_table_rows" ADD CONSTRAINT "content_overrides_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_table" ADD CONSTRAINT "content_overrides_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_code" ADD CONSTRAINT "content_overrides_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_blocks_code_sandbox" ADD CONSTRAINT "content_overrides_blocks_code_sandbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_cta" ADD CONSTRAINT "_content_overrides_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_callout" ADD CONSTRAINT "_content_overrides_v_blocks_callout_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_quote" ADD CONSTRAINT "_content_overrides_v_blocks_quote_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_gallery_items" ADD CONSTRAINT "_content_overrides_v_blocks_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_gallery" ADD CONSTRAINT "_content_overrides_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_video_chapters" ADD CONSTRAINT "_content_overrides_v_blocks_video_chapters_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_video"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_video" ADD CONSTRAINT "_content_overrides_v_blocks_video_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_embed" ADD CONSTRAINT "_content_overrides_v_blocks_embed_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_accordion_entries" ADD CONSTRAINT "_content_overrides_v_blocks_accordion_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_accordion"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_accordion" ADD CONSTRAINT "_content_overrides_v_blocks_accordion_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_checklist_items" ADD CONSTRAINT "_content_overrides_v_blocks_checklist_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_checklist"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_checklist" ADD CONSTRAINT "_content_overrides_v_blocks_checklist_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_divider" ADD CONSTRAINT "_content_overrides_v_blocks_divider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_timeline_events" ADD CONSTRAINT "_content_overrides_v_blocks_timeline_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_timeline" ADD CONSTRAINT "_content_overrides_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_poll_choices" ADD CONSTRAINT "_content_overrides_v_blocks_poll_choices_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_poll"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_poll" ADD CONSTRAINT "_content_overrides_v_blocks_poll_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_table_columns" ADD CONSTRAINT "_content_overrides_v_blocks_table_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_table_rows" ADD CONSTRAINT "_content_overrides_v_blocks_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v_blocks_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_table" ADD CONSTRAINT "_content_overrides_v_blocks_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_code" ADD CONSTRAINT "_content_overrides_v_blocks_code_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_blocks_code_sandbox" ADD CONSTRAINT "_content_overrides_v_blocks_code_sandbox_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "marketing_pages_blocks_cta_order_idx" ON "marketing_pages_blocks_cta" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_cta_parent_id_idx" ON "marketing_pages_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_cta_path_idx" ON "marketing_pages_blocks_cta" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_callout_order_idx" ON "marketing_pages_blocks_callout" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_callout_parent_id_idx" ON "marketing_pages_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_callout_path_idx" ON "marketing_pages_blocks_callout" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_quote_order_idx" ON "marketing_pages_blocks_quote" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_quote_parent_id_idx" ON "marketing_pages_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_quote_path_idx" ON "marketing_pages_blocks_quote" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_gallery_items_order_idx" ON "marketing_pages_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_gallery_items_parent_id_idx" ON "marketing_pages_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_gallery_order_idx" ON "marketing_pages_blocks_gallery" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_gallery_parent_id_idx" ON "marketing_pages_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_gallery_path_idx" ON "marketing_pages_blocks_gallery" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_video_chapters_order_idx" ON "marketing_pages_blocks_video_chapters" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_video_chapters_parent_id_idx" ON "marketing_pages_blocks_video_chapters" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_video_order_idx" ON "marketing_pages_blocks_video" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_video_parent_id_idx" ON "marketing_pages_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_video_path_idx" ON "marketing_pages_blocks_video" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_embed_order_idx" ON "marketing_pages_blocks_embed" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_embed_parent_id_idx" ON "marketing_pages_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_embed_path_idx" ON "marketing_pages_blocks_embed" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_accordion_entries_order_idx" ON "marketing_pages_blocks_accordion_entries" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_accordion_entries_parent_id_idx" ON "marketing_pages_blocks_accordion_entries" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_accordion_order_idx" ON "marketing_pages_blocks_accordion" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_accordion_parent_id_idx" ON "marketing_pages_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_accordion_path_idx" ON "marketing_pages_blocks_accordion" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_checklist_items_order_idx" ON "marketing_pages_blocks_checklist_items" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_checklist_items_parent_id_idx" ON "marketing_pages_blocks_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_checklist_order_idx" ON "marketing_pages_blocks_checklist" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_checklist_parent_id_idx" ON "marketing_pages_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_checklist_path_idx" ON "marketing_pages_blocks_checklist" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_divider_order_idx" ON "marketing_pages_blocks_divider" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_divider_parent_id_idx" ON "marketing_pages_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_divider_path_idx" ON "marketing_pages_blocks_divider" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_timeline_events_order_idx" ON "marketing_pages_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_timeline_events_parent_id_idx" ON "marketing_pages_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_timeline_order_idx" ON "marketing_pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_timeline_parent_id_idx" ON "marketing_pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_timeline_path_idx" ON "marketing_pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_poll_choices_order_idx" ON "marketing_pages_blocks_poll_choices" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_poll_choices_parent_id_idx" ON "marketing_pages_blocks_poll_choices" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_poll_order_idx" ON "marketing_pages_blocks_poll" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_poll_parent_id_idx" ON "marketing_pages_blocks_poll" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_poll_path_idx" ON "marketing_pages_blocks_poll" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_table_columns_order_idx" ON "marketing_pages_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_table_columns_parent_id_idx" ON "marketing_pages_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_table_rows_order_idx" ON "marketing_pages_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_table_rows_parent_id_idx" ON "marketing_pages_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_table_order_idx" ON "marketing_pages_blocks_table" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_table_parent_id_idx" ON "marketing_pages_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_table_path_idx" ON "marketing_pages_blocks_table" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_code_order_idx" ON "marketing_pages_blocks_code" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_code_parent_id_idx" ON "marketing_pages_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_code_path_idx" ON "marketing_pages_blocks_code" USING btree ("_path");
  CREATE INDEX "marketing_pages_blocks_code_sandbox_order_idx" ON "marketing_pages_blocks_code_sandbox" USING btree ("_order");
  CREATE INDEX "marketing_pages_blocks_code_sandbox_parent_id_idx" ON "marketing_pages_blocks_code_sandbox" USING btree ("_parent_id");
  CREATE INDEX "marketing_pages_blocks_code_sandbox_path_idx" ON "marketing_pages_blocks_code_sandbox" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_cta_order_idx" ON "_marketing_pages_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_cta_parent_id_idx" ON "_marketing_pages_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_cta_path_idx" ON "_marketing_pages_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_callout_order_idx" ON "_marketing_pages_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_callout_parent_id_idx" ON "_marketing_pages_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_callout_path_idx" ON "_marketing_pages_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_quote_order_idx" ON "_marketing_pages_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_quote_parent_id_idx" ON "_marketing_pages_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_quote_path_idx" ON "_marketing_pages_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_gallery_items_order_idx" ON "_marketing_pages_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_gallery_items_parent_id_idx" ON "_marketing_pages_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_gallery_order_idx" ON "_marketing_pages_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_gallery_parent_id_idx" ON "_marketing_pages_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_gallery_path_idx" ON "_marketing_pages_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_video_chapters_order_idx" ON "_marketing_pages_v_blocks_video_chapters" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_video_chapters_parent_id_idx" ON "_marketing_pages_v_blocks_video_chapters" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_video_order_idx" ON "_marketing_pages_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_video_parent_id_idx" ON "_marketing_pages_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_video_path_idx" ON "_marketing_pages_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_embed_order_idx" ON "_marketing_pages_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_embed_parent_id_idx" ON "_marketing_pages_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_embed_path_idx" ON "_marketing_pages_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_accordion_entries_order_idx" ON "_marketing_pages_v_blocks_accordion_entries" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_accordion_entries_parent_id_idx" ON "_marketing_pages_v_blocks_accordion_entries" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_accordion_order_idx" ON "_marketing_pages_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_accordion_parent_id_idx" ON "_marketing_pages_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_accordion_path_idx" ON "_marketing_pages_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_checklist_items_order_idx" ON "_marketing_pages_v_blocks_checklist_items" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_checklist_items_parent_id_idx" ON "_marketing_pages_v_blocks_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_checklist_order_idx" ON "_marketing_pages_v_blocks_checklist" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_checklist_parent_id_idx" ON "_marketing_pages_v_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_checklist_path_idx" ON "_marketing_pages_v_blocks_checklist" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_divider_order_idx" ON "_marketing_pages_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_divider_parent_id_idx" ON "_marketing_pages_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_divider_path_idx" ON "_marketing_pages_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_timeline_events_order_idx" ON "_marketing_pages_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_timeline_events_parent_id_idx" ON "_marketing_pages_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_timeline_order_idx" ON "_marketing_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_timeline_parent_id_idx" ON "_marketing_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_timeline_path_idx" ON "_marketing_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_poll_choices_order_idx" ON "_marketing_pages_v_blocks_poll_choices" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_poll_choices_parent_id_idx" ON "_marketing_pages_v_blocks_poll_choices" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_poll_order_idx" ON "_marketing_pages_v_blocks_poll" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_poll_parent_id_idx" ON "_marketing_pages_v_blocks_poll" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_poll_path_idx" ON "_marketing_pages_v_blocks_poll" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_table_columns_order_idx" ON "_marketing_pages_v_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_table_columns_parent_id_idx" ON "_marketing_pages_v_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_table_rows_order_idx" ON "_marketing_pages_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_table_rows_parent_id_idx" ON "_marketing_pages_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_table_order_idx" ON "_marketing_pages_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_table_parent_id_idx" ON "_marketing_pages_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_table_path_idx" ON "_marketing_pages_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_code_order_idx" ON "_marketing_pages_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_code_parent_id_idx" ON "_marketing_pages_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_code_path_idx" ON "_marketing_pages_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_marketing_pages_v_blocks_code_sandbox_order_idx" ON "_marketing_pages_v_blocks_code_sandbox" USING btree ("_order");
  CREATE INDEX "_marketing_pages_v_blocks_code_sandbox_parent_id_idx" ON "_marketing_pages_v_blocks_code_sandbox" USING btree ("_parent_id");
  CREATE INDEX "_marketing_pages_v_blocks_code_sandbox_path_idx" ON "_marketing_pages_v_blocks_code_sandbox" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_cta_order_idx" ON "content_overrides_blocks_cta" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_cta_parent_id_idx" ON "content_overrides_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_cta_path_idx" ON "content_overrides_blocks_cta" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_callout_order_idx" ON "content_overrides_blocks_callout" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_callout_parent_id_idx" ON "content_overrides_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_callout_path_idx" ON "content_overrides_blocks_callout" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_quote_order_idx" ON "content_overrides_blocks_quote" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_quote_parent_id_idx" ON "content_overrides_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_quote_path_idx" ON "content_overrides_blocks_quote" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_gallery_items_order_idx" ON "content_overrides_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_gallery_items_parent_id_idx" ON "content_overrides_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_gallery_order_idx" ON "content_overrides_blocks_gallery" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_gallery_parent_id_idx" ON "content_overrides_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_gallery_path_idx" ON "content_overrides_blocks_gallery" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_video_chapters_order_idx" ON "content_overrides_blocks_video_chapters" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_video_chapters_parent_id_idx" ON "content_overrides_blocks_video_chapters" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_video_order_idx" ON "content_overrides_blocks_video" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_video_parent_id_idx" ON "content_overrides_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_video_path_idx" ON "content_overrides_blocks_video" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_embed_order_idx" ON "content_overrides_blocks_embed" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_embed_parent_id_idx" ON "content_overrides_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_embed_path_idx" ON "content_overrides_blocks_embed" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_accordion_entries_order_idx" ON "content_overrides_blocks_accordion_entries" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_accordion_entries_parent_id_idx" ON "content_overrides_blocks_accordion_entries" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_accordion_order_idx" ON "content_overrides_blocks_accordion" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_accordion_parent_id_idx" ON "content_overrides_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_accordion_path_idx" ON "content_overrides_blocks_accordion" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_checklist_items_order_idx" ON "content_overrides_blocks_checklist_items" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_checklist_items_parent_id_idx" ON "content_overrides_blocks_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_checklist_order_idx" ON "content_overrides_blocks_checklist" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_checklist_parent_id_idx" ON "content_overrides_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_checklist_path_idx" ON "content_overrides_blocks_checklist" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_divider_order_idx" ON "content_overrides_blocks_divider" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_divider_parent_id_idx" ON "content_overrides_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_divider_path_idx" ON "content_overrides_blocks_divider" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_timeline_events_order_idx" ON "content_overrides_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_timeline_events_parent_id_idx" ON "content_overrides_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_timeline_order_idx" ON "content_overrides_blocks_timeline" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_timeline_parent_id_idx" ON "content_overrides_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_timeline_path_idx" ON "content_overrides_blocks_timeline" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_poll_choices_order_idx" ON "content_overrides_blocks_poll_choices" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_poll_choices_parent_id_idx" ON "content_overrides_blocks_poll_choices" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_poll_order_idx" ON "content_overrides_blocks_poll" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_poll_parent_id_idx" ON "content_overrides_blocks_poll" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_poll_path_idx" ON "content_overrides_blocks_poll" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_table_columns_order_idx" ON "content_overrides_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_table_columns_parent_id_idx" ON "content_overrides_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_table_rows_order_idx" ON "content_overrides_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_table_rows_parent_id_idx" ON "content_overrides_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_table_order_idx" ON "content_overrides_blocks_table" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_table_parent_id_idx" ON "content_overrides_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_table_path_idx" ON "content_overrides_blocks_table" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_code_order_idx" ON "content_overrides_blocks_code" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_code_parent_id_idx" ON "content_overrides_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_code_path_idx" ON "content_overrides_blocks_code" USING btree ("_path");
  CREATE INDEX "content_overrides_blocks_code_sandbox_order_idx" ON "content_overrides_blocks_code_sandbox" USING btree ("_order");
  CREATE INDEX "content_overrides_blocks_code_sandbox_parent_id_idx" ON "content_overrides_blocks_code_sandbox" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_blocks_code_sandbox_path_idx" ON "content_overrides_blocks_code_sandbox" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_cta_order_idx" ON "_content_overrides_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_cta_parent_id_idx" ON "_content_overrides_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_cta_path_idx" ON "_content_overrides_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_callout_order_idx" ON "_content_overrides_v_blocks_callout" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_callout_parent_id_idx" ON "_content_overrides_v_blocks_callout" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_callout_path_idx" ON "_content_overrides_v_blocks_callout" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_quote_order_idx" ON "_content_overrides_v_blocks_quote" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_quote_parent_id_idx" ON "_content_overrides_v_blocks_quote" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_quote_path_idx" ON "_content_overrides_v_blocks_quote" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_gallery_items_order_idx" ON "_content_overrides_v_blocks_gallery_items" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_gallery_items_parent_id_idx" ON "_content_overrides_v_blocks_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_gallery_order_idx" ON "_content_overrides_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_gallery_parent_id_idx" ON "_content_overrides_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_gallery_path_idx" ON "_content_overrides_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_video_chapters_order_idx" ON "_content_overrides_v_blocks_video_chapters" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_video_chapters_parent_id_idx" ON "_content_overrides_v_blocks_video_chapters" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_video_order_idx" ON "_content_overrides_v_blocks_video" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_video_parent_id_idx" ON "_content_overrides_v_blocks_video" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_video_path_idx" ON "_content_overrides_v_blocks_video" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_embed_order_idx" ON "_content_overrides_v_blocks_embed" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_embed_parent_id_idx" ON "_content_overrides_v_blocks_embed" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_embed_path_idx" ON "_content_overrides_v_blocks_embed" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_accordion_entries_order_idx" ON "_content_overrides_v_blocks_accordion_entries" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_accordion_entries_parent_id_idx" ON "_content_overrides_v_blocks_accordion_entries" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_accordion_order_idx" ON "_content_overrides_v_blocks_accordion" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_accordion_parent_id_idx" ON "_content_overrides_v_blocks_accordion" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_accordion_path_idx" ON "_content_overrides_v_blocks_accordion" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_checklist_items_order_idx" ON "_content_overrides_v_blocks_checklist_items" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_checklist_items_parent_id_idx" ON "_content_overrides_v_blocks_checklist_items" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_checklist_order_idx" ON "_content_overrides_v_blocks_checklist" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_checklist_parent_id_idx" ON "_content_overrides_v_blocks_checklist" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_checklist_path_idx" ON "_content_overrides_v_blocks_checklist" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_divider_order_idx" ON "_content_overrides_v_blocks_divider" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_divider_parent_id_idx" ON "_content_overrides_v_blocks_divider" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_divider_path_idx" ON "_content_overrides_v_blocks_divider" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_timeline_events_order_idx" ON "_content_overrides_v_blocks_timeline_events" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_timeline_events_parent_id_idx" ON "_content_overrides_v_blocks_timeline_events" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_timeline_order_idx" ON "_content_overrides_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_timeline_parent_id_idx" ON "_content_overrides_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_timeline_path_idx" ON "_content_overrides_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_poll_choices_order_idx" ON "_content_overrides_v_blocks_poll_choices" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_poll_choices_parent_id_idx" ON "_content_overrides_v_blocks_poll_choices" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_poll_order_idx" ON "_content_overrides_v_blocks_poll" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_poll_parent_id_idx" ON "_content_overrides_v_blocks_poll" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_poll_path_idx" ON "_content_overrides_v_blocks_poll" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_table_columns_order_idx" ON "_content_overrides_v_blocks_table_columns" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_table_columns_parent_id_idx" ON "_content_overrides_v_blocks_table_columns" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_table_rows_order_idx" ON "_content_overrides_v_blocks_table_rows" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_table_rows_parent_id_idx" ON "_content_overrides_v_blocks_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_table_order_idx" ON "_content_overrides_v_blocks_table" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_table_parent_id_idx" ON "_content_overrides_v_blocks_table" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_table_path_idx" ON "_content_overrides_v_blocks_table" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_code_order_idx" ON "_content_overrides_v_blocks_code" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_code_parent_id_idx" ON "_content_overrides_v_blocks_code" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_code_path_idx" ON "_content_overrides_v_blocks_code" USING btree ("_path");
  CREATE INDEX "_content_overrides_v_blocks_code_sandbox_order_idx" ON "_content_overrides_v_blocks_code_sandbox" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_blocks_code_sandbox_parent_id_idx" ON "_content_overrides_v_blocks_code_sandbox" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_blocks_code_sandbox_path_idx" ON "_content_overrides_v_blocks_code_sandbox" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "marketing_pages_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_video_chapters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_accordion_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_checklist_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_divider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_poll_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_poll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "marketing_pages_blocks_code_sandbox" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_video_chapters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_accordion_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_checklist_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_divider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_poll_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_poll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_marketing_pages_v_blocks_code_sandbox" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_video_chapters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_accordion_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_checklist_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_divider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_poll_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_poll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "content_overrides_blocks_code_sandbox" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_callout" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_quote" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_gallery_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_video_chapters" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_video" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_embed" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_accordion_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_accordion" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_checklist_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_checklist" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_divider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_timeline_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_poll_choices" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_poll" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_table_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_code" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_content_overrides_v_blocks_code_sandbox" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "marketing_pages_blocks_cta" CASCADE;
  DROP TABLE "marketing_pages_blocks_callout" CASCADE;
  DROP TABLE "marketing_pages_blocks_quote" CASCADE;
  DROP TABLE "marketing_pages_blocks_gallery_items" CASCADE;
  DROP TABLE "marketing_pages_blocks_gallery" CASCADE;
  DROP TABLE "marketing_pages_blocks_video_chapters" CASCADE;
  DROP TABLE "marketing_pages_blocks_video" CASCADE;
  DROP TABLE "marketing_pages_blocks_embed" CASCADE;
  DROP TABLE "marketing_pages_blocks_accordion_entries" CASCADE;
  DROP TABLE "marketing_pages_blocks_accordion" CASCADE;
  DROP TABLE "marketing_pages_blocks_checklist_items" CASCADE;
  DROP TABLE "marketing_pages_blocks_checklist" CASCADE;
  DROP TABLE "marketing_pages_blocks_divider" CASCADE;
  DROP TABLE "marketing_pages_blocks_timeline_events" CASCADE;
  DROP TABLE "marketing_pages_blocks_timeline" CASCADE;
  DROP TABLE "marketing_pages_blocks_poll_choices" CASCADE;
  DROP TABLE "marketing_pages_blocks_poll" CASCADE;
  DROP TABLE "marketing_pages_blocks_table_columns" CASCADE;
  DROP TABLE "marketing_pages_blocks_table_rows" CASCADE;
  DROP TABLE "marketing_pages_blocks_table" CASCADE;
  DROP TABLE "marketing_pages_blocks_code" CASCADE;
  DROP TABLE "marketing_pages_blocks_code_sandbox" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_cta" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_callout" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_quote" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_gallery" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_video_chapters" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_video" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_embed" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_accordion_entries" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_accordion" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_checklist_items" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_checklist" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_divider" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_poll_choices" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_poll" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_table_columns" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_table_rows" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_table" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_code" CASCADE;
  DROP TABLE "_marketing_pages_v_blocks_code_sandbox" CASCADE;
  DROP TABLE "content_overrides_blocks_cta" CASCADE;
  DROP TABLE "content_overrides_blocks_callout" CASCADE;
  DROP TABLE "content_overrides_blocks_quote" CASCADE;
  DROP TABLE "content_overrides_blocks_gallery_items" CASCADE;
  DROP TABLE "content_overrides_blocks_gallery" CASCADE;
  DROP TABLE "content_overrides_blocks_video_chapters" CASCADE;
  DROP TABLE "content_overrides_blocks_video" CASCADE;
  DROP TABLE "content_overrides_blocks_embed" CASCADE;
  DROP TABLE "content_overrides_blocks_accordion_entries" CASCADE;
  DROP TABLE "content_overrides_blocks_accordion" CASCADE;
  DROP TABLE "content_overrides_blocks_checklist_items" CASCADE;
  DROP TABLE "content_overrides_blocks_checklist" CASCADE;
  DROP TABLE "content_overrides_blocks_divider" CASCADE;
  DROP TABLE "content_overrides_blocks_timeline_events" CASCADE;
  DROP TABLE "content_overrides_blocks_timeline" CASCADE;
  DROP TABLE "content_overrides_blocks_poll_choices" CASCADE;
  DROP TABLE "content_overrides_blocks_poll" CASCADE;
  DROP TABLE "content_overrides_blocks_table_columns" CASCADE;
  DROP TABLE "content_overrides_blocks_table_rows" CASCADE;
  DROP TABLE "content_overrides_blocks_table" CASCADE;
  DROP TABLE "content_overrides_blocks_code" CASCADE;
  DROP TABLE "content_overrides_blocks_code_sandbox" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_cta" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_callout" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_quote" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_gallery_items" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_gallery" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_video_chapters" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_video" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_embed" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_accordion_entries" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_accordion" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_checklist_items" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_checklist" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_divider" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_timeline_events" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_timeline" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_poll_choices" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_poll" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_table_columns" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_table_rows" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_table" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_code" CASCADE;
  DROP TABLE "_content_overrides_v_blocks_code_sandbox" CASCADE;
  DROP TYPE "public"."enum_marketing_pages_blocks_cta_tone";
  DROP TYPE "public"."enum_marketing_pages_blocks_callout_kind";
  DROP TYPE "public"."enum_marketing_pages_blocks_quote_variant";
  DROP TYPE "public"."enum_marketing_pages_blocks_gallery_layout";
  DROP TYPE "public"."enum_marketing_pages_blocks_embed_provider";
  DROP TYPE "public"."enum_marketing_pages_blocks_embed_aspect";
  DROP TYPE "public"."enum_marketing_pages_blocks_divider_variant";
  DROP TYPE "public"."enum_marketing_pages_blocks_timeline_events_granularity";
  DROP TYPE "public"."enum_marketing_pages_blocks_timeline_events_tone";
  DROP TYPE "public"."enum_marketing_pages_blocks_table_columns_align";
  DROP TYPE "public"."enum_marketing_pages_blocks_table_columns_format";
  DROP TYPE "public"."enum_marketing_pages_blocks_code_language";
  DROP TYPE "public"."enum_marketing_pages_blocks_code_theme";
  DROP TYPE "public"."enum_marketing_pages_blocks_code_sandbox_active_pane";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_cta_tone";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_callout_kind";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_quote_variant";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_embed_provider";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_embed_aspect";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_divider_variant";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_timeline_events_granularity";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_timeline_events_tone";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_table_columns_align";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_table_columns_format";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_code_language";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_code_theme";
  DROP TYPE "public"."enum__marketing_pages_v_blocks_code_sandbox_active_pane";
  DROP TYPE "public"."enum_content_overrides_blocks_cta_tone";
  DROP TYPE "public"."enum_content_overrides_blocks_callout_kind";
  DROP TYPE "public"."enum_content_overrides_blocks_quote_variant";
  DROP TYPE "public"."enum_content_overrides_blocks_gallery_layout";
  DROP TYPE "public"."enum_content_overrides_blocks_embed_provider";
  DROP TYPE "public"."enum_content_overrides_blocks_embed_aspect";
  DROP TYPE "public"."enum_content_overrides_blocks_divider_variant";
  DROP TYPE "public"."enum_content_overrides_blocks_timeline_events_granularity";
  DROP TYPE "public"."enum_content_overrides_blocks_timeline_events_tone";
  DROP TYPE "public"."enum_content_overrides_blocks_table_columns_align";
  DROP TYPE "public"."enum_content_overrides_blocks_table_columns_format";
  DROP TYPE "public"."enum_content_overrides_blocks_code_language";
  DROP TYPE "public"."enum_content_overrides_blocks_code_theme";
  DROP TYPE "public"."enum_content_overrides_blocks_code_sandbox_active_pane";
  DROP TYPE "public"."enum__content_overrides_v_blocks_cta_tone";
  DROP TYPE "public"."enum__content_overrides_v_blocks_callout_kind";
  DROP TYPE "public"."enum__content_overrides_v_blocks_quote_variant";
  DROP TYPE "public"."enum__content_overrides_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__content_overrides_v_blocks_embed_provider";
  DROP TYPE "public"."enum__content_overrides_v_blocks_embed_aspect";
  DROP TYPE "public"."enum__content_overrides_v_blocks_divider_variant";
  DROP TYPE "public"."enum__content_overrides_v_blocks_timeline_events_granularity";
  DROP TYPE "public"."enum__content_overrides_v_blocks_timeline_events_tone";
  DROP TYPE "public"."enum__content_overrides_v_blocks_table_columns_align";
  DROP TYPE "public"."enum__content_overrides_v_blocks_table_columns_format";
  DROP TYPE "public"."enum__content_overrides_v_blocks_code_language";
  DROP TYPE "public"."enum__content_overrides_v_blocks_code_theme";
  DROP TYPE "public"."enum__content_overrides_v_blocks_code_sandbox_active_pane";`)
}
