import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_posts_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_content_columns_link_appearance" AS ENUM('default', 'outline', 'link', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_media_block_position" AS ENUM('default', 'fullscreen');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_cta_links_link_appearance" AS ENUM('default', 'outline', 'link', 'ghost');
  CREATE TYPE "public"."enum_posts_blocks_slider_slides_heading_tag" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum_posts_blocks_slider_slides_overlay_position" AS ENUM('bottom-left', 'bottom-center', 'center');
  CREATE TYPE "public"."enum_posts_blocks_slider_slides_overlay_strength" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum_posts_blocks_slider_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_slider_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_content_with_image_image_position" AS ENUM('left', 'right', 'top', 'bottom');
  CREATE TYPE "public"."enum_posts_blocks_content_with_image_image_shape" AS ENUM('square', 'circle');
  CREATE TYPE "public"."enum_posts_blocks_content_with_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_content_with_image_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_team_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'website');
  CREATE TYPE "public"."enum_posts_blocks_team_variant" AS ENUM('default', 'primary');
  CREATE TYPE "public"."enum_posts_blocks_team_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_team_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_form_block_image_position" AS ENUM('left', 'right', 'background');
  CREATE TYPE "public"."enum_posts_blocks_events_events_category_color" AS ENUM('blue', 'green', 'purple', 'orange', 'red', 'gray');
  CREATE TYPE "public"."enum_posts_blocks_gallery_layout" AS ENUM('carousel', 'masonry', 'grid', 'page');
  CREATE TYPE "public"."enum_posts_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_posts_blocks_gallery_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_posts_blocks_gallery_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_posts_blocks_faq_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_size" AS ENUM('oneThird', 'half', 'twoThirds', 'full');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_content_columns_link_appearance" AS ENUM('default', 'outline', 'link', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_media_block_position" AS ENUM('default', 'fullscreen');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_cta_links_link_appearance" AS ENUM('default', 'outline', 'link', 'ghost');
  CREATE TYPE "public"."enum__posts_v_blocks_slider_slides_heading_tag" AS ENUM('h1', 'h2', 'h3');
  CREATE TYPE "public"."enum__posts_v_blocks_slider_slides_overlay_position" AS ENUM('bottom-left', 'bottom-center', 'center');
  CREATE TYPE "public"."enum__posts_v_blocks_slider_slides_overlay_strength" AS ENUM('light', 'medium', 'strong');
  CREATE TYPE "public"."enum__posts_v_blocks_slider_slides_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_slider_slides_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_content_with_image_image_position" AS ENUM('left', 'right', 'top', 'bottom');
  CREATE TYPE "public"."enum__posts_v_blocks_content_with_image_image_shape" AS ENUM('square', 'circle');
  CREATE TYPE "public"."enum__posts_v_blocks_content_with_image_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_content_with_image_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_team_members_social_links_platform" AS ENUM('linkedin', 'twitter', 'github', 'website');
  CREATE TYPE "public"."enum__posts_v_blocks_team_variant" AS ENUM('default', 'primary');
  CREATE TYPE "public"."enum__posts_v_blocks_team_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_team_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_form_block_image_position" AS ENUM('left', 'right', 'background');
  CREATE TYPE "public"."enum__posts_v_blocks_events_events_category_color" AS ENUM('blue', 'green', 'purple', 'orange', 'red', 'gray');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_layout" AS ENUM('carousel', 'masonry', 'grid', 'page');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_cta_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__posts_v_blocks_gallery_cta_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__posts_v_blocks_faq_image_position" AS ENUM('left', 'right');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_published_locale" AS ENUM('en', 'mr');
  CREATE TABLE "posts_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" "enum_posts_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum_posts_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_blocks_content_columns_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"position" "enum_posts_blocks_media_block_position" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_posts_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_blocks_cta_links_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"mobile_image_id" integer,
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"heading_tag" "enum_posts_blocks_slider_slides_heading_tag" DEFAULT 'h2',
  	"overlay_position" "enum_posts_blocks_slider_slides_overlay_position" DEFAULT 'bottom-left',
  	"overlay_strength" "enum_posts_blocks_slider_slides_overlay_strength" DEFAULT 'medium',
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_posts_blocks_slider_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_blocks_slider_slides_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "posts_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"autoplay" boolean DEFAULT false,
  	"autoplay_speed" numeric DEFAULT 4000,
  	"show_arrows" boolean DEFAULT true,
  	"show_dots" boolean DEFAULT true,
  	"show_scroll_indicator" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_content_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_position" "enum_posts_blocks_content_with_image_image_position" DEFAULT 'right',
  	"image_shape" "enum_posts_blocks_content_with_image_image_shape" DEFAULT 'square',
  	"background_color" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum_posts_blocks_content_with_image_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum_posts_blocks_content_with_image_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_posts_blocks_team_members_social_links_platform",
  	"url" varchar
  );
  
  CREATE TABLE "posts_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer
  );
  
  CREATE TABLE "posts_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_posts_blocks_team_variant" DEFAULT 'default',
  	"title" varchar,
  	"subtitle" varchar,
  	"top_content" jsonb,
  	"other_members_title" varchar,
  	"bottom_content" jsonb,
  	"enable_cta" boolean DEFAULT false,
  	"cta_link_type" "enum_posts_blocks_team_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_posts_blocks_team_cta_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"background_color" varchar,
  	"image_id" integer,
  	"image_position" "enum_posts_blocks_form_block_image_position" DEFAULT 'left',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_events_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"date" timestamp(3) with time zone,
  	"time" varchar,
  	"location" varchar,
  	"map_url" varchar,
  	"category" varchar,
  	"category_color" "enum_posts_blocks_events_events_category_color" DEFAULT 'blue'
  );
  
  CREATE TABLE "posts_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_color" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"instagram_url" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar
  );
  
  CREATE TABLE "posts_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum_posts_blocks_gallery_layout" DEFAULT 'carousel',
  	"columns" "enum_posts_blocks_gallery_columns" DEFAULT '4',
  	"cta_title" varchar,
  	"background_color" varchar DEFAULT '#3C1500',
  	"cta_link_type" "enum_posts_blocks_gallery_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum_posts_blocks_gallery_cta_link_appearance" DEFAULT 'default',
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb
  );
  
  CREATE TABLE "posts_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" varchar,
  	"image_position" "enum_posts_blocks_faq_image_position" DEFAULT 'left',
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"published_at" timestamp(3) with time zone,
  	"featured_image_id" integer,
  	"meta_no_index" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_locales" (
  	"title" varchar,
  	"author" varchar,
  	"excerpt" jsonb,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"categories_id" integer,
  	"pages_id" integer
  );
  
  CREATE TABLE "_posts_v_blocks_content_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" "enum__posts_v_blocks_content_columns_size" DEFAULT 'full',
  	"rich_text" jsonb,
  	"enable_link" boolean,
  	"link_type" "enum__posts_v_blocks_content_columns_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__posts_v_blocks_content_columns_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_media_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"media_id" integer,
  	"caption" varchar,
  	"position" "enum__posts_v_blocks_media_block_position" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"link_type" "enum__posts_v_blocks_cta_links_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__posts_v_blocks_cta_links_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_cta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"rich_text" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_slider_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"mobile_image_id" integer,
  	"image_alt" varchar,
  	"eyebrow" varchar,
  	"title" varchar,
  	"heading_tag" "enum__posts_v_blocks_slider_slides_heading_tag" DEFAULT 'h2',
  	"overlay_position" "enum__posts_v_blocks_slider_slides_overlay_position" DEFAULT 'bottom-left',
  	"overlay_strength" "enum__posts_v_blocks_slider_slides_overlay_strength" DEFAULT 'medium',
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__posts_v_blocks_slider_slides_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__posts_v_blocks_slider_slides_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_slider" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
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
  
  CREATE TABLE "_posts_v_blocks_content_with_image" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_position" "enum__posts_v_blocks_content_with_image_image_position" DEFAULT 'right',
  	"image_shape" "enum__posts_v_blocks_content_with_image_image_shape" DEFAULT 'square',
  	"background_color" varchar,
  	"image_id" integer,
  	"subtitle" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"enable_link" boolean DEFAULT false,
  	"link_type" "enum__posts_v_blocks_content_with_image_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar,
  	"link_appearance" "enum__posts_v_blocks_content_with_image_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_team_members_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"platform" "enum__posts_v_blocks_team_members_social_links_platform",
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_team_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"role" varchar,
  	"bio" varchar,
  	"photo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_team" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__posts_v_blocks_team_variant" DEFAULT 'default',
  	"title" varchar,
  	"subtitle" varchar,
  	"top_content" jsonb,
  	"other_members_title" varchar,
  	"bottom_content" jsonb,
  	"enable_cta" boolean DEFAULT false,
  	"cta_link_type" "enum__posts_v_blocks_team_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__posts_v_blocks_team_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_form_block" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"form_id" integer,
  	"background_color" varchar,
  	"image_id" integer,
  	"image_position" "enum__posts_v_blocks_form_block_image_position" DEFAULT 'left',
  	"enable_intro" boolean,
  	"intro_content" jsonb,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_events_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"date" timestamp(3) with time zone,
  	"time" varchar,
  	"location" varchar,
  	"map_url" varchar,
  	"category" varchar,
  	"category_color" "enum__posts_v_blocks_events_events_category_color" DEFAULT 'blue',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"background_color" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"instagram_url" varchar,
  	"image_id" integer,
  	"caption" varchar,
  	"alt" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"layout" "enum__posts_v_blocks_gallery_layout" DEFAULT 'carousel',
  	"columns" "enum__posts_v_blocks_gallery_columns" DEFAULT '4',
  	"cta_title" varchar,
  	"background_color" varchar DEFAULT '#3C1500',
  	"cta_link_type" "enum__posts_v_blocks_gallery_cta_link_type" DEFAULT 'reference',
  	"cta_link_new_tab" boolean,
  	"cta_link_url" varchar,
  	"cta_link_label" varchar,
  	"cta_link_appearance" "enum__posts_v_blocks_gallery_cta_link_appearance" DEFAULT 'default',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar,
  	"answer" jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_posts_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" varchar,
  	"image_position" "enum__posts_v_blocks_faq_image_position" DEFAULT 'left',
  	"title" varchar,
  	"subtitle" varchar,
  	"image_id" integer,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_featured_image_id" integer,
  	"version_meta_no_index" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__posts_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_posts_v_locales" (
  	"version_title" varchar,
  	"version_author" varchar,
  	"version_excerpt" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_description" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_keywords" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"locale" "_locales",
  	"categories_id" integer,
  	"pages_id" integer
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "posts_blocks_content_columns" ADD CONSTRAINT "posts_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content" ADD CONSTRAINT "posts_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_media_block" ADD CONSTRAINT "posts_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta_links" ADD CONSTRAINT "posts_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_cta" ADD CONSTRAINT "posts_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_slider_slides" ADD CONSTRAINT "posts_blocks_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_slider_slides" ADD CONSTRAINT "posts_blocks_slider_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_slider_slides" ADD CONSTRAINT "posts_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_slider" ADD CONSTRAINT "posts_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_with_image" ADD CONSTRAINT "posts_blocks_content_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_content_with_image" ADD CONSTRAINT "posts_blocks_content_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_team_members_social_links" ADD CONSTRAINT "posts_blocks_team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_team_members" ADD CONSTRAINT "posts_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_team_members" ADD CONSTRAINT "posts_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_team" ADD CONSTRAINT "posts_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_form_block" ADD CONSTRAINT "posts_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_form_block" ADD CONSTRAINT "posts_blocks_form_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_form_block" ADD CONSTRAINT "posts_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_events_events" ADD CONSTRAINT "posts_blocks_events_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_events" ADD CONSTRAINT "posts_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery_images" ADD CONSTRAINT "posts_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_gallery" ADD CONSTRAINT "posts_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq_items" ADD CONSTRAINT "posts_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_blocks_faq" ADD CONSTRAINT "posts_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_featured_image_id_media_id_fk" FOREIGN KEY ("featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_locales" ADD CONSTRAINT "posts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_columns" ADD CONSTRAINT "_posts_v_blocks_content_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content" ADD CONSTRAINT "_posts_v_blocks_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_media_block" ADD CONSTRAINT "_posts_v_blocks_media_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta_links" ADD CONSTRAINT "_posts_v_blocks_cta_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_cta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_cta" ADD CONSTRAINT "_posts_v_blocks_cta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_slider_slides" ADD CONSTRAINT "_posts_v_blocks_slider_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_slider_slides" ADD CONSTRAINT "_posts_v_blocks_slider_slides_mobile_image_id_media_id_fk" FOREIGN KEY ("mobile_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_slider_slides" ADD CONSTRAINT "_posts_v_blocks_slider_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_slider"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_slider" ADD CONSTRAINT "_posts_v_blocks_slider_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_with_image" ADD CONSTRAINT "_posts_v_blocks_content_with_image_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_content_with_image" ADD CONSTRAINT "_posts_v_blocks_content_with_image_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team_members_social_links" ADD CONSTRAINT "_posts_v_blocks_team_members_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_team_members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team_members" ADD CONSTRAINT "_posts_v_blocks_team_members_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team_members" ADD CONSTRAINT "_posts_v_blocks_team_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_team"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_team" ADD CONSTRAINT "_posts_v_blocks_team_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form_block" ADD CONSTRAINT "_posts_v_blocks_form_block_form_id_forms_id_fk" FOREIGN KEY ("form_id") REFERENCES "public"."forms"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form_block" ADD CONSTRAINT "_posts_v_blocks_form_block_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_form_block" ADD CONSTRAINT "_posts_v_blocks_form_block_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_events_events" ADD CONSTRAINT "_posts_v_blocks_events_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_events" ADD CONSTRAINT "_posts_v_blocks_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery_images" ADD CONSTRAINT "_posts_v_blocks_gallery_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_gallery"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_gallery" ADD CONSTRAINT "_posts_v_blocks_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq_items" ADD CONSTRAINT "_posts_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_blocks_faq" ADD CONSTRAINT "_posts_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_featured_image_id_media_id_fk" FOREIGN KEY ("version_featured_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_locales" ADD CONSTRAINT "_posts_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "posts_blocks_content_columns_order_idx" ON "posts_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_columns_parent_id_idx" ON "posts_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_columns_locale_idx" ON "posts_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "posts_blocks_content_order_idx" ON "posts_blocks_content" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_parent_id_idx" ON "posts_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_path_idx" ON "posts_blocks_content" USING btree ("_path");
  CREATE INDEX "posts_blocks_content_locale_idx" ON "posts_blocks_content" USING btree ("_locale");
  CREATE INDEX "posts_blocks_media_block_order_idx" ON "posts_blocks_media_block" USING btree ("_order");
  CREATE INDEX "posts_blocks_media_block_parent_id_idx" ON "posts_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_media_block_path_idx" ON "posts_blocks_media_block" USING btree ("_path");
  CREATE INDEX "posts_blocks_media_block_locale_idx" ON "posts_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "posts_blocks_media_block_media_idx" ON "posts_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "posts_blocks_cta_links_order_idx" ON "posts_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_links_parent_id_idx" ON "posts_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_links_locale_idx" ON "posts_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "posts_blocks_cta_order_idx" ON "posts_blocks_cta" USING btree ("_order");
  CREATE INDEX "posts_blocks_cta_parent_id_idx" ON "posts_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_cta_path_idx" ON "posts_blocks_cta" USING btree ("_path");
  CREATE INDEX "posts_blocks_cta_locale_idx" ON "posts_blocks_cta" USING btree ("_locale");
  CREATE INDEX "posts_blocks_slider_slides_order_idx" ON "posts_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX "posts_blocks_slider_slides_parent_id_idx" ON "posts_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_slider_slides_locale_idx" ON "posts_blocks_slider_slides" USING btree ("_locale");
  CREATE INDEX "posts_blocks_slider_slides_image_idx" ON "posts_blocks_slider_slides" USING btree ("image_id");
  CREATE INDEX "posts_blocks_slider_slides_mobile_image_idx" ON "posts_blocks_slider_slides" USING btree ("mobile_image_id");
  CREATE INDEX "posts_blocks_slider_order_idx" ON "posts_blocks_slider" USING btree ("_order");
  CREATE INDEX "posts_blocks_slider_parent_id_idx" ON "posts_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_slider_path_idx" ON "posts_blocks_slider" USING btree ("_path");
  CREATE INDEX "posts_blocks_slider_locale_idx" ON "posts_blocks_slider" USING btree ("_locale");
  CREATE INDEX "posts_blocks_content_with_image_order_idx" ON "posts_blocks_content_with_image" USING btree ("_order");
  CREATE INDEX "posts_blocks_content_with_image_parent_id_idx" ON "posts_blocks_content_with_image" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_content_with_image_path_idx" ON "posts_blocks_content_with_image" USING btree ("_path");
  CREATE INDEX "posts_blocks_content_with_image_locale_idx" ON "posts_blocks_content_with_image" USING btree ("_locale");
  CREATE INDEX "posts_blocks_content_with_image_image_idx" ON "posts_blocks_content_with_image" USING btree ("image_id");
  CREATE INDEX "posts_blocks_team_members_social_links_order_idx" ON "posts_blocks_team_members_social_links" USING btree ("_order");
  CREATE INDEX "posts_blocks_team_members_social_links_parent_id_idx" ON "posts_blocks_team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_team_members_social_links_locale_idx" ON "posts_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "posts_blocks_team_members_order_idx" ON "posts_blocks_team_members" USING btree ("_order");
  CREATE INDEX "posts_blocks_team_members_parent_id_idx" ON "posts_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_team_members_locale_idx" ON "posts_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "posts_blocks_team_members_photo_idx" ON "posts_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "posts_blocks_team_order_idx" ON "posts_blocks_team" USING btree ("_order");
  CREATE INDEX "posts_blocks_team_parent_id_idx" ON "posts_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_team_path_idx" ON "posts_blocks_team" USING btree ("_path");
  CREATE INDEX "posts_blocks_team_locale_idx" ON "posts_blocks_team" USING btree ("_locale");
  CREATE INDEX "posts_blocks_form_block_order_idx" ON "posts_blocks_form_block" USING btree ("_order");
  CREATE INDEX "posts_blocks_form_block_parent_id_idx" ON "posts_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_form_block_path_idx" ON "posts_blocks_form_block" USING btree ("_path");
  CREATE INDEX "posts_blocks_form_block_locale_idx" ON "posts_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "posts_blocks_form_block_form_idx" ON "posts_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "posts_blocks_form_block_image_idx" ON "posts_blocks_form_block" USING btree ("image_id");
  CREATE INDEX "posts_blocks_events_events_order_idx" ON "posts_blocks_events_events" USING btree ("_order");
  CREATE INDEX "posts_blocks_events_events_parent_id_idx" ON "posts_blocks_events_events" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_events_events_locale_idx" ON "posts_blocks_events_events" USING btree ("_locale");
  CREATE INDEX "posts_blocks_events_order_idx" ON "posts_blocks_events" USING btree ("_order");
  CREATE INDEX "posts_blocks_events_parent_id_idx" ON "posts_blocks_events" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_events_path_idx" ON "posts_blocks_events" USING btree ("_path");
  CREATE INDEX "posts_blocks_events_locale_idx" ON "posts_blocks_events" USING btree ("_locale");
  CREATE INDEX "posts_blocks_gallery_images_order_idx" ON "posts_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_images_parent_id_idx" ON "posts_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_images_locale_idx" ON "posts_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "posts_blocks_gallery_images_image_idx" ON "posts_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "posts_blocks_gallery_order_idx" ON "posts_blocks_gallery" USING btree ("_order");
  CREATE INDEX "posts_blocks_gallery_parent_id_idx" ON "posts_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_gallery_path_idx" ON "posts_blocks_gallery" USING btree ("_path");
  CREATE INDEX "posts_blocks_gallery_locale_idx" ON "posts_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "posts_blocks_faq_items_order_idx" ON "posts_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_items_parent_id_idx" ON "posts_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_items_locale_idx" ON "posts_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "posts_blocks_faq_order_idx" ON "posts_blocks_faq" USING btree ("_order");
  CREATE INDEX "posts_blocks_faq_parent_id_idx" ON "posts_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "posts_blocks_faq_path_idx" ON "posts_blocks_faq" USING btree ("_path");
  CREATE INDEX "posts_blocks_faq_locale_idx" ON "posts_blocks_faq" USING btree ("_locale");
  CREATE INDEX "posts_blocks_faq_image_idx" ON "posts_blocks_faq" USING btree ("image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_featured_image_idx" ON "posts" USING btree ("featured_image_id");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts_locales" USING btree ("meta_image_id","_locale");
  CREATE UNIQUE INDEX "posts_locales_locale_parent_id_unique" ON "posts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_locale_idx" ON "posts_rels" USING btree ("locale");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id","locale");
  CREATE INDEX "posts_rels_pages_id_idx" ON "posts_rels" USING btree ("pages_id","locale");
  CREATE INDEX "_posts_v_blocks_content_columns_order_idx" ON "_posts_v_blocks_content_columns" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_columns_parent_id_idx" ON "_posts_v_blocks_content_columns" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_columns_locale_idx" ON "_posts_v_blocks_content_columns" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_content_order_idx" ON "_posts_v_blocks_content" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_parent_id_idx" ON "_posts_v_blocks_content" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_path_idx" ON "_posts_v_blocks_content" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_content_locale_idx" ON "_posts_v_blocks_content" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_media_block_order_idx" ON "_posts_v_blocks_media_block" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_media_block_parent_id_idx" ON "_posts_v_blocks_media_block" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_media_block_path_idx" ON "_posts_v_blocks_media_block" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_media_block_locale_idx" ON "_posts_v_blocks_media_block" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_media_block_media_idx" ON "_posts_v_blocks_media_block" USING btree ("media_id");
  CREATE INDEX "_posts_v_blocks_cta_links_order_idx" ON "_posts_v_blocks_cta_links" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_links_parent_id_idx" ON "_posts_v_blocks_cta_links" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_links_locale_idx" ON "_posts_v_blocks_cta_links" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_cta_order_idx" ON "_posts_v_blocks_cta" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_cta_parent_id_idx" ON "_posts_v_blocks_cta" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_cta_path_idx" ON "_posts_v_blocks_cta" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_cta_locale_idx" ON "_posts_v_blocks_cta" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_slider_slides_order_idx" ON "_posts_v_blocks_slider_slides" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_slider_slides_parent_id_idx" ON "_posts_v_blocks_slider_slides" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_slider_slides_locale_idx" ON "_posts_v_blocks_slider_slides" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_slider_slides_image_idx" ON "_posts_v_blocks_slider_slides" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_slider_slides_mobile_image_idx" ON "_posts_v_blocks_slider_slides" USING btree ("mobile_image_id");
  CREATE INDEX "_posts_v_blocks_slider_order_idx" ON "_posts_v_blocks_slider" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_slider_parent_id_idx" ON "_posts_v_blocks_slider" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_slider_path_idx" ON "_posts_v_blocks_slider" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_slider_locale_idx" ON "_posts_v_blocks_slider" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_content_with_image_order_idx" ON "_posts_v_blocks_content_with_image" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_content_with_image_parent_id_idx" ON "_posts_v_blocks_content_with_image" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_content_with_image_path_idx" ON "_posts_v_blocks_content_with_image" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_content_with_image_locale_idx" ON "_posts_v_blocks_content_with_image" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_content_with_image_image_idx" ON "_posts_v_blocks_content_with_image" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_team_members_social_links_order_idx" ON "_posts_v_blocks_team_members_social_links" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_team_members_social_links_parent_id_idx" ON "_posts_v_blocks_team_members_social_links" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_team_members_social_links_locale_idx" ON "_posts_v_blocks_team_members_social_links" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_team_members_order_idx" ON "_posts_v_blocks_team_members" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_team_members_parent_id_idx" ON "_posts_v_blocks_team_members" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_team_members_locale_idx" ON "_posts_v_blocks_team_members" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_team_members_photo_idx" ON "_posts_v_blocks_team_members" USING btree ("photo_id");
  CREATE INDEX "_posts_v_blocks_team_order_idx" ON "_posts_v_blocks_team" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_team_parent_id_idx" ON "_posts_v_blocks_team" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_team_path_idx" ON "_posts_v_blocks_team" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_team_locale_idx" ON "_posts_v_blocks_team" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_form_block_order_idx" ON "_posts_v_blocks_form_block" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_form_block_parent_id_idx" ON "_posts_v_blocks_form_block" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_form_block_path_idx" ON "_posts_v_blocks_form_block" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_form_block_locale_idx" ON "_posts_v_blocks_form_block" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_form_block_form_idx" ON "_posts_v_blocks_form_block" USING btree ("form_id");
  CREATE INDEX "_posts_v_blocks_form_block_image_idx" ON "_posts_v_blocks_form_block" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_events_events_order_idx" ON "_posts_v_blocks_events_events" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_events_events_parent_id_idx" ON "_posts_v_blocks_events_events" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_events_events_locale_idx" ON "_posts_v_blocks_events_events" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_events_order_idx" ON "_posts_v_blocks_events" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_events_parent_id_idx" ON "_posts_v_blocks_events" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_events_path_idx" ON "_posts_v_blocks_events" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_events_locale_idx" ON "_posts_v_blocks_events" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_gallery_images_order_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_images_parent_id_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_images_locale_idx" ON "_posts_v_blocks_gallery_images" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_gallery_images_image_idx" ON "_posts_v_blocks_gallery_images" USING btree ("image_id");
  CREATE INDEX "_posts_v_blocks_gallery_order_idx" ON "_posts_v_blocks_gallery" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_gallery_parent_id_idx" ON "_posts_v_blocks_gallery" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_gallery_path_idx" ON "_posts_v_blocks_gallery" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_gallery_locale_idx" ON "_posts_v_blocks_gallery" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_faq_items_order_idx" ON "_posts_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_items_parent_id_idx" ON "_posts_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_items_locale_idx" ON "_posts_v_blocks_faq_items" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_faq_order_idx" ON "_posts_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_posts_v_blocks_faq_parent_id_idx" ON "_posts_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_blocks_faq_path_idx" ON "_posts_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_posts_v_blocks_faq_locale_idx" ON "_posts_v_blocks_faq" USING btree ("_locale");
  CREATE INDEX "_posts_v_blocks_faq_image_idx" ON "_posts_v_blocks_faq" USING btree ("image_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_featured_image_idx" ON "_posts_v" USING btree ("version_featured_image_id");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_snapshot_idx" ON "_posts_v" USING btree ("snapshot");
  CREATE INDEX "_posts_v_published_locale_idx" ON "_posts_v" USING btree ("published_locale");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v_locales" USING btree ("version_meta_image_id","_locale");
  CREATE UNIQUE INDEX "_posts_v_locales_locale_parent_id_unique" ON "_posts_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_locale_idx" ON "_posts_v_rels" USING btree ("locale");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id","locale");
  CREATE INDEX "_posts_v_rels_pages_id_idx" ON "_posts_v_rels" USING btree ("pages_id","locale");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "posts_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_slider_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_content_with_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_team_members_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_events_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_columns" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_media_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_cta" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_slider_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_slider" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_content_with_image" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_team_members_social_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_team_members" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_team" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_form_block" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_events_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_events" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_blocks_faq" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "posts_blocks_content_columns" CASCADE;
  DROP TABLE "posts_blocks_content" CASCADE;
  DROP TABLE "posts_blocks_media_block" CASCADE;
  DROP TABLE "posts_blocks_cta_links" CASCADE;
  DROP TABLE "posts_blocks_cta" CASCADE;
  DROP TABLE "posts_blocks_slider_slides" CASCADE;
  DROP TABLE "posts_blocks_slider" CASCADE;
  DROP TABLE "posts_blocks_content_with_image" CASCADE;
  DROP TABLE "posts_blocks_team_members_social_links" CASCADE;
  DROP TABLE "posts_blocks_team_members" CASCADE;
  DROP TABLE "posts_blocks_team" CASCADE;
  DROP TABLE "posts_blocks_form_block" CASCADE;
  DROP TABLE "posts_blocks_events_events" CASCADE;
  DROP TABLE "posts_blocks_events" CASCADE;
  DROP TABLE "posts_blocks_gallery_images" CASCADE;
  DROP TABLE "posts_blocks_gallery" CASCADE;
  DROP TABLE "posts_blocks_faq_items" CASCADE;
  DROP TABLE "posts_blocks_faq" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_locales" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_blocks_content_columns" CASCADE;
  DROP TABLE "_posts_v_blocks_content" CASCADE;
  DROP TABLE "_posts_v_blocks_media_block" CASCADE;
  DROP TABLE "_posts_v_blocks_cta_links" CASCADE;
  DROP TABLE "_posts_v_blocks_cta" CASCADE;
  DROP TABLE "_posts_v_blocks_slider_slides" CASCADE;
  DROP TABLE "_posts_v_blocks_slider" CASCADE;
  DROP TABLE "_posts_v_blocks_content_with_image" CASCADE;
  DROP TABLE "_posts_v_blocks_team_members_social_links" CASCADE;
  DROP TABLE "_posts_v_blocks_team_members" CASCADE;
  DROP TABLE "_posts_v_blocks_team" CASCADE;
  DROP TABLE "_posts_v_blocks_form_block" CASCADE;
  DROP TABLE "_posts_v_blocks_events_events" CASCADE;
  DROP TABLE "_posts_v_blocks_events" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery_images" CASCADE;
  DROP TABLE "_posts_v_blocks_gallery" CASCADE;
  DROP TABLE "_posts_v_blocks_faq_items" CASCADE;
  DROP TABLE "_posts_v_blocks_faq" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_locales" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_posts_blocks_content_columns_size";
  DROP TYPE "public"."enum_posts_blocks_content_columns_link_type";
  DROP TYPE "public"."enum_posts_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_media_block_position";
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_type";
  DROP TYPE "public"."enum_posts_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_slider_slides_heading_tag";
  DROP TYPE "public"."enum_posts_blocks_slider_slides_overlay_position";
  DROP TYPE "public"."enum_posts_blocks_slider_slides_overlay_strength";
  DROP TYPE "public"."enum_posts_blocks_slider_slides_link_type";
  DROP TYPE "public"."enum_posts_blocks_slider_slides_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_content_with_image_image_position";
  DROP TYPE "public"."enum_posts_blocks_content_with_image_image_shape";
  DROP TYPE "public"."enum_posts_blocks_content_with_image_link_type";
  DROP TYPE "public"."enum_posts_blocks_content_with_image_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_team_members_social_links_platform";
  DROP TYPE "public"."enum_posts_blocks_team_variant";
  DROP TYPE "public"."enum_posts_blocks_team_cta_link_type";
  DROP TYPE "public"."enum_posts_blocks_team_cta_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_form_block_image_position";
  DROP TYPE "public"."enum_posts_blocks_events_events_category_color";
  DROP TYPE "public"."enum_posts_blocks_gallery_layout";
  DROP TYPE "public"."enum_posts_blocks_gallery_columns";
  DROP TYPE "public"."enum_posts_blocks_gallery_cta_link_type";
  DROP TYPE "public"."enum_posts_blocks_gallery_cta_link_appearance";
  DROP TYPE "public"."enum_posts_blocks_faq_image_position";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_size";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_content_columns_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_media_block_position";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_cta_links_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_slider_slides_heading_tag";
  DROP TYPE "public"."enum__posts_v_blocks_slider_slides_overlay_position";
  DROP TYPE "public"."enum__posts_v_blocks_slider_slides_overlay_strength";
  DROP TYPE "public"."enum__posts_v_blocks_slider_slides_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_slider_slides_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_content_with_image_image_position";
  DROP TYPE "public"."enum__posts_v_blocks_content_with_image_image_shape";
  DROP TYPE "public"."enum__posts_v_blocks_content_with_image_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_content_with_image_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_team_members_social_links_platform";
  DROP TYPE "public"."enum__posts_v_blocks_team_variant";
  DROP TYPE "public"."enum__posts_v_blocks_team_cta_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_team_cta_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_form_block_image_position";
  DROP TYPE "public"."enum__posts_v_blocks_events_events_category_color";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_layout";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_columns";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_cta_link_type";
  DROP TYPE "public"."enum__posts_v_blocks_gallery_cta_link_appearance";
  DROP TYPE "public"."enum__posts_v_blocks_faq_image_position";
  DROP TYPE "public"."enum__posts_v_version_status";
  DROP TYPE "public"."enum__posts_v_published_locale";`)
}
