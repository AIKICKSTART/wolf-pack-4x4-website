import type { GlobalConfig } from "payload";

import { canManageContent, canManageInfrastructureField, publicRead } from "./access.ts";
import { revalidateSiteWide } from "../lib/cms/revalidate-hooks.ts";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site settings",
  admin: {
    group: "Content",
  },
  access: {
    read: publicRead,
    update: canManageContent,
  },
  hooks: {
    afterChange: [revalidateSiteWide],
  },
  fields: [
    {
      name: "business",
      type: "group",
      fields: [
        {
          name: "displayName",
          type: "text",
          defaultValue: "Wolfpack 4x4",
          required: true,
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "email",
          type: "email",
        },
        {
          name: "address",
          type: "textarea",
        },
        {
          name: "openingHours",
          type: "textarea",
        },
      ],
    },
    {
      name: "marketing",
      type: "group",
      fields: [
        {
          name: "announcement",
          type: "text",
        },
        {
          name: "primaryCallToAction",
          type: "text",
          defaultValue: "Request a 4x4 quote",
        },
        {
          name: "socialLinks",
          type: "array",
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
        {
          name: "footerLinks",
          type: "array",
          admin: {
            description:
              "Extra links shown in the public footer — use this to surface CMS-built pages (e.g. /specials/winter-sale).",
          },
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "href",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "operatorNotes",
      type: "textarea",
      access: {
        read: canManageInfrastructureField,
        update: canManageInfrastructureField,
      },
    },
  ],
};
