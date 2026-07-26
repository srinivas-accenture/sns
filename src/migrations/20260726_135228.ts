import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_team_variant" AS ENUM('default', 'primary');
  CREATE TYPE "public"."enum__pages_v_blocks_team_variant" AS ENUM('default', 'primary');
  ALTER TABLE "pages_blocks_team" ADD COLUMN "variant" "enum_pages_blocks_team_variant" DEFAULT 'default';
  ALTER TABLE "_pages_v_blocks_team" ADD COLUMN "variant" "enum__pages_v_blocks_team_variant" DEFAULT 'default';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_team" DROP COLUMN "variant";
  ALTER TABLE "_pages_v_blocks_team" DROP COLUMN "variant";
  DROP TYPE "public"."enum_pages_blocks_team_variant";
  DROP TYPE "public"."enum__pages_v_blocks_team_variant";`)
}
