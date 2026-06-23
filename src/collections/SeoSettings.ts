import type { GlobalConfig } from "payload";

import { canManageContent, publicRead } from "./access.ts";
import { revalidateSiteWide } from "../lib/cms/revalidate-hooks.ts";

export const SeoSettings: GlobalConfig = {
  slug: "seo-settings",
  label: "SEO settings",
  admin: {
    group: "SEO",
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
      name: "titleTemplate",
      type: "text",
      defaultValue: "%s | Wolfpack 4x4",
      admin: {
        description: "%s is replaced with the page title.",
      },
    },
    {
      name: "defaultTitle",
      type: "text",
      defaultValue: "Wolfpack 4x4 | Performance 4x4 Upgrades NSW",
    },
    {
      name: "defaultDescription",
      type: "textarea",
      defaultValue:
        "Wolfpack 4x4 supplies and fits suspension, bull bars, winches, lighting, dual battery systems, towing upgrades and 4x4 parts across the Illawarra.",
    },
    {
      name: "defaultOgImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "socialProfiles",
      type: "array",
      admin: {
        description: "Social profile links — feeds the JSON-LD sameAs list.",
      },
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
      name: "robots",
      type: "group",
      fields: [
        {
          name: "siteNoIndex",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "EMERGENCY kill-switch — noindexes the entire site.",
          },
        },
        {
          name: "additionalDisallow",
          type: "array",
          fields: [
            {
              name: "path",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: "verification",
      type: "group",
      fields: [
        {
          name: "google",
          type: "text",
        },
        {
          name: "bing",
          type: "text",
        },
      ],
    },
    {
      name: "localBusiness",
      type: "group",
      fields: [
        {
          name: "legalName",
          type: "text",
        },
        {
          name: "telephone",
          type: "text",
        },
        {
          name: "priceRange",
          type: "text",
          defaultValue: "$$",
        },
        {
          name: "latitude",
          type: "number",
        },
        {
          name: "longitude",
          type: "number",
        },
        {
          name: "openingHours",
          type: "array",
          fields: [
            {
              name: "days",
              type: "text",
              required: true,
              admin: {
                description: 'For example "Monday".',
              },
            },
            {
              name: "opens",
              type: "text",
              required: true,
              admin: {
                description: 'For example "08:00".',
              },
            },
            {
              name: "closes",
              type: "text",
              required: true,
              admin: {
                description: 'For example "17:00".',
              },
            },
          ],
        },
        {
          name: "streetAddress",
          type: "text",
        },
        {
          name: "locality",
          type: "text",
        },
        {
          name: "region",
          type: "text",
          defaultValue: "NSW",
        },
        {
          name: "postcode",
          type: "text",
        },
      ],
    },
  ],
};
