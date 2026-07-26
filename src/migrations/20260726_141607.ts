import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" DROP COLUMN "cta_title";
  ALTER TABLE "pages_blocks_team" DROP COLUMN "cta_background_color";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "cta_title";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "cta_background_color";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "pages_blocks_team" ADD COLUMN "cta_background_color" varchar DEFAULT '#3C1500';
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "cta_title" varchar;
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "cta_background_color" varchar DEFAULT '#3C1500';`)
}
