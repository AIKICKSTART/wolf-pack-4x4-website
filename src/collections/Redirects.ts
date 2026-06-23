import type { CollectionConfig } from "payload";

import { canDeleteContent, canManageContent } from "./access.ts";

function isLocalPublicPath(value: unknown) {
  if (typeof value !== "string") return false;

  const path = value.trim();
  return path.startsWith("/") && !path.startsWith("//") && !path.includes("\\") && !/[\u0000-\u001f\u007f]/.test(path);
}

export const Redirects: CollectionConfig = {
  slug: "redirects",
  labels: {
    singular: "Redirect",
    plural: "Redirects",
  },
  admin: {
    defaultColumns: ["fromPath", "toPath", "statusCode", "isActive", "updatedAt"],
    group: "Content",
    useAsTitle: "fromPath",
  },
  access: {
    create: canManageContent,
    delete: canDeleteContent,
    read: canManageContent,
    update: canManageContent,
  },
  fields: [
    {
      name: "fromPath",
      type: "text",
      admin: {
        description: "Old path, for example /old-wordpress-page.",
      },
      index: true,
      required: true,
      unique: true,
      validate: (value: unknown) =>
        isLocalPublicPath(value) || "Redirect source must be a local public path starting with one slash.",
    },
    {
      name: "toPath",
      type: "text",
      admin: {
        description: "New local path, for example /services/suspension-lift-kits.",
      },
      required: true,
      validate: (value: unknown) =>
        isLocalPublicPath(value) || "Redirect target must be a local public path. External redirect URLs are not allowed.",
    },
    {
      name: "statusCode",
      type: "select",
      defaultValue: "301",
      options: [
        { label: "301 permanent", value: "301" },
        { label: "302 temporary", value: "302" },
      ],
      required: true,
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "notes",
      type: "textarea",
    },
  ],
};
