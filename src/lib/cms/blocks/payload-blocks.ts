/**
 * Payload block definitions for the CMS `blocks` field — one Block per
 * editorial primitive. Each block's `slug` is the render-time `blockType`
 * (mirrored in `render-registry.tsx` and the primitive registry) and each
 * field set mirrors the matching `*Payload` interface in
 * `block-editor-types.ts`, so a stored row maps cleanly through `mapBlocks`
 * into `BlockData<T>` with no per-block transform.
 *
 * Shared by `MarketingPages` (campaign pages) and `ContentOverrides`
 * (programmatic-page body overlays). Additive + opt-in: an empty `blocks`
 * field renders nothing and pages fall back to their legacy content.
 */

import type { Block } from "payload"

const TONE_OPTIONS = [
  { label: "Neutral", value: "neutral" },
  { label: "Teal", value: "teal" },
  { label: "Amber", value: "amber" },
  { label: "Red", value: "red" },
  { label: "Green", value: "green" },
  { label: "Violet", value: "violet" },
]

const callout: Block = {
  slug: "callout",
  interfaceName: "CalloutBlockData",
  labels: { singular: "Callout", plural: "Callouts" },
  fields: [
    {
      name: "kind",
      type: "select",
      defaultValue: "info",
      options: [
        { label: "Info", value: "info" },
        { label: "Warning", value: "warning" },
        { label: "Tip", value: "tip" },
        { label: "Danger", value: "danger" },
      ],
      required: true,
    },
    { name: "title", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "dismissible", type: "checkbox", defaultValue: false },
  ],
}

const cta: Block = {
  slug: "cta",
  interfaceName: "CtaBlockData",
  labels: { singular: "Call to action", plural: "Calls to action" },
  fields: [
    { name: "heading", type: "text", required: true },
    { name: "body", type: "textarea", required: true },
    { name: "buttonLabel", type: "text", required: true },
    { name: "buttonHref", type: "text", required: true },
    { name: "backgroundImageUrl", type: "text" },
    { name: "tone", type: "select", defaultValue: "amber", options: TONE_OPTIONS, required: true },
  ],
}

const quote: Block = {
  slug: "quote",
  interfaceName: "QuoteBlockData",
  labels: { singular: "Quote", plural: "Quotes" },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "plain",
      options: [
        { label: "Plain", value: "plain" },
        { label: "With image", value: "image" },
      ],
      required: true,
    },
    { name: "text", type: "textarea", required: true },
    { name: "author", type: "text", required: true },
    { name: "citation", type: "text" },
    { name: "imageUrl", type: "text" },
    { name: "imageAlt", type: "text" },
  ],
}

const divider: Block = {
  slug: "divider",
  interfaceName: "DividerBlockData",
  labels: { singular: "Divider", plural: "Dividers" },
  fields: [
    {
      name: "variant",
      type: "select",
      defaultValue: "line",
      options: [
        { label: "Line", value: "line" },
        { label: "Dot", value: "dot" },
        { label: "Icon", value: "icon" },
        { label: "Wave", value: "wave" },
        { label: "Zigzag", value: "zigzag" },
      ],
      required: true,
    },
    { name: "label", type: "text" },
  ],
}

const accordion: Block = {
  slug: "accordion",
  interfaceName: "AccordionBlockData",
  labels: { singular: "Accordion", plural: "Accordions" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "entries",
      type: "array",
      minRows: 1,
      fields: [
        { name: "question", type: "text", required: true },
        { name: "answer", type: "textarea", required: true },
        { name: "open", type: "checkbox", defaultValue: false },
      ],
    },
  ],
}

const checklist: Block = {
  slug: "checklist",
  interfaceName: "ChecklistBlockData",
  labels: { singular: "Checklist", plural: "Checklists" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "done", type: "checkbox", defaultValue: false },
      ],
    },
  ],
}

const gallery: Block = {
  slug: "gallery",
  interfaceName: "GalleryBlockData",
  labels: { singular: "Gallery", plural: "Galleries" },
  fields: [
    {
      name: "layout",
      type: "select",
      defaultValue: "grid",
      options: [
        { label: "Grid", value: "grid" },
        { label: "Carousel", value: "carousel" },
        { label: "Masonry", value: "masonry" },
      ],
      required: true,
    },
    { name: "caption", type: "text" },
    {
      name: "items",
      type: "array",
      minRows: 1,
      fields: [
        { name: "src", type: "text", required: true },
        { name: "alt", type: "text", required: true },
        { name: "caption", type: "text" },
        { name: "ratio", type: "number" },
      ],
    },
  ],
}

const embed: Block = {
  slug: "embed",
  interfaceName: "EmbedBlockData",
  labels: { singular: "Embed", plural: "Embeds" },
  fields: [
    {
      name: "provider",
      type: "select",
      defaultValue: "youtube",
      options: [
        { label: "YouTube", value: "youtube" },
        { label: "Vimeo", value: "vimeo" },
        { label: "CodePen", value: "codepen" },
        { label: "Twitter", value: "twitter" },
      ],
      required: true,
    },
    { name: "url", type: "text", required: true },
    { name: "title", type: "text", required: true },
    {
      name: "aspect",
      type: "select",
      defaultValue: "16:9",
      options: [
        { label: "16:9", value: "16:9" },
        { label: "4:3", value: "4:3" },
        { label: "1:1", value: "1:1" },
        { label: "9:16", value: "9:16" },
      ],
      required: true,
    },
    { name: "authorHandle", type: "text" },
  ],
}

const video: Block = {
  slug: "video",
  interfaceName: "VideoBlockData",
  labels: { singular: "Video", plural: "Videos" },
  fields: [
    { name: "src", type: "text", required: true },
    { name: "posterUrl", type: "text", required: true },
    { name: "title", type: "text", required: true },
    { name: "durationSeconds", type: "number", defaultValue: 0, required: true },
    { name: "captionsEnabled", type: "checkbox", defaultValue: false },
    {
      name: "chapters",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "start", type: "number", defaultValue: 0, required: true },
      ],
    },
  ],
}

const timeline: Block = {
  slug: "timeline",
  interfaceName: "TimelineBlockData",
  labels: { singular: "Timeline", plural: "Timelines" },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "events",
      type: "array",
      minRows: 1,
      fields: [
        { name: "date", type: "text", required: true },
        { name: "label", type: "text", required: true },
        { name: "description", type: "textarea", required: true },
        {
          name: "granularity",
          type: "select",
          defaultValue: "year",
          options: [
            { label: "Year", value: "year" },
            { label: "Month", value: "month" },
            { label: "Event", value: "event" },
          ],
          required: true,
        },
        { name: "tone", type: "select", defaultValue: "neutral", options: TONE_OPTIONS, required: true },
      ],
    },
  ],
}

const poll: Block = {
  slug: "poll",
  interfaceName: "PollBlockData",
  labels: { singular: "Poll", plural: "Polls" },
  fields: [
    { name: "question", type: "text", required: true },
    { name: "totalVotes", type: "number", defaultValue: 0, required: true },
    { name: "multiSelect", type: "checkbox", defaultValue: false },
    { name: "closesAt", type: "text" },
    {
      name: "choices",
      type: "array",
      minRows: 2,
      fields: [
        { name: "label", type: "text", required: true },
        { name: "votes", type: "number", defaultValue: 0, required: true },
      ],
    },
  ],
}

const code: Block = {
  slug: "code",
  interfaceName: "CodeBlockData",
  labels: { singular: "Code", plural: "Code blocks" },
  fields: [
    {
      name: "language",
      type: "select",
      defaultValue: "typescript",
      options: [
        { label: "Bash", value: "bash" },
        { label: "JavaScript", value: "javascript" },
        { label: "TypeScript", value: "typescript" },
        { label: "JSON", value: "json" },
        { label: "YAML", value: "yaml" },
        { label: "CSS", value: "css" },
        { label: "HTML", value: "html" },
      ],
      required: true,
    },
    {
      name: "theme",
      type: "select",
      defaultValue: "graphite",
      options: [
        { label: "Graphite", value: "graphite" },
        { label: "Amber", value: "amber" },
        { label: "Teal", value: "teal" },
        { label: "Violet", value: "violet" },
      ],
      required: true,
    },
    { name: "source", type: "code", required: true },
    { name: "showLineNumbers", type: "checkbox", defaultValue: true },
    { name: "filename", type: "text" },
  ],
}

const codeSandbox: Block = {
  slug: "codeSandbox",
  interfaceName: "CodeSandboxBlockData",
  labels: { singular: "Code sandbox", plural: "Code sandboxes" },
  fields: [
    { name: "html", type: "code", required: true },
    { name: "css", type: "code", required: true },
    { name: "javascript", type: "code", required: true },
    {
      name: "activePane",
      type: "select",
      defaultValue: "html",
      options: [
        { label: "HTML", value: "html" },
        { label: "CSS", value: "css" },
        { label: "JavaScript", value: "javascript" },
      ],
      required: true,
    },
    { name: "previewLabel", type: "text" },
  ],
}

const table: Block = {
  slug: "table",
  interfaceName: "TableBlockData",
  labels: { singular: "Table", plural: "Tables" },
  fields: [
    { name: "caption", type: "text" },
    {
      name: "columns",
      type: "array",
      minRows: 1,
      fields: [
        { name: "label", type: "text", required: true },
        {
          name: "align",
          type: "select",
          defaultValue: "left",
          options: [
            { label: "Left", value: "left" },
            { label: "Right", value: "right" },
            { label: "Center", value: "center" },
          ],
          required: true,
        },
        {
          name: "format",
          type: "select",
          defaultValue: "text",
          options: [
            { label: "Text", value: "text" },
            { label: "Currency", value: "currency" },
            { label: "Number", value: "number" },
            { label: "Percent", value: "percent" },
          ],
          required: true,
        },
        { name: "width", type: "number", defaultValue: 160, required: true },
        { name: "sortable", type: "checkbox", defaultValue: false },
      ],
    },
    {
      name: "rows",
      type: "array",
      fields: [
        {
          name: "cells",
          type: "json",
          required: true,
          admin: { description: 'Object keyed by column id, e.g. {"<columnId>": "value"}.' },
        },
      ],
    },
  ],
}

/**
 * The canonical block list for the CMS `blocks` field. Order controls the
 * admin block-picker order. Slugs are the render-time block types.
 */
export const contentBlocks: Block[] = [
  cta,
  callout,
  quote,
  gallery,
  video,
  embed,
  accordion,
  checklist,
  divider,
  timeline,
  poll,
  table,
  code,
  codeSandbox,
]

export { marketingBlocks } from "./marketing-blocks.ts"
export { sectionBlocks } from "./section-blocks.ts"

import { marketingBlocks as marketingBlockDefs } from "./marketing-blocks.ts"
import { sectionBlocks as sectionBlockDefs } from "./section-blocks.ts"

/**
 * Full web-builder block library: editorial blocks, then the premium section
 * blocks, then the marketing blocks. Order controls the admin picker.
 * `footer-megamap` duplicates the site shell footer, so it is only offered in
 * the standalone page builder (MarketingPages), never in per-path overrides.
 */
export const allPageBlocks: Block[] = [
  ...contentBlocks,
  ...sectionBlockDefs,
  ...marketingBlockDefs,
]

export const overridePageBlocks: Block[] = allPageBlocks.filter(
  (block) => block.slug !== "footer-megamap",
)
