import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" ADD COLUMN "other_members_title" varchar;
  ALTER TABLE "pages_blocks_team" ADD COLUMN "bottom_content" jsonb;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "other_members_title" varchar;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "bottom_content" jsonb;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" DROP COLUMN "other_members_title";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "bottom_content";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "other_members_title";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "bottom_content";`)
}
