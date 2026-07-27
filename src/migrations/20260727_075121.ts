import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_gallery_images" ADD COLUMN "instagram_url" varchar;
  ALTER TABLE "_pages_v_blocks_gallery_images" ADD COLUMN "instagram_url" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_gallery_images" DROP COLUMN "instagram_url";
  ALTER TABLE "_pages_v_blocks_gallery_images" DROP COLUMN "instagram_url";`)
}
