import type { MigrateUpArgs, MigrateDownArgs } from '@payloadcms/db-postgres'
import { sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "content_overrides_content_service_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "content_overrides_content_service_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "content_overrides_content_service_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "content_overrides_content_location_nearby" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "content_overrides_content_services_hub_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "content_overrides_content_services_hub_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "content_overrides_content_about_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "content_overrides_content_about_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "content_overrides_content_about_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar
  );
  
  CREATE TABLE "content_overrides_content_about_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"item" varchar
  );
  
  CREATE TABLE "content_overrides_content_products_product_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "content_overrides_content_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"src" varchar,
  	"alt" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "content_overrides_content_faq_page_general_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar
  );
  
  CREATE TABLE "content_overrides_content_homepage_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"blurb" varchar
  );
  
  CREATE TABLE "content_overrides_content_homepage_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_service_includes" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_service_proof" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_service_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_location_nearby" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_services_hub_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"value" varchar,
  	"label" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_services_hub_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_about_story_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_about_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_about_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"body" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_about_service_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"item" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_products_product_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"href" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_gallery_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"src" varchar,
  	"alt" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_faq_page_general_faqs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_homepage_services" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"blurb" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_content_overrides_v_version_content_homepage_marquee" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  ALTER TABLE "content_overrides" ADD COLUMN "content_location_local_intent" varchar;
  ALTER TABLE "content_overrides" ADD COLUMN "content_location_workshop_context" varchar;
  ALTER TABLE "content_overrides" ADD COLUMN "content_area_description" varchar;
  ALTER TABLE "content_overrides" ADD COLUMN "content_part_category_description" varchar;
  ALTER TABLE "content_overrides" ADD COLUMN "content_products_intro_heading" varchar;
  ALTER TABLE "content_overrides" ADD COLUMN "content_products_intro_body" varchar;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "version_content_location_local_intent" varchar;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "version_content_location_workshop_context" varchar;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "version_content_area_description" varchar;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "version_content_part_category_description" varchar;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "version_content_products_intro_heading" varchar;
  ALTER TABLE "_content_overrides_v" ADD COLUMN "version_content_products_intro_body" varchar;
  ALTER TABLE "content_overrides_content_service_includes" ADD CONSTRAINT "content_overrides_content_service_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_service_proof" ADD CONSTRAINT "content_overrides_content_service_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_service_faq" ADD CONSTRAINT "content_overrides_content_service_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_location_nearby" ADD CONSTRAINT "content_overrides_content_location_nearby_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_services_hub_stats" ADD CONSTRAINT "content_overrides_content_services_hub_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_services_hub_steps" ADD CONSTRAINT "content_overrides_content_services_hub_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_about_story_paragraphs" ADD CONSTRAINT "content_overrides_content_about_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_about_cards" ADD CONSTRAINT "content_overrides_content_about_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_about_steps" ADD CONSTRAINT "content_overrides_content_about_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_about_service_list" ADD CONSTRAINT "content_overrides_content_about_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_products_product_links" ADD CONSTRAINT "content_overrides_content_products_product_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_gallery_items" ADD CONSTRAINT "content_overrides_content_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "content_overrides_content_gallery_items" ADD CONSTRAINT "content_overrides_content_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_faq_page_general_faqs" ADD CONSTRAINT "content_overrides_content_faq_page_general_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_homepage_services" ADD CONSTRAINT "content_overrides_content_homepage_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "content_overrides_content_homepage_marquee" ADD CONSTRAINT "content_overrides_content_homepage_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."content_overrides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_service_includes" ADD CONSTRAINT "_content_overrides_v_version_content_service_includes_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_service_proof" ADD CONSTRAINT "_content_overrides_v_version_content_service_proof_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_service_faq" ADD CONSTRAINT "_content_overrides_v_version_content_service_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_location_nearby" ADD CONSTRAINT "_content_overrides_v_version_content_location_nearby_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_services_hub_stats" ADD CONSTRAINT "_content_overrides_v_version_content_services_hub_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_services_hub_steps" ADD CONSTRAINT "_content_overrides_v_version_content_services_hub_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_about_story_paragraphs" ADD CONSTRAINT "_content_overrides_v_version_content_about_story_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_about_cards" ADD CONSTRAINT "_content_overrides_v_version_content_about_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_about_steps" ADD CONSTRAINT "_content_overrides_v_version_content_about_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_about_service_list" ADD CONSTRAINT "_content_overrides_v_version_content_about_service_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_products_product_links" ADD CONSTRAINT "_content_overrides_v_version_content_products_product_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_gallery_items" ADD CONSTRAINT "_content_overrides_v_version_content_gallery_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_gallery_items" ADD CONSTRAINT "_content_overrides_v_version_content_gallery_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_faq_page_general_faqs" ADD CONSTRAINT "_content_overrides_v_version_content_faq_page_general_faqs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_homepage_services" ADD CONSTRAINT "_content_overrides_v_version_content_homepage_services_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_content_overrides_v_version_content_homepage_marquee" ADD CONSTRAINT "_content_overrides_v_version_content_homepage_marquee_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_content_overrides_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "content_overrides_content_service_includes_order_idx" ON "content_overrides_content_service_includes" USING btree ("_order");
  CREATE INDEX "content_overrides_content_service_includes_parent_id_idx" ON "content_overrides_content_service_includes" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_service_proof_order_idx" ON "content_overrides_content_service_proof" USING btree ("_order");
  CREATE INDEX "content_overrides_content_service_proof_parent_id_idx" ON "content_overrides_content_service_proof" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_service_faq_order_idx" ON "content_overrides_content_service_faq" USING btree ("_order");
  CREATE INDEX "content_overrides_content_service_faq_parent_id_idx" ON "content_overrides_content_service_faq" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_location_nearby_order_idx" ON "content_overrides_content_location_nearby" USING btree ("_order");
  CREATE INDEX "content_overrides_content_location_nearby_parent_id_idx" ON "content_overrides_content_location_nearby" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_services_hub_stats_order_idx" ON "content_overrides_content_services_hub_stats" USING btree ("_order");
  CREATE INDEX "content_overrides_content_services_hub_stats_parent_id_idx" ON "content_overrides_content_services_hub_stats" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_services_hub_steps_order_idx" ON "content_overrides_content_services_hub_steps" USING btree ("_order");
  CREATE INDEX "content_overrides_content_services_hub_steps_parent_id_idx" ON "content_overrides_content_services_hub_steps" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_about_story_paragraphs_order_idx" ON "content_overrides_content_about_story_paragraphs" USING btree ("_order");
  CREATE INDEX "content_overrides_content_about_story_paragraphs_parent_id_idx" ON "content_overrides_content_about_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_about_cards_order_idx" ON "content_overrides_content_about_cards" USING btree ("_order");
  CREATE INDEX "content_overrides_content_about_cards_parent_id_idx" ON "content_overrides_content_about_cards" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_about_steps_order_idx" ON "content_overrides_content_about_steps" USING btree ("_order");
  CREATE INDEX "content_overrides_content_about_steps_parent_id_idx" ON "content_overrides_content_about_steps" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_about_service_list_order_idx" ON "content_overrides_content_about_service_list" USING btree ("_order");
  CREATE INDEX "content_overrides_content_about_service_list_parent_id_idx" ON "content_overrides_content_about_service_list" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_products_product_links_order_idx" ON "content_overrides_content_products_product_links" USING btree ("_order");
  CREATE INDEX "content_overrides_content_products_product_links_parent_id_idx" ON "content_overrides_content_products_product_links" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_gallery_items_order_idx" ON "content_overrides_content_gallery_items" USING btree ("_order");
  CREATE INDEX "content_overrides_content_gallery_items_parent_id_idx" ON "content_overrides_content_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_gallery_items_image_idx" ON "content_overrides_content_gallery_items" USING btree ("image_id");
  CREATE INDEX "content_overrides_content_faq_page_general_faqs_order_idx" ON "content_overrides_content_faq_page_general_faqs" USING btree ("_order");
  CREATE INDEX "content_overrides_content_faq_page_general_faqs_parent_id_idx" ON "content_overrides_content_faq_page_general_faqs" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_homepage_services_order_idx" ON "content_overrides_content_homepage_services" USING btree ("_order");
  CREATE INDEX "content_overrides_content_homepage_services_parent_id_idx" ON "content_overrides_content_homepage_services" USING btree ("_parent_id");
  CREATE INDEX "content_overrides_content_homepage_marquee_order_idx" ON "content_overrides_content_homepage_marquee" USING btree ("_order");
  CREATE INDEX "content_overrides_content_homepage_marquee_parent_id_idx" ON "content_overrides_content_homepage_marquee" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_service_includes_order_idx" ON "_content_overrides_v_version_content_service_includes" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_service_includes_parent_id_idx" ON "_content_overrides_v_version_content_service_includes" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_service_proof_order_idx" ON "_content_overrides_v_version_content_service_proof" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_service_proof_parent_id_idx" ON "_content_overrides_v_version_content_service_proof" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_service_faq_order_idx" ON "_content_overrides_v_version_content_service_faq" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_service_faq_parent_id_idx" ON "_content_overrides_v_version_content_service_faq" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_location_nearby_order_idx" ON "_content_overrides_v_version_content_location_nearby" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_location_nearby_parent_id_idx" ON "_content_overrides_v_version_content_location_nearby" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_services_hub_stats_order_idx" ON "_content_overrides_v_version_content_services_hub_stats" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_services_hub_stats_parent_id_idx" ON "_content_overrides_v_version_content_services_hub_stats" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_services_hub_steps_order_idx" ON "_content_overrides_v_version_content_services_hub_steps" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_services_hub_steps_parent_id_idx" ON "_content_overrides_v_version_content_services_hub_steps" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_about_story_paragraphs_order_idx" ON "_content_overrides_v_version_content_about_story_paragraphs" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_about_story_paragraphs_parent_id_idx" ON "_content_overrides_v_version_content_about_story_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_about_cards_order_idx" ON "_content_overrides_v_version_content_about_cards" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_about_cards_parent_id_idx" ON "_content_overrides_v_version_content_about_cards" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_about_steps_order_idx" ON "_content_overrides_v_version_content_about_steps" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_about_steps_parent_id_idx" ON "_content_overrides_v_version_content_about_steps" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_about_service_list_order_idx" ON "_content_overrides_v_version_content_about_service_list" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_about_service_list_parent_id_idx" ON "_content_overrides_v_version_content_about_service_list" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_products_product_links_order_idx" ON "_content_overrides_v_version_content_products_product_links" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_products_product_links_parent_id_idx" ON "_content_overrides_v_version_content_products_product_links" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_gallery_items_order_idx" ON "_content_overrides_v_version_content_gallery_items" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_gallery_items_parent_id_idx" ON "_content_overrides_v_version_content_gallery_items" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_gallery_items_image_idx" ON "_content_overrides_v_version_content_gallery_items" USING btree ("image_id");
  CREATE INDEX "_content_overrides_v_version_content_faq_page_general_faqs_order_idx" ON "_content_overrides_v_version_content_faq_page_general_faqs" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_faq_page_general_faqs_parent_id_idx" ON "_content_overrides_v_version_content_faq_page_general_faqs" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_homepage_services_order_idx" ON "_content_overrides_v_version_content_homepage_services" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_homepage_services_parent_id_idx" ON "_content_overrides_v_version_content_homepage_services" USING btree ("_parent_id");
  CREATE INDEX "_content_overrides_v_version_content_homepage_marquee_order_idx" ON "_content_overrides_v_version_content_homepage_marquee" USING btree ("_order");
  CREATE INDEX "_content_overrides_v_version_content_homepage_marquee_parent_id_idx" ON "_content_overrides_v_version_content_homepage_marquee" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "content_overrides_content_service_includes" CASCADE;
  DROP TABLE "content_overrides_content_service_proof" CASCADE;
  DROP TABLE "content_overrides_content_service_faq" CASCADE;
  DROP TABLE "content_overrides_content_location_nearby" CASCADE;
  DROP TABLE "content_overrides_content_services_hub_stats" CASCADE;
  DROP TABLE "content_overrides_content_services_hub_steps" CASCADE;
  DROP TABLE "content_overrides_content_about_story_paragraphs" CASCADE;
  DROP TABLE "content_overrides_content_about_cards" CASCADE;
  DROP TABLE "content_overrides_content_about_steps" CASCADE;
  DROP TABLE "content_overrides_content_about_service_list" CASCADE;
  DROP TABLE "content_overrides_content_products_product_links" CASCADE;
  DROP TABLE "content_overrides_content_gallery_items" CASCADE;
  DROP TABLE "content_overrides_content_faq_page_general_faqs" CASCADE;
  DROP TABLE "content_overrides_content_homepage_services" CASCADE;
  DROP TABLE "content_overrides_content_homepage_marquee" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_service_includes" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_service_proof" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_service_faq" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_location_nearby" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_services_hub_stats" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_services_hub_steps" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_about_story_paragraphs" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_about_cards" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_about_steps" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_about_service_list" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_products_product_links" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_gallery_items" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_faq_page_general_faqs" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_homepage_services" CASCADE;
  DROP TABLE "_content_overrides_v_version_content_homepage_marquee" CASCADE;
  ALTER TABLE "content_overrides" DROP COLUMN "content_location_local_intent";
  ALTER TABLE "content_overrides" DROP COLUMN "content_location_workshop_context";
  ALTER TABLE "content_overrides" DROP COLUMN "content_area_description";
  ALTER TABLE "content_overrides" DROP COLUMN "content_part_category_description";
  ALTER TABLE "content_overrides" DROP COLUMN "content_products_intro_heading";
  ALTER TABLE "content_overrides" DROP COLUMN "content_products_intro_body";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "version_content_location_local_intent";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "version_content_location_workshop_context";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "version_content_area_description";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "version_content_part_category_description";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "version_content_products_intro_heading";
  ALTER TABLE "_content_overrides_v" DROP COLUMN "version_content_products_intro_body";`)
}
