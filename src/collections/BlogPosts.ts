import type { CollectionConfig } from "payload";

import { revalidateBlogPost, revalidateBlogPostDelete } from "../lib/cms/revalidate-hooks.ts";

import { canDeleteContent, canManageContent, publishedOrCanManageContent } from "./access.ts";
import { seoFields, slugField } from "./shared.ts";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: {
    singular: "Blog post",
    plural: "Blog posts",
  },
  admin: {
    defaultColumns: ["title", "slug", "_status", "publishedAt", "updatedAt"],
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
    afterChange: [revalidateBlogPost],
    afterDelete: [revalidateBlogPostDelete],
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
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "excerpt",
      type: "textarea",
      maxLength: 220,
      required: true,
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
    },
    {
      name: "topics",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
    ...seoFields,
  ],
};
