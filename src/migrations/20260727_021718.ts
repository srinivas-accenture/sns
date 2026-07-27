import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_content_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_media_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_media_block_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_cta_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_content_columns_locales" CASCADE;
  DROP TABLE "pages_blocks_media_block_locales" CASCADE;
  DROP TABLE "pages_blocks_cta_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_content_columns_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_media_block_locales" CASCADE;
  DROP TABLE "_pages_v_blocks_cta_locales" CASCADE;
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "pages_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "pages_blocks_slider_slides" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_slider" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_content_with_image" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_team_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_team_members" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_team" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_form_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_events_events" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_events" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_gallery" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_blocks_faq" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "pages_rels" ADD COLUMN "locale" "_locales";
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_content" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "caption" varchar;
  ALTER TABLE "_pages_v_blocks_cta_links" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_cta" ADD COLUMN "rich_text" jsonb;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_slider" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_content_with_image" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_team_members_social_links" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_team_members" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_form_block" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_events_events" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_events" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_gallery" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_faq_items" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_blocks_faq" ADD COLUMN "_locale" "_locales" NOT NULL DEFAULT 'en';
  ALTER TABLE "_pages_v_rels" ADD COLUMN "locale" "_locales";
  CREATE INDEX "pages_blocks_content_columns_locale_idx" ON "pages_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_locale_idx" ON "pages_blocks_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_media_block_locale_idx" ON "pages_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_links_locale_idx" ON "pages_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_cta_locale_idx" ON "pages_blocks_cta" USING btree ("_locale");
  CREATE INDEX "pages_blocks_slider_slides_locale_idx" ON "pages_blocks_slider_slides" USING btree ("_locale");
  CREATE INDEX "pages_blocks_slider_locale_idx" ON "pages_blocks_slider" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_with_image_locale_idx" ON "pages_blocks_content_with_image" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_members_social_links_locale_idx" ON "pages_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_members_locale_idx" ON "pages_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "pages_blocks_team_locale_idx" ON "pages_blocks_team" USING btree ("_locale");
  CREATE INDEX "pages_blocks_form_block_locale_idx" ON "pages_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "pages_blocks_events_events_locale_idx" ON "pages_blocks_events_events" USING btree ("_locale");
  CREATE INDEX "pages_blocks_events_locale_idx" ON "pages_blocks_events" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_images_locale_idx" ON "pages_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "pages_blocks_gallery_locale_idx" ON "pages_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_items_locale_idx" ON "pages_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "pages_blocks_faq_locale_idx" ON "pages_blocks_faq" USING btree ("_locale");
  CREATE INDEX "pages_rels_locale_idx" ON "pages_rels" USING btree ("locale");
  CREATE INDEX "_pages_v_blocks_content_columns_locale_idx" ON "_pages_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_locale_idx" ON "_pages_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_media_block_locale_idx" ON "_pages_v_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_links_locale_idx" ON "_pages_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_cta_locale_idx" ON "_pages_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_slider_slides_locale_idx" ON "_pages_v_blocks_slider_slides" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_slider_locale_idx" ON "_pages_v_blocks_slider" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_content_with_image_locale_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_members_social_links_locale_idx" ON "_pages_v_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_members_locale_idx" ON "_pages_v_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_team_locale_idx" ON "_pages_v_blocks_team" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_form_block_locale_idx" ON "_pages_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_events_events_locale_idx" ON "_pages_v_blocks_events_events" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_events_locale_idx" ON "_pages_v_blocks_events" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_images_locale_idx" ON "_pages_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_gallery_locale_idx" ON "_pages_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_items_locale_idx" ON "_pages_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_pages_v_blocks_faq_locale_idx" ON "_pages_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_pages_v_rels_locale_idx" ON "_pages_v_rels" USING btree ("locale");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id","locale");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "pages_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_content_columns_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_media_block_locales" (
  	"caption" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_pages_v_blocks_cta_locales" (
  	"rich_text" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  DROP INDEX "pages_blocks_content_columns_locale_idx";
  DROP INDEX "pages_blocks_content_locale_idx";
  DROP INDEX "pages_blocks_media_block_locale_idx";
  DROP INDEX "pages_blocks_cta_links_locale_idx";
  DROP INDEX "pages_blocks_cta_locale_idx";
  DROP INDEX "pages_blocks_slider_slides_locale_idx";
  DROP INDEX "pages_blocks_slider_locale_idx";
  DROP INDEX "pages_blocks_content_with_image_locale_idx";
  DROP INDEX "pages_blocks_team_members_social_links_locale_idx";
  DROP INDEX "pages_blocks_team_members_locale_idx";
  DROP INDEX "pages_blocks_team_locale_idx";
  DROP INDEX "pages_blocks_form_block_locale_idx";
  DROP INDEX "pages_blocks_events_events_locale_idx";
  DROP INDEX "pages_blocks_events_locale_idx";
  DROP INDEX "pages_blocks_gallery_images_locale_idx";
  DROP INDEX "pages_blocks_gallery_locale_idx";
  DROP INDEX "pages_blocks_faq_items_locale_idx";
  DROP INDEX "pages_blocks_faq_locale_idx";
  DROP INDEX "pages_rels_locale_idx";
  DROP INDEX "_pages_v_blocks_content_columns_locale_idx";
  DROP INDEX "_pages_v_blocks_content_locale_idx";
  DROP INDEX "_pages_v_blocks_media_block_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_links_locale_idx";
  DROP INDEX "_pages_v_blocks_cta_locale_idx";
  DROP INDEX "_pages_v_blocks_slider_slides_locale_idx";
  DROP INDEX "_pages_v_blocks_slider_locale_idx";
  DROP INDEX "_pages_v_blocks_content_with_image_locale_idx";
  DROP INDEX "_pages_v_blocks_team_members_social_links_locale_idx";
  DROP INDEX "_pages_v_blocks_team_members_locale_idx";
  DROP INDEX "_pages_v_blocks_team_locale_idx";
  DROP INDEX "_pages_v_blocks_form_block_locale_idx";
  DROP INDEX "_pages_v_blocks_events_events_locale_idx";
  DROP INDEX "_pages_v_blocks_events_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_images_locale_idx";
  DROP INDEX "_pages_v_blocks_gallery_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_items_locale_idx";
  DROP INDEX "_pages_v_blocks_faq_locale_idx";
  DROP INDEX "_pages_v_rels_locale_idx";
  DROP INDEX "pages_rels_pages_id_idx";
  DROP INDEX "_pages_v_rels_pages_id_idx";
  ALTER TABLE "pages_blocks_content_columns_locales" ADD CONSTRAINT "pages_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_media_block_locales" ADD CONSTRAINT "pages_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cta_locales" ADD CONSTRAINT "pages_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns_locales" ADD CONSTRAINT "_pages_v_blocks_content_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_content_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_media_block_locales" ADD CONSTRAINT "_pages_v_blocks_media_block_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_media_block"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cta_locales" ADD CONSTRAINT "_pages_v_blocks_cta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "pages_blocks_content_columns_locales_locale_parent_id_unique" ON "pages_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_media_block_locales_locale_parent_id_unique" ON "pages_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "pages_blocks_cta_locales_locale_parent_id_unique" ON "pages_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_content_columns_locales_locale_parent_id_uni" ON "_pages_v_blocks_content_columns_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_media_block_locales_locale_parent_id_unique" ON "_pages_v_blocks_media_block_locales" USING btree ("_locale","_parent_id");
  CREATE UNIQUE INDEX "_pages_v_blocks_cta_locales_locale_parent_id_unique" ON "_pages_v_blocks_cta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_rels_pages_id_idx" ON "pages_rels" USING btree ("pages_id");
  CREATE INDEX "_pages_v_rels_pages_id_idx" ON "_pages_v_rels" USING btree ("pages_id");
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "caption";
  ALTER TABLE "pages_blocks_cta_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_cta" DROP COLUMN "rich_text";
  ALTER TABLE "pages_blocks_slider_slides" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_slider" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content_with_image" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team_members" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_form_block" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_events_events" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_events" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "pages_rels" DROP COLUMN "locale";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "caption";
  ALTER TABLE "_pages_v_blocks_cta_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_cta" DROP COLUMN "rich_text";
  ALTER TABLE "_pages_v_blocks_slider_slides" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_slider" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_content_with_image" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_members_social_links" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team_members" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_form_block" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_events_events" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_events" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery_images" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_gallery" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq_items" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_blocks_faq" DROP COLUMN "_locale";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "locale";`)
}
