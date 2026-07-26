import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_with_image_image_position" AS ENUM('left', 'right', 'top', 'bottom');
  CREATE TYPE "public"."enum_pages_blocks_content_with_image_image_shape" AS ENUM('square', 'circle');
  CREATE TYPE "public"."enum_pages_blocks_content_with_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_content_with_image_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_image_position" AS ENUM('left', 'right', 'top', 'bottom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_image_shape" AS ENUM('square', 'circle');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_content_with_image_link_appearance" AS ENUM('default', 'outline');
  CREATE TABLE "pages_blocks_content_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_position" "enum_pages_blocks_content_with_image_image_position" DEFAULT 'right',
  	"image_shape" "enum_pages_blocks_content_with_image_image_shape" DEFAULT 'square',
  	"background_color" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_pages_blocks_content_with_image_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_pages_blocks_content_with_image_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_content_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_position" "enum__pages_v_blocks_content_with_image_image_position" DEFAULT 'right',
  	"image_shape" "enum__pages_v_blocks_content_with_image_image_shape" DEFAULT 'square',
  	"background_color" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__pages_v_blocks_content_with_image_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__pages_v_blocks_content_with_image_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_content_with_image" ADD CONSTRAINT "pages_blocks_content_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_content_with_image" ADD CONSTRAINT "pages_blocks_content_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_with_image" ADD CONSTRAINT "_pages_v_blocks_content_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_with_image" ADD CONSTRAINT "_pages_v_blocks_content_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_with_image_order_idx" ON "pages_blocks_content_with_image" USING btree ("_order");
  CREATE INDEX "pages_blocks_content_with_image_parent_id_idx" ON "pages_blocks_content_with_image" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_content_with_image_path_idx" ON "pages_blocks_content_with_image" USING btree ("_path");
  CREATE INDEX "pages_blocks_content_with_image_image_idx" ON "pages_blocks_content_with_image" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_content_with_image_order_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_content_with_image_parent_id_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_content_with_image_path_idx" ON "_pages_v_blocks_content_with_image" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_content_with_image_image_idx" ON "_pages_v_blocks_content_with_image" USING btree ("image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_content_with_image" CASCADE;
  DROP TABLE "_pages_v_blocks_content_with_image" CASCADE;
  DROP TYPE "public"."enum_pages_blocks_content_with_image_image_position";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_image_shape";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_link_type";
  DROP TYPE "public"."enum_pages_blocks_content_with_image_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_image_position";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_image_shape";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_with_image_link_appearance";`)
}
