import type { Field } from "payload";

export const slugField: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
};

export const seoFields: Field[] = [
  {
    name: "seo",
    type: "group",
    fields: [
      {
        name: "metaTitle",
        type: "text",
        maxLength: 70,
      },
      {
        name: "metaDescription",
        type: "textarea",
        maxLength: 180,
      },
      {
        name: "canonicalPath",
        type: "text",
      },
      {
        name: "focusKeyword",
        type: "text",
      },
      {
        name: "noIndex",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
  {
    name: "social",
    type: "group",
    fields: [
      {
        name: "title",
        type: "text",
      },
      {
        name: "description",
        type: "textarea",
      },
      {
        name: "image",
        type: "upload",
        relationTo: "media",
      },
    ],
  },
];
