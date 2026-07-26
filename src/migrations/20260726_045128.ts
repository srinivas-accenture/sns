import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_site_settings_devanagari_font" AS ENUM('noto-sans-devanagari', 'mukta', 'hind', 'tiro-devanagari');
  ALTER TABLE "site_settings" ADD COLUMN "devanagari_font" "enum_site_settings_devanagari_font" DEFAULT 'noto-sans-devanagari';`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "devanagari_font";
  DROP TYPE "public"."enum_site_settings_devanagari_font";`)
}
