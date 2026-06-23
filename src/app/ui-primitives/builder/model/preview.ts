/**
 * Preview + documentation descriptors for a block.
 *
 * `previewConfig` tells the builder how to render a block in the palette/canvas
 * preview without committing real content. The documentation fields
 * (`codeExample`, `setupInstructions`) power the per-primitive docs surface.
 */

import type { Breakpoint } from "./rules"
import type { PropsRecord } from "./schema"

/** How a block previews in the palette and on the canvas. */
export interface PreviewConfig {
  /** Props used to render the preview/thumbnail. */
  sampleProps: PropsRecord
  /** Aspect ratio hint for the thumbnail, e.g. "16/9", "1/1". */
  aspectRatio?: string
  /** Surface tone to preview against. */
  background?: "canvas" | "panel" | "media"
  /** Breakpoint the thumbnail is captured at. */
  thumbnailBreakpoint?: Breakpoint
  /** Whether motion plays in the preview (off by default to respect a11y). */
  animate?: boolean
}

/** A single runnable code example for the docs surface. */
export interface CodeExample {
  /** e.g. "tsx", "css". */
  language: string
  /** The import + usage snippet. */
  code: string
  /** What the example demonstrates. */
  caption?: string
}

/** Step-by-step setup notes shown in the docs surface. */
export interface SetupInstructions {
  /** Ordered human-readable steps. */
  steps: readonly string[]
  /** Required peer blocks/providers, by block type. */
  requires?: readonly string[]
  /** Optional caveats / gotchas. */
  notes?: readonly string[]
}
