import type { ReactNode } from "react"

import { FormCanvas } from "../form-builder/form-canvas"
import type { DropTargetState } from "../form-builder/form-canvas"
import type { FormBuilderField } from "../form-builder/form-builder-types"

import type { EmailBlock, EmailBlockKind } from "./email-builder-types"
import styles from "./email-canvas.module.css"

interface EmailCanvasProps {
  /** Subject line shown at the top of the canvas chrome. */
  subject: string
  /** Preheader / summary line beneath the subject. */
  preheader?: string
  /** Sender label e.g. "Oak Flats Mufflermen <hello@mufflermen.com.au>". */
  fromLine: string
  /** Block rows rendered as draggable cards (constrained to 600px). */
  blocks: ReadonlyArray<EmailBlock>
  /** Id of the currently selected block. */
  selectedBlockId?: string
  /** Visual state for the in-between drop zones. */
  dropTargetState?: DropTargetState
  /** Optional empty state slot. */
  empty?: ReactNode
  className?: string
}

const BLOCK_TYPE_BY_KIND: Record<EmailBlockKind, FormBuilderField["type"]> = {
  heading: "short-text",
  image: "file-upload",
  button: "yes-no",
  divider: "rating",
  "columns-2": "dropdown",
  "columns-3": "multi-select",
  "social-row": "address",
  spacer: "number",
  footer: "long-text",
  html: "signature",
  personalization: "email",
}

const BLOCK_LABEL_BY_KIND: Record<EmailBlockKind, string> = {
  heading: "Heading",
  image: "Hero image",
  button: "Button",
  divider: "Divider",
  "columns-2": "Two columns",
  "columns-3": "Three columns",
  "social-row": "Social row",
  spacer: "Spacer",
  footer: "Footer",
  html: "Custom HTML",
  personalization: "Personalisation token",
}

/**
 * Maps an EmailBlock into a FormBuilderField shape so we can compose the
 * existing FormCanvas chrome for the drag-design surface. The mapping is
 * stable: the same kind always lands on the same icon glyph.
 */
function toFormField(block: EmailBlock): FormBuilderField {
  return {
    id: block.id,
    type: BLOCK_TYPE_BY_KIND[block.kind],
    label: block.label,
    placeholder: block.preview,
  }
}

export function EmailCanvas({
  subject,
  preheader,
  fromLine,
  blocks,
  selectedBlockId,
  dropTargetState = "idle",
  empty,
  className,
}: EmailCanvasProps) {
  const classes = [styles.shell, className].filter(Boolean).join(" ")
  const fields = blocks.map(toFormField)
  const meta = preheader ? `${fromLine} · ${preheader}` : fromLine

  return (
    <section
      className={classes}
      role="application"
      aria-roledescription="email builder canvas"
      aria-label={`${subject} email canvas`}
    >
      <header className={styles.chrome}>
        <span className={styles.kicker}>Email canvas · 600px column</span>
        <div className={styles.chromeRow}>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.address}>{fromLine}</span>
        </div>
      </header>

      <div className={styles.column}>
        <FormCanvas
          formTitle={subject}
          formMeta={meta}
          fields={fields}
          selectedFieldId={selectedBlockId}
          dropTargetState={dropTargetState}
          empty={empty}
        />
      </div>

      <footer className={styles.legend} aria-hidden="true">
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="block" />
          Block
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="drop" />
          Drop zone
        </span>
        <span className={styles.legendItem}>
          <span className={styles.legendSwatch} data-tone="selected" />
          Selected
        </span>
        {Object.keys(BLOCK_LABEL_BY_KIND).length > 0 ? null : null}
      </footer>
    </section>
  )
}
