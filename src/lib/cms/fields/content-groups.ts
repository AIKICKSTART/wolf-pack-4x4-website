import type { Field } from "payload";

/**
 * Per-page-type "Page sections" group for ContentOverrides.
 *
 * Each sub-group only appears in the admin when the override's targetType /
 * targetPath matches the page it edits, so the owner only ever sees the
 * sections that actually exist on that page. Empty fields fall back to the
 * built-in copy at render time.
 *
 * Array identifiers stay under Postgres's 63-char limit without custom
 * dbNames (longest versions-table name is 60 chars). Group fields don't
 * in Payload 3.84.1 — groups only prefix column names and never create
 * tables, so the short names live on the arrays.
 */

const textItemArray = (name: string, label: string): Field => ({
  name,
  type: "array",
  label,
  fields: [
    {
      name: "item",
      type: "text",
    },
  ],
});

const faqArray = (name: string, label: string): Field => ({
  name,
  type: "array",
  label,
  fields: [
    {
      name: "question",
      type: "text",
    },
    {
      name: "answer",
      type: "textarea",
    },
  ],
});

const titleBodyArray = (name: string, label: string): Field => ({
  name,
  type: "array",
  label,
  fields: [
    {
      name: "title",
      type: "text",
    },
    {
      name: "body",
      type: "textarea",
    },
  ],
});

export const contentSectionsField: Field = {
  name: "content",
  type: "group",
  label: "Page sections",
  admin: {
    description: "Section-by-section content of this page. Empty fields fall back to the built-in copy.",
  },
  fields: [
    {
      name: "service",
      type: "group",
      label: "Service page sections",
      admin: {
        condition: (data) => data?.targetType === "service",
        description: "Sections shown on this service page.",
      },
      fields: [
        textItemArray("includes", "What this service covers"),
        textItemArray("proof", "Why customers book it here"),
        faqArray("faq", "Service FAQs"),
      ],
    },
    {
      name: "location",
      type: "group",
      label: "Location page sections",
      admin: {
        condition: (data) => data?.targetType === "location" && !data?.targetPath?.startsWith("/areas/"),
        description: "Sections shown on this suburb / location page.",
      },
      fields: [
        {
          name: "localIntent",
          type: "textarea",
          label: "Local intro sentence",
        },
        {
          name: "workshopContext",
          type: "textarea",
          label: "Workshop context paragraph",
          admin: {
            description: "Overrides the generated regional paragraph.",
          },
        },
        {
          name: "nearby",
          type: "array",
          label: "Nearby areas",
          fields: [
            {
              name: "name",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "area",
      type: "group",
      label: "Area page sections",
      admin: {
        condition: (data) => data?.targetPath?.startsWith("/areas/") && data?.targetPath !== "/areas",
        description: "Sections shown on this service-area page.",
      },
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Area description",
        },
      ],
    },
    {
      name: "partCategory",
      type: "group",
      label: "Part category sections",
      admin: {
        condition: (data) => data?.targetType === "part-category",
        description: "Sections shown on this part category page.",
      },
      fields: [
        {
          name: "description",
          type: "textarea",
          label: "Category description",
        },
      ],
    },
    {
      name: "servicesHub",
      type: "group",
      label: "Services hub sections",
      admin: {
        condition: (data) => data?.targetPath === "/services",
        description: "Sections shown on the /services hub page.",
      },
      fields: [
        {
          name: "stats",
          type: "array",
          label: "Stats",
          fields: [
            {
              name: "value",
              type: "text",
            },
            {
              name: "label",
              type: "text",
            },
          ],
        },
        titleBodyArray("steps", "Steps"),
      ],
    },
    {
      name: "about",
      type: "group",
      label: "About page sections",
      admin: {
        condition: (data) => data?.targetPath === "/about-us",
        description: "Sections shown on the /about-us page.",
      },
      fields: [
        {
          name: "storyParagraphs",
          type: "array",
          label: "Story paragraphs",
          fields: [
            {
              name: "text",
              type: "textarea",
            },
          ],
        },
        titleBodyArray("cards", "Team / founder cards"),
        titleBodyArray("steps", "How the workshop runs jobs"),
        textItemArray("serviceList", "Service list"),
      ],
    },
    {
      name: "products",
      type: "group",
      label: "Products page sections",
      admin: {
        condition: (data) => data?.targetPath === "/products",
        description: "Sections shown on the /products page.",
      },
      fields: [
        {
          name: "introHeading",
          type: "text",
        },
        {
          name: "introBody",
          type: "textarea",
        },
        {
          name: "productLinks",
          type: "array",
          label: "Product links",
          fields: [
            {
              name: "label",
              type: "text",
            },
            {
              name: "href",
              type: "text",
            },
            {
              name: "description",
              type: "textarea",
            },
          ],
        },
      ],
    },
    {
      name: "gallery",
      type: "group",
      label: "Gallery page sections",
      admin: {
        condition: (data) => data?.targetPath === "/gallery",
        description: "Sections shown on the /gallery page.",
      },
      fields: [
        {
          name: "items",
          type: "array",
          label: "Gallery items",
          fields: [
            {
              name: "image",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "src",
              type: "text",
              label: "Image URL (use instead of upload)",
            },
            {
              name: "alt",
              type: "text",
            },
            {
              name: "caption",
              type: "text",
            },
          ],
        },
      ],
    },
    {
      name: "faqPage",
      type: "group",
      label: "FAQ page sections",
      admin: {
        condition: (data) => data?.targetPath === "/faq",
        description: "Sections shown on the /faq page.",
      },
      fields: [faqArray("generalFaqs", "General FAQs")],
    },
    {
      name: "homepage",
      type: "group",
      label: "Homepage sections",
      admin: {
        condition: (data) => data?.targetType === "homepage",
        description: "Sections shown on the homepage.",
      },
      fields: [
        {
          name: "services",
          type: "array",
          label: "Service cards",
          fields: [
            {
              name: "title",
              type: "text",
            },
            {
              name: "blurb",
              type: "textarea",
            },
          ],
        },
        {
          name: "marquee",
          type: "array",
          label: "Marquee lines",
          fields: [
            {
              name: "text",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
