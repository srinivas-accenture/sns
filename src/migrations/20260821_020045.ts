import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_pages_blocks_gallery_layout" ADD VALUE 'page';
  ALTER TYPE "public"."enum__pages_v_blocks_gallery_layout" ADD VALUE 'page';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "layout" SET DEFAULT 'carousel'::text;
  DROP TYPE "public"."enum_pages_blocks_gallery_layout";
  CREATE TYPE "public"."enum_pages_blocks_gallery_layout" AS ENUM('carousel', 'masonry', 'grid');
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "layout" SET DEFAULT 'carousel'::"public"."enum_pages_blocks_gallery_layout";
  ALTER TABLE "pages_blocks_gallery" ALTER COLUMN "layout" SET DATA TYPE "public"."enum_pages_blocks_gallery_layout" USING "layout"::"public"."enum_pages_blocks_gallery_layout";
  ALTER TABLE "_pages_v_blocks_gallery" ALTER COLUMN "layout" SET DATA TYPE text;
  ALTER TABLE "_pages_v_blocks_gallery" ALTER COLUMN "layout" SET DEFAULT 'carousel'::text;
  DROP TYPE "public"."enum__pages_v_blocks_gallery_layout";
  CREATE TYPE "public"."enum__pages_v_blocks_gallery_layout" AS ENUM('carousel', 'masonry', 'grid');
  ALTER TABLE "_pages_v_blocks_gallery" ALTER COLUMN "layout" SET DEFAULT 'carousel'::"public"."enum__pages_v_blocks_gallery_layout";
  ALTER TABLE "_pages_v_blocks_gallery" ALTER COLUMN "layout" SET DATA TYPE "public"."enum__pages_v_blocks_gallery_layout" USING "layout"::"public"."enum__pages_v_blocks_gallery_layout";`)
}
