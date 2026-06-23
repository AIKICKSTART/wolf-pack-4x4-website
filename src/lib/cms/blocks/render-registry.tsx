/**
 * Block render registry — maps a stored block type to its presentational
 * primitive and renders an ordered list server-side.
 *
 * Reuses the 14 block-editor components in `mode="render"` (their render
 * branch is presentational: no `onChange`, no `contentEditable`). This file
 * is a Server Component; it imports client primitives, which Next renders on
 * the server and hydrates as needed. Unknown block types surface a visible
 * error in development and are skipped in production so a stray block can
 * never break a published page.
 */

import type { ComponentType } from "react"

import {
  AccordionBlock,
  BlockShell,
  CalloutBlock,
  ChecklistBlock,
  CodeBlock,
  CodeSandboxBlock,
  CtaBlock,
  DividerBlock,
  EmbedBlock,
  GalleryBlock,
  PollBlock,
  QuoteBlock,
  TableBlock,
  TimelineBlock,
  VideoBlock,
} from "@/app/ui-primitives/components/block-editor"
import type {
  BlockData,
  BlockMode,
  BlockPrimitiveProps,
} from "@/app/ui-primitives/components/block-editor"

import { MARKETING_RENDERERS } from "./marketing-renderers"
import { SECTION_RENDERERS } from "./section-renderers"
import { mapBlocks, type PayloadBlockRow } from "./to-block-data"

/** A block component erased to the registry's dynamic payload type. */
type LooseBlockComponent = ComponentType<{ data: BlockData<unknown>; mode?: BlockMode }>

/** Contain the one unavoidable cast for the dynamic dispatch table. */
function asLoose<T>(component: ComponentType<BlockPrimitiveProps<T>>): LooseBlockComponent {
  return component as unknown as LooseBlockComponent
}

/**
 * The canonical block-type -> component map. Keys are the `blockType`
 * discriminators stored by Payload and mirrored in the primitive registry.
 */
export const BLOCK_REGISTRY: Readonly<Record<string, LooseBlockComponent>> = {
  accordion: asLoose(AccordionBlock),
  callout: asLoose(CalloutBlock),
  checklist: asLoose(ChecklistBlock),
  code: asLoose(CodeBlock),
  codeSandbox: asLoose(CodeSandboxBlock),
  cta: asLoose(CtaBlock),
  divider: asLoose(DividerBlock),
  embed: asLoose(EmbedBlock),
  gallery: asLoose(GalleryBlock),
  poll: asLoose(PollBlock),
  quote: asLoose(QuoteBlock),
  table: asLoose(TableBlock),
  timeline: asLoose(TimelineBlock),
  video: asLoose(VideoBlock),
  // Premium section blocks (section-library) + marketing blocks — the
  // web-builder library. Keys are kebab-case blockType slugs.
  ...SECTION_RENDERERS,
  ...MARKETING_RENDERERS,
}

/** Block types this build can render — handy for validation + the palette. */
export const KNOWN_BLOCK_TYPES: readonly string[] = Object.keys(BLOCK_REGISTRY)

export interface RenderBlocksProps {
  /** Raw block rows from a Payload `blocks` field. */
  blocks: readonly PayloadBlockRow[] | null | undefined
  /** Parent document `updatedAt`, threaded into each envelope. */
  updatedAt?: string | null
}

/**
 * Render an ordered list of stored blocks. Returns `null` when there are no
 * blocks, so callers can fall back to legacy content with a simple check.
 */
export function RenderBlocks({ blocks, updatedAt }: RenderBlocksProps) {
  const mapped = mapBlocks(blocks, updatedAt)

  if (mapped.length === 0) {
    return null
  }

  return (
    <>
      {mapped.map((block) => {
        const Component = BLOCK_REGISTRY[block.type]

        if (!Component) {
          if (process.env.NODE_ENV !== "production") {
            return (
              <BlockShell
                key={block.data.id}
                kind={block.type || "Unknown"}
                mode="error"
                error={{
                  code: "UNKNOWN_BLOCK",
                  message: `No renderer is registered for block type "${block.type}".`,
                  hint: "Add it to BLOCK_REGISTRY or remove the block.",
                }}
              >
                {null}
              </BlockShell>
            )
          }
          return null
        }

        return <Component key={block.data.id} data={block.data} mode="render" />
      })}
    </>
  )
}
