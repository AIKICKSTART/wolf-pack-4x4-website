"use client"

import { Copy, Eye, EyeOff, SlidersHorizontal, Trash2 } from "lucide-react"

import type { Block, BlockManifest, PropValue } from "../model"
import styles from "./canvas.module.css"
import { FieldControl } from "./field-control"

interface InspectorProps {
  block: Block | null
  manifest: BlockManifest | undefined
  onEditProp: (key: string, value: PropValue) => void
  onRename: (name: string) => void
  onToggleVisibility: () => void
  onDuplicate: () => void
  onDelete: () => void
}

// Lucide writes `size` to the SVG width/height *attribute*, which rejects
// `var()`. Sizing via `style` lets the central `--primitive-icon-*` tokens
// resolve through CSS (which wins over the presentation attribute).
const ICON_STYLE = {
  width: "var(--primitive-icon-sm)",
  height: "var(--primitive-icon-sm)",
  strokeWidth: "var(--primitive-icon-stroke)",
}
const ICON_STYLE_LG = {
  width: "var(--primitive-icon-lg)",
  height: "var(--primitive-icon-lg)",
  strokeWidth: "var(--primitive-icon-stroke)",
}

/**
 * The properties inspector for the selected block: rename, edit the manifest's
 * curated editable fields, and quick actions (hide/show, duplicate, delete).
 * When nothing is selected it shows guidance.
 */
export function Inspector({
  block,
  manifest,
  onEditProp,
  onRename,
  onToggleVisibility,
  onDuplicate,
  onDelete,
}: InspectorProps) {
  if (!block) {
    return (
      <aside className={styles.inspector} aria-label="Properties inspector">
        <div className={styles.inspectorEmpty}>
          <SlidersHorizontal style={ICON_STYLE_LG} aria-hidden />
          <p className={styles.inspectorEmptyTitle}>Nothing selected</p>
          <p className={styles.inspectorEmptyBody}>
            Select a block on the canvas to edit its content and properties.
          </p>
        </div>
      </aside>
    )
  }

  const fields = manifest?.editableFields ?? []

  return (
    <aside className={styles.inspector} aria-label={`Properties for ${block.name}`}>
      <div className={styles.inspectorHead}>
        <h2 className={styles.panelTitle}>Properties</h2>
        <p className={styles.inspectorType}>{block.type}</p>
      </div>

      <div className={styles.inspectorScroll}>
        <div className={styles.field}>
          <label className={styles.fieldLabel} htmlFor="inspector-name">
            Block name
          </label>
          <input
            id="inspector-name"
            type="text"
            className={styles.fieldInput}
            value={block.name}
            onChange={(event) => onRename(event.target.value)}
          />
        </div>

        {fields.length > 0 ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Content</legend>
            {fields.map((field) => (
              <FieldControl
                key={field.path}
                field={field}
                value={block.props[field.path]}
                onChange={(value) => onEditProp(field.path, value)}
              />
            ))}
          </fieldset>
        ) : (
          <p className={styles.emptyHint}>This block has no editable fields.</p>
        )}

        {manifest && manifest.tokenDependencies.length > 0 ? (
          <fieldset className={styles.fieldset}>
            <legend className={styles.legend}>Design tokens</legend>
            <ul className={styles.tokenList}>
              {manifest.tokenDependencies.map((dep) => (
                <li key={dep.token} className={styles.tokenItem}>
                  <code className={styles.tokenName}>{dep.token}</code>
                  <span className={styles.tokenUsage}>{dep.usage}</span>
                </li>
              ))}
            </ul>
          </fieldset>
        ) : null}
      </div>

      <div className={styles.inspectorActions}>
        <button type="button" className={styles.ghostBtn} onClick={onToggleVisibility}>
          {block.hidden ? (
            <EyeOff style={ICON_STYLE} aria-hidden />
          ) : (
            <Eye style={ICON_STYLE} aria-hidden />
          )}
          {block.hidden ? "Show" : "Hide"}
        </button>
        <button type="button" className={styles.ghostBtn} onClick={onDuplicate}>
          <Copy style={ICON_STYLE} aria-hidden />
          Duplicate
        </button>
        <button type="button" className={`${styles.ghostBtn} ${styles.ghostBtnDanger}`} onClick={onDelete}>
          <Trash2 style={ICON_STYLE} aria-hidden />
          Delete
        </button>
      </div>
    </aside>
  )
}
