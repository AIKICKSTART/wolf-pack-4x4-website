"use client"

import { Braces, Code, FileCode } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  CodeSandboxPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

type Pane = CodeSandboxPayload["activePane"]

const PANE_LABEL: Record<Pane, string> = {
  html: "HTML",
  css: "CSS",
  javascript: "JavaScript",
}

const PANE_ICON: Record<Pane, typeof Code> = {
  html: FileCode,
  css: Braces,
  javascript: Code,
}

type CodeSandboxBlockProps = BlockPrimitiveProps<CodeSandboxPayload>

export function CodeSandboxBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: CodeSandboxBlockProps) {
  const labelId = useId()
  const { html, css, javascript, activePane, previewLabel } = data.payload

  const update = (next: Partial<CodeSandboxPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<CodeSandboxPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const panes: ReadonlyArray<{ id: Pane; source: string }> = [
    { id: "html", source: html },
    { id: "css", source: css },
    { id: "javascript", source: javascript },
  ]

  const toolbar = (
    <>
      {panes.map((pane) => {
        const Icon = PANE_ICON[pane.id]
        return (
          <button
            key={pane.id}
            type="button"
            className={`${styles.toolbarBtn} ${
              activePane === pane.id ? styles.toolbarBtnActive : ""
            }`}
            aria-pressed={activePane === pane.id}
            onClick={() => update({ activePane: pane.id })}
          >
            <Icon size={12} aria-hidden="true" />
            {PANE_LABEL[pane.id]}
          </button>
        )
      })}
    </>
  )

  return (
    <BlockShell
      kind="Code sandbox"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={labelId}
    >
      <span className={styles.toolbarLabel} id={labelId}>
        Live HTML / CSS / JS playground
      </span>
      <div className={styles.sandboxGrid}>
        <div className={styles.sandboxPanes}>
          {panes.map((pane) => {
            const Icon = PANE_ICON[pane.id]
            return (
              <article
                key={pane.id}
                className={`${styles.sandboxPane} ${
                  activePane === pane.id ? styles.sandboxPaneActive : ""
                }`}
                aria-current={activePane === pane.id ? "true" : undefined}
              >
                <header className={styles.sandboxPaneHead}>
                  <span>
                    <Icon size={11} aria-hidden="true" /> {PANE_LABEL[pane.id]}
                  </span>
                  <span>{pane.source.split("\n").length} lines</span>
                </header>
                <pre
                  className={styles.sandboxPaneBody}
                  contentEditable={mode === "edit" && activePane === pane.id}
                  suppressContentEditableWarning
                  onInput={
                    mode === "edit" && activePane === pane.id
                      ? (event) =>
                          update({
                            [pane.id]: event.currentTarget.textContent ?? "",
                          } as Partial<CodeSandboxPayload>)
                      : undefined
                  }
                  role={mode === "edit" && activePane === pane.id ? "textbox" : undefined}
                  aria-multiline="true"
                  aria-label={`${PANE_LABEL[pane.id]} source`}
                  spellCheck={false}
                >
                  {pane.source}
                </pre>
              </article>
            )
          })}
        </div>
        <div className={styles.sandboxPreview} role="region" aria-label="Preview pane">
          <span className={styles.sandboxPreviewLabel}>Preview · {previewLabel}</span>
          <strong className={styles.sandboxPreviewTitle}>Oak Flats Mufflermen</strong>
          <p className={styles.sandboxPreviewCopy}>
            Live demo wires up <code>{`<h1>`}</code> + style + ES module bundle. The
            preview pane here is mocked — the real CMS pipes the iframe sandbox.
          </p>
          <button type="button" className={styles.sandboxPreviewCta}>
            Book a service
          </button>
        </div>
      </div>
    </BlockShell>
  )
}

export function CodeSandboxBlockEdit(props: CodeSandboxBlockProps) {
  return <CodeSandboxBlock {...props} mode="edit" />
}
