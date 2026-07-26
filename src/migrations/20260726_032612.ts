import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_slider_slides_heading_tag" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_overlay_position" AS ENUM('bottom-left', 'bottom-center', 'center');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_overlay_strength" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_slider_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_heading_tag" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_position" AS ENUM('bottom-left', 'bottom-center', 'center');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_strength" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_slider_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"mobile_image_id" integer,
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"heading_tag" "enum_pages_blocks_slider_slides_heading_tag" DEFAULT 'h2',
  	"overlay_position" "enum_pages_blocks_slider_slides_overlay_position" DEFAULT 'bottom-left',
  	"overlay_strength" "enum_pages_blocks_slider_slides_overlay_strength" DEFAULT 'medium',
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_slider_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_slider_slides_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 4000,
  	"show_arrows" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"show_scroll_indicator" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"mobile_image_id" integer,
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"heading_tag" "enum__pages_v_blocks_slider_slides_heading_tag" DEFAULT 'h2',
  	"overlay_position" "enum__pages_v_blocks_slider_slides_overlay_position" DEFAULT 'bottom-left',
  	"overlay_strength" "enum__pages_v_blocks_slider_slides_overlay_strength" DEFAULT 'medium',
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_slider_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_slider_slides_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 4000,
  	"show_arrows" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"show_scroll_indicator" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_slider_slides" ADD CONSTRAINT "pages_blocks_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_slider_slides" ADD CONSTRAINT "pages_blocks_slider_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_slider_slides" ADD CONSTRAINT "pages_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_slider" ADD CONSTRAINT "pages_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD CONSTRAINT "_pages_v_blocks_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD CONSTRAINT "_pages_v_blocks_slider_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider_slides" ADD CONSTRAINT "_pages_v_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_slider" ADD CONSTRAINT "_pages_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_slider_slides_order_idx" ON "pages_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX "pages_blocks_slider_slides_parent_id_idx" ON "pages_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_slider_slides_image_idx" ON "pages_blocks_slider_slides" USING btree ("image_id");
  CREATE INDEX "pages_blocks_slider_slides_mobile_image_idx" ON "pages_blocks_slider_slides" USING btree ("mobile_image_id");
  CREATE INDEX "pages_blocks_slider_order_idx" ON "pages_blocks_slider" USING btree ("_order");
  CREATE INDEX "pages_blocks_slider_parent_id_idx" ON "pages_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_slider_path_idx" ON "pages_blocks_slider" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_slider_slides_order_idx" ON "_pages_v_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_slider_slides_parent_id_idx" ON "_pages_v_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_slider_slides_image_idx" ON "_pages_v_blocks_slider_slides" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_slider_slides_mobile_image_idx" ON "_pages_v_blocks_slider_slides" USING btree ("mobile_image_id");
  CREATE INDEX "_pages_v_blocks_slider_order_idx" ON "_pages_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_slider_parent_id_idx" ON "_pages_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_slider_path_idx" ON "_pages_v_blocks_slider" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_slider_slides" CASCADE;
  DROP TABLE "pages_blocks_slider" CASCADE;
  DROP TABLE "_pages_v_blocks_slider_slides" CASCADE;
  DROP TABLE "_pages_v_blocks_slider" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_slider_slides_heading_tag";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_overlay_position";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_overlay_strength";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_link_type";
  DROP TYPE "public"."enum_pages_blocks_slider_slides_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_heading_tag";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_position";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_overlay_strength";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_slider_slides_link_appearance";`)
}
