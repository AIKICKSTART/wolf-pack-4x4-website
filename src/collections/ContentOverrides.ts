import type { CollectionConfig } from "payload";

import { overridePageBlocks } from "../lib/cms/blocks/payload-blocks.ts";
import { contentSectionsField } from "../lib/cms/fields/content-groups.ts";
import { revalidateContentOverride, revalidateContentOverrideDelete } from "../lib/cms/revalidate-hooks.ts";
import { canDeleteContent, canManageContent, canManageContentField, publishedOrCanManageContent } from "./access.ts";
import { seoFields, slugField } from "./shared.ts";

export const ContentOverrides: CollectionConfig = {
  slug: "content-overrides",
  labels: {
    singular: "Content override",
    plural: "Content overrides",
  },
  admin: {
    defaultColumns: ["title", "targetType", "targetPath", "_status", "updatedAt"],
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
    afterChange: [revalidateContentOverride],
    afterDelete: [revalidateContentOverrideDelete],
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
      name: "targetType",
      type: "select",
      defaultValue: "standard-page",
      options: [
        { label: "Homepage", value: "homepage" },
        { label: "Standard page", value: "standard-page" },
        { label: "Service page", value: "service" },
        { label: "Location page", value: "location" },
        { label: "Service and location page", value: "service-location" },
        { label: "Part page", value: "part" },
        { label: "Part category", value: "part-category" },
      ],
      required: true,
    },
    {
      name: "targetPath",
      type: "text",
      admin: {
        description: "Canonical public path this override applies to, for example /services/suspension-lift-kits.",
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: "summary",
      type: "textarea",
      maxLength: 260,
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
    contentSectionsField,
    {
      name: "body",
      type: "richText",
    },
    {
      name: "blocks",
      type: "blocks",
      blocks: overridePageBlocks,
      admin: {
        description: "Optional blocks appended to the override body on the target page.",
      },
    },
    {
      name: "internalNotes",
      type: "textarea",
      access: {
        read: canManageContentField,
        update: canManageContentField,
      },
    },
    ...seoFields,
  ],
};
