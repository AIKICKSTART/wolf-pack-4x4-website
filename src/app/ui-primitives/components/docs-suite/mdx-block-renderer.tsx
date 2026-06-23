"use client"

import { useId, useState } from "react"

import type {
  MdxBlock,
  MdxCodeBlock,
  MdxDiffBlock,
  MdxNoteBlock,
  MdxProseBlock,
  MdxTabsBlock,
  MdxWarningBlock,
} from "./docs-suite-types"

import styles from "./mdx-block-renderer.module.css"

interface MdxBlockRendererProps {
  blocks: ReadonlyArray<MdxBlock>
  ariaLabel?: string
}

export function MdxBlockRenderer({ blocks, ariaLabel = "Article content" }: MdxBlockRendererProps) {
  return (
    <div className={styles.stack} role="region" aria-label={ariaLabel}>
      {blocks.map((block) => {
        switch (block.kind) {
          case "prose":
            return <ProseBlock key={block.id} block={block} />
          case "code":
            return <CodeFrame key={block.id} block={block} />
          case "note":
            return <NoteFrame key={block.id} block={block} />
          case "warning":
            return <WarningFrame key={block.id} block={block} />
          case "diff":
            return <DiffFrame key={block.id} block={block} />
          case "tabs":
            return <TabsFrame key={block.id} block={block} />
          default:
            return null
        }
      })}
    </div>
  )
}

function ProseBlock({ block }: { block: MdxProseBlock }) {
  return (
    <div
      id={block.id}
      className={styles.prose}
      dangerouslySetInnerHTML={{ __html: block.html }}
    />
  )
}

function CodeFrame({ block }: { block: MdxCodeBlock }) {
  return (
    <figure id={block.id} className={styles.codeFrame} aria-label={block.filename ?? block.language}>
      <header className={styles.codeHead}>
        <span className={styles.codeFilename}>{block.filename ?? "snippet"}</span>
        <span className={styles.codeLanguage}>{block.language}</span>
      </header>
      <pre className={styles.code}>
        <code>{block.code}</code>
      </pre>
    </figure>
  )
}

function NoteFrame({ block }: { block: MdxNoteBlock }) {
  return (
    <aside id={block.id} className={styles.note} role="note" aria-label={`Note: ${block.title}`}>
      <span className={styles.calloutIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01" strokeLinecap="round" />
          <path d="M11 12h1v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className={styles.calloutBody}>
        <h4 className={styles.calloutTitle}>{block.title}</h4>
        <p className={styles.calloutText}>{block.body}</p>
      </div>
    </aside>
  )
}

function WarningFrame({ block }: { block: MdxWarningBlock }) {
  return (
    <aside
      id={block.id}
      className={styles.warning}
      role="note"
      aria-label={`Warning: ${block.title}`}
    >
      <span className={styles.calloutIcon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m12 4 9 16H3z" strokeLinejoin="round" />
          <path d="M12 10v4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
      </span>
      <div className={styles.calloutBody}>
        <h4 className={styles.calloutTitle}>{block.title}</h4>
        <p className={styles.calloutText}>{block.body}</p>
      </div>
    </aside>
  )
}

function DiffFrame({ block }: { block: MdxDiffBlock }) {
  return (
    <figure id={block.id} className={styles.diffFrame} aria-label={`Diff for ${block.filename}`}>
      <header className={styles.diffHead}>{block.filename}</header>
      <pre className={styles.diffBody}>
        {block.lines.map((line, index) => {
          const sign = line.type === "added" ? "+" : line.type === "removed" ? "-" : " "
          const classes = [
            styles.diffLine,
            line.type === "added" ? styles.diffAdded : "",
            line.type === "removed" ? styles.diffRemoved : "",
          ]
            .filter(Boolean)
            .join(" ")
          return (
            <span key={`diff-${index}`} className={classes}>
              <span className={styles.diffSign} aria-hidden="true">
                {sign}
              </span>
              <span className={styles.diffText}>{line.text}</span>
            </span>
          )
        })}
      </pre>
    </figure>
  )
}

function TabsFrame({ block }: { block: MdxTabsBlock }) {
  const initial = block.tabs[0]?.id ?? ""
  const [active, setActive] = useState<string>(initial)
  const groupId = useId()
  const current = block.tabs.find((tab) => tab.id === active) ?? block.tabs[0]

  if (!current) {
    return null
  }

  return (
    <div id={block.id} className={styles.tabsFrame}>
      <ul className={styles.tabList} role="tablist" aria-label="Code variants">
        {block.tabs.map((tab) => {
          const isActive = tab.id === active
          return (
            <li key={tab.id} role="presentation">
              <button
                type="button"
                id={`${groupId}-tab-${tab.id}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${groupId}-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                className={[styles.tabBtn, isActive ? styles.tabBtnActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => setActive(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          )
        })}
      </ul>
      <div
        id={`${groupId}-panel-${current.id}`}
        role="tabpanel"
        aria-labelledby={`${groupId}-tab-${current.id}`}
        className={styles.tabPanel}
      >
        <header className={styles.codeHead}>
          <span className={styles.codeFilename}>{current.label}</span>
          <span className={styles.codeLanguage}>{current.language}</span>
        </header>
        <pre className={styles.code}>
          <code>{current.code}</code>
        </pre>
      </div>
    </div>
  )
}

export default MdxBlockRenderer
