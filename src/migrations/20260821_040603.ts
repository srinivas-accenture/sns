import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "_posts_v_locales" ADD COLUMN "version_intro" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_locales" DROP COLUMN "intro";
  ALTER TABLE "_posts_v_locales" DROP COLUMN "version_intro";`)
}
