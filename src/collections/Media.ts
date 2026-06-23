import path from "node:path";
import { fileURLToPath } from "node:url";

import type { CollectionConfig } from "payload";

import { canDeleteContent, canManageContent, hasRole } from "./access.ts";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const publicMediaRoles = ["blog", "brand", "cinematic", "generated", "icon", "marketing", "open-graph", "page"] as const;

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    defaultColumns: ["filename", "alt", "assetRole", "updatedAt"],
    group: "Content",
    listSearchableFields: ["filename", "alt", "caption"],
    useAsTitle: "alt",
  },
  folders: true,
  access: {
    create: canManageContent,
    delete: canDeleteContent,
    read: ({ req: { user } }) => {
      if (hasRole(user, ["operator", "admin", "editor", "seo-manager", "client-reviewer"])) {
        return true;
      }

      return {
        assetRole: {
          in: publicMediaRoles,
        },
      };
    },
    update: canManageContent,
  },
  upload: {
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      { name: "thumbnail", width: 320, formatOptions: { format: "webp" }, withoutEnlargement: true },
      { name: "card", width: 768, formatOptions: { format: "webp" }, withoutEnlargement: true },
      { name: "hero", width: 1600, formatOptions: { format: "webp" }, withoutEnlargement: true },
    ],
    mimeTypes: ["image/avif", "image/jpeg", "image/png", "image/webp", "image/svg+xml", "video/mp4", "video/webm"],
    pasteURL: false,
    // Single-VPS local uploads: mount this directory as persistent storage in production.
    staticDir: path.resolve(dirname, "../../public/media/cms"),
  },
  fields: [
    {
      name: "preview",
      type: "ui",
      admin: {
        components: {
          Field: "/src/components/cms/admin/media-preview-field#MediaPreviewField",
        },
      },
    },
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
    {
      name: "assetRole",
      type: "select",
      defaultValue: "page",
      options: [
        { label: "Page image", value: "page" },
        { label: "Blog image", value: "blog" },
        { label: "Open Graph image", value: "open-graph" },
        { label: "Brand asset", value: "brand" },
        { label: "Cinematic video", value: "cinematic" },
        { label: "Generated media", value: "generated" },
        { label: "Icon", value: "icon" },
        { label: "Marketing collateral", value: "marketing" },
      ],
      required: true,
    },
    {
      name: "tags",
      type: "array",
      admin: {
        description: "Freeform tags for filtering the media library, e.g. logo, video, seedance.",
      },
      fields: [
        {
          name: "tag",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "credit",
      type: "text",
    },
    {
      name: "sourceUrl",
      type: "text",
    },
  ],
};
