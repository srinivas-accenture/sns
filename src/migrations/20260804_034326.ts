import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "site_settings_seo_robots_disallow_paths" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"path" varchar NOT NULL
  );
  
  ALTER TABLE "pages" ADD COLUMN "meta_no_index" boolean DEFAULT false;
  ALTER TABLE "pages_locales" ADD COLUMN "meta_keywords" varchar;
  ALTER TABLE "_pages_v" ADD COLUMN "version_meta_no_index" boolean DEFAULT false;
  ALTER TABLE "_pages_v_locales" ADD COLUMN "version_meta_keywords" varchar;
  ALTER TABLE "site_settings" ADD COLUMN "seo_sitemap_url" varchar;
  ALTER TABLE "site_settings_seo_robots_disallow_paths" ADD CONSTRAINT "site_settings_seo_robots_disallow_paths_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "site_settings_seo_robots_disallow_paths_order_idx" ON "site_settings_seo_robots_disallow_paths" USING btree ("_order");
  CREATE INDEX "site_settings_seo_robots_disallow_paths_parent_id_idx" ON "site_settings_seo_robots_disallow_paths" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "site_settings_seo_robots_disallow_paths" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "meta_no_index";
  ALTER TABLE "pages_locales" DROP COLUMN "meta_keywords";
  ALTER TABLE "_pages_v" DROP COLUMN "version_meta_no_index";
  ALTER TABLE "_pages_v_locales" DROP COLUMN "version_meta_keywords";
  ALTER TABLE "site_settings" DROP COLUMN "seo_sitemap_url";`)
}
