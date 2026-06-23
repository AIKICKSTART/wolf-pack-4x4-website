"use client"

import { Bold, Code2, Italic, Link2, List, Quote, Type } from "lucide-react"
import { useId, useState } from "react"

import { GlassSurface } from "../surfaces"

import {
  BLOCK_KIND_GLYPH,
  BLOCK_KIND_LABEL,
  type EditorBlock,
} from "./content-studio-types"
import styles from "./long-form-editor.module.css"

interface LongFormEditorProps {
  blocks: ReadonlyArray<EditorBlock>
  /** ID of the block whose floating toolbar should be visible. */
  focusedBlockId?: string
  /** Article title displayed above the canvas. */
  title?: string
  /** Active byline shown above the canvas. */
  byline?: string
  /** Whether the floating toolbar should be visible. */
  showToolbar?: boolean
  className?: string
}

const TOOLBAR_BUTTONS: ReadonlyArray<{
  id: string
  label: string
  // Inline lucide icons rendered as small mono SVGs.
  icon: typeof Bold
}> = [
  { id: "bold", label: "Bold", icon: Bold },
  { id: "italic", label: "Italic", icon: Italic },
  { id: "h2", label: "Heading 2", icon: Type },
  { id: "list", label: "Bullet list", icon: List },
  { id: "quote", label: "Pull quote", icon: Quote },
  { id: "link", label: "Insert link", icon: Link2 },
  { id: "code", label: "Inline code", icon: Code2 },
]

function ToolbarButton({
  id,
  label,
  icon: Icon,
  active,
  onPick,
}: {
  id: string
  label: string
  icon: typeof Bold
  active?: boolean
  onPick: (id: string) => void
}) {
  return (
    <button
      type="button"
      className={[styles.toolBtn, active ? styles.toolBtnActive : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label={label}
      aria-pressed={active}
      onClick={() => onPick(id)}
    >
      <Icon size={14} strokeWidth={2.4} aria-hidden="true" />
    </button>
  )
}

function BlockHeading({ level = 2, text }: { level?: 1 | 2 | 3 | 4; text?: string }) {
  const content = text ?? ""
  if (level === 1) {
    return <h1 className={styles.h1}>{content}</h1>
  }
  if (level === 2) {
    return <h2 className={styles.h2}>{content}</h2>
  }
  if (level === 3) {
    return <h3 className={styles.h3}>{content}</h3>
  }
  return <h4 className={styles.h4}>{content}</h4>
}

function BlockBody({ block }: { block: EditorBlock }) {
  switch (block.kind) {
    case "heading":
      return <BlockHeading level={block.level} text={block.text} />
    case "paragraph":
      return <p className={styles.paragraph}>{block.text}</p>
    case "list":
      return (
        <ul className={styles.list}>
          {(block.items ?? []).map((item, idx) => (
            <li key={`${block.id}-li-${idx}`}>{item}</li>
          ))}
        </ul>
      )
    case "quote":
      return (
        <blockquote className={styles.quote}>
          <p>{block.text}</p>
          {block.attribution ? <cite>— {block.attribution}</cite> : null}
        </blockquote>
      )
    case "embed":
      return (
        <div className={styles.embed} role="figure" aria-label={`Embed: ${block.url ?? ""}`}>
          <span className={styles.embedTag}>EMBED</span>
          <span className={styles.embedUrl}>{block.url ?? "—"}</span>
        </div>
      )
    case "code":
      return (
        <pre className={styles.code} aria-label={`Code (${block.language ?? "plain"})`}>
          <code>{block.code ?? ""}</code>
        </pre>
      )
    case "media":
      return (
        <figure className={styles.media}>
          <div className={styles.mediaFrame} aria-hidden="true">
            <span>{BLOCK_KIND_GLYPH.media}</span>
            <em>{block.mediaKind ?? "image"}</em>
          </div>
          {block.caption ? <figcaption>{block.caption}</figcaption> : null}
        </figure>
      )
    case "divider":
      return <hr className={styles.divider} aria-hidden="true" />
    default:
      return null
  }
}

export function LongFormEditor({
  blocks,
  focusedBlockId,
  title = "Untitled draft",
  byline = "Daniel Fleuren · Mia Pellegrino",
  showToolbar = true,
  className,
}: LongFormEditorProps) {
  const editorId = useId()
  const [activeFormat, setActiveFormat] = useState<string | null>("h2")
  const classes = [styles.editor, className].filter(Boolean).join(" ")
  const focused =
    focusedBlockId ?? blocks.find((block) => block.focused)?.id ?? blocks[0]?.id

  return (
    <GlassSurface tone="obsidian" intensity="med" className={classes}>
      <div className={styles.shell}>
        <header className={styles.head}>
          <span className={styles.kicker}>Draft · auto-save 09:32</span>
          <h2 className={styles.docTitle}>{title}</h2>
          <span className={styles.byline}>{byline}</span>
        </header>

        <div
          className={styles.canvas}
          role="textbox"
          aria-multiline="true"
          aria-label="Article body"
          aria-readonly="true"
          tabIndex={0}
          id={editorId}
        >
          {blocks.map((block) => {
            const isFocused = block.id === focused
            return (
              <div
                key={block.id}
                className={[
                  styles.block,
                  styles[`block_${block.kind}`] ?? "",
                  isFocused ? styles.blockFocused : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-label={`Block ${BLOCK_KIND_LABEL[block.kind]}`}
                data-block-kind={block.kind}
              >
                <span className={styles.blockGutter} aria-hidden="true">
                  <span className={styles.blockGlyph}>
                    {BLOCK_KIND_GLYPH[block.kind]}
                  </span>
                </span>
                <div className={styles.blockBody}>
                  <BlockBody block={block} />
                </div>
                {isFocused && showToolbar ? (
                  <div
                    className={styles.toolbar}
                    role="toolbar"
                    aria-label="Formatting toolbar"
                  >
                    {TOOLBAR_BUTTONS.map((btn) => (
                      <ToolbarButton
                        key={btn.id}
                        id={btn.id}
                        label={btn.label}
                        icon={btn.icon}
                        active={btn.id === activeFormat}
                        onPick={(id) =>
                          setActiveFormat((current) => (current === id ? null : id))
                        }
                      />
                    ))}
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </GlassSurface>
  )
}

export default LongFormEditor
