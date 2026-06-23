/**
 * Block-editor primitive family — barrel export.
 *
 * 14 editorial blocks the CMS (Agent RRRR) + content-studio
 * (Agent UUUU) can mix into long-form documents. Every block exposes
 * a `<Name>` render component, a `<Name>Edit` edit-mode alias, and a
 * shared `BlockData<T>` envelope.
 */

export { BlockShell } from "./block-shell"

export { GalleryBlock, GalleryBlockEdit } from "./gallery-block"
export { CodeBlock, CodeBlockEdit } from "./code-block"
export { TableBlock, TableBlockEdit } from "./table-block"
export { EmbedBlock, EmbedBlockEdit } from "./embed-block"
export { QuoteBlock, QuoteBlockEdit } from "./quote-block"
export { PollBlock, PollBlockEdit } from "./poll-block"
export { CodeSandboxBlock, CodeSandboxBlockEdit } from "./code-sandbox-block"
export { TimelineBlock, TimelineBlockEdit } from "./timeline-block"
export { DividerBlock, DividerBlockEdit } from "./divider-block"
export { VideoBlock, VideoBlockEdit } from "./video-block"
export { CalloutBlock, CalloutBlockEdit } from "./callout-block"
export { ChecklistBlock, ChecklistBlockEdit } from "./checklist-block"
export { AccordionBlock, AccordionBlockEdit } from "./accordion-block"
export { CtaBlock, CtaBlockEdit } from "./cta-block"

export { TONE_LABEL, isEditMode } from "./block-editor-types"

export type {
  AccordionEntry,
  AccordionPayload,
  BlockData,
  BlockError,
  BlockMode,
  BlockPrimitiveProps,
  BlockTone,
  CalloutKind,
  CalloutPayload,
  ChecklistItem,
  ChecklistPayload,
  CodeLanguage,
  CodePayload,
  CodeSandboxPayload,
  CodeTheme,
  CtaPayload,
  DividerPayload,
  DividerVariant,
  EmbedAspect,
  EmbedPayload,
  EmbedProvider,
  GalleryItem,
  GalleryLayout,
  GalleryPayload,
  PollChoice,
  PollPayload,
  QuotePayload,
  QuoteVariant,
  TableAlign,
  TableColumn,
  TableFormat,
  TablePayload,
  TableRow,
  TableSortState,
  TimelineEvent,
  TimelineGranularity,
  TimelinePayload,
  VideoChapter,
  VideoPayload,
} from "./block-editor-types"
