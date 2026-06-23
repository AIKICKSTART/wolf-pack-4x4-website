import type { CollectionConfig } from "payload";

import { allPageBlocks } from "../lib/cms/blocks/payload-blocks.ts";
import { RESERVED_FIRST_SEGMENTS } from "../lib/cms/reserved-paths.ts";
import { revalidateMarketingPage, revalidateMarketingPageDelete } from "../lib/cms/revalidate-hooks.ts";
import { canDeleteContent, canManageContent, publishedOrCanManageContent } from "./access.ts";
import { seoFields, slugField } from "./shared.ts";

export const MarketingPages: CollectionConfig = {
  slug: "marketing-pages",
  labels: {
    singular: "Marketing page",
    plural: "Marketing pages",
  },
  admin: {
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    group: "Content",
    useAsTitle: "title",
  },
  access: {
    create: canManageContent,
    delete: canDeleteContent,
    read: publishedOrCanManageContent,
    readVersions: canManageContent,
    update: canManageContent,
  },
  hooks: {
    afterChange: [revalidateMarketingPage],
    afterDelete: [revalidateMarketingPageDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 800,
      },
      validate: true,
    },
    maxPerDoc: 25,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField,
    {
      name: "path",
      type: "text",
      admin: {
        description:
          "Public route the page publishes at, for example /specials/winter-4x4-upgrade. Must start with / and cannot use a first segment owned by the site's built-in routes (services, parts, locations, blog, ...).",
      },
      required: true,
      unique: true,
      validate: (value: string | null | undefined) => {
        const path = typeof value === "string" ? value.trim() : ""
        if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
          return "Path must start with a single forward slash, for example /specials/sale."
        }
        if (path !== "/" && path.endsWith("/")) {
          return "Path must not end with a trailing slash."
        }
        const segment = path.replace(/^\/+/, "").split("/")[0] ?? ""
        if (!segment) {
          return "Path needs at least one segment — the homepage is edited via Content Overrides."
        }
        if (segment.toLowerCase() !== "campaigns" && RESERVED_FIRST_SEGMENTS.has(segment.toLowerCase())) {
          return `"/${segment}" is owned by a built-in site route. Pick a different first segment or edit that page via Content Overrides.`
        }
        return true
      },
    },
    {
      name: "pageType",
      type: "select",
      defaultValue: "standard",
      options: [
        { label: "Homepage", value: "homepage" },
        { label: "Service page", value: "service" },
        { label: "Location page", value: "location" },
        { label: "Parts page", value: "parts" },
        { label: "Landing page", value: "landing" },
        { label: "Standard", value: "standard" },
      ],
      required: true,
    },
    {
      name: "showHero",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Render the hero band (eyebrow/headline/lede) above the blocks.",
      },
    },
    {
      name: "showContactBand",
      type: "checkbox",
      defaultValue: true,
      admin: {
        description: "Render the workshop contact band after the page content.",
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 220,
    },
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "eyebrow",
          type: "text",
        },
        {
          name: "headline",
          type: "text",
        },
        {
          name: "lede",
          type: "textarea",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "blocks",
      type: "blocks",
      blocks: allPageBlocks,
      admin: {
        description:
          "Optional block layout. When present it renders the page; otherwise the rich-text content is the fallback.",
      },
    },
    ...seoFields,
  ],
};
