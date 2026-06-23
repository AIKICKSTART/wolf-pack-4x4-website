"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from "react"

import {
  deserializePageConfig,
  serializePageConfig,
  type BlockManifest,
  type PageConfig,
} from "../model"
import { ThemeProvider } from "../theme"
import { BlockPalette } from "./block-palette"
import { CanvasSurface } from "./canvas-surface"
import { ConfirmDialog } from "./confirm-dialog"
import { Inspector } from "./inspector"
import { PreviewFrame } from "./preview-frame"
import { saveDraft } from "./storage"
import { Toolbar } from "./toolbar"
import { createStarterPage, useBuilder } from "./use-builder"
import {
  type ConfirmRequest,
  type PreviewScheme,
  type PreviewWidth,
} from "./types"
import styles from "./canvas.module.css"

interface BuilderCanvasProps {
  /** Palette manifests. */
  manifests: readonly BlockManifest[]
  /** Initial page (defaults to a fresh starter page or a loaded draft). */
  initialPage?: PageConfig
}

/** Triggers a client-side download of the page as pretty JSON. */
function downloadJson(page: PageConfig): void {
  const blob = new Blob([serializePageConfig(page, true)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `${page.meta.slug || "page"}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}

/**
 * The full drag-and-drop CMS builder: palette + canvas + inspector, an undo/redo
 * history, draft persistence, JSON export/import, light/dark + responsive
 * preview, style-profile switching (via ThemeProvider), and a gated
 * publish-request flow that opens an approval dialog and never publishes.
 */
export function BuilderCanvas({ manifests, initialPage }: BuilderCanvasProps) {
  const start = useMemo(() => initialPage ?? createStarterPage(), [initialPage])
  const builder = useBuilder(start)

  const [previewMode, setPreviewMode] = useState(false)
  const [previewWidth, setPreviewWidth] = useState<PreviewWidth>("desktop")
  const [previewScheme, setPreviewScheme] = useState<PreviewScheme>("dark")
  const [confirm, setConfirm] = useState<ConfirmRequest | null>(null)
  // The page reference last written to localStorage. `saved` is derived from it,
  // so editing again (a new page ref) automatically reads as unsaved — no effect.
  const [savedPage, setSavedPage] = useState<PageConfig | null>(null)
  const [importError, setImportError] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)
  const [statusMessage, setStatusMessage] = useState("")

  const saved = savedPage === builder.page

  const manifestByType = useMemo(() => {
    const map = new Map<string, BlockManifest>()
    for (const m of manifests) map.set(m.type, m)
    return map
  }, [manifests])

  const selectedBlock = useMemo(
    () => builder.page.blocks.find((b) => b.id === builder.selectedId) ?? null,
    [builder.page.blocks, builder.selectedId],
  )

  // — Drag-and-drop handlers ————————————————————————————————
  const handleDropPalette = useCallback(
    (manifestType: string, index: number) => {
      const manifest = manifestByType.get(manifestType)
      if (manifest) builder.addBlock(manifest, index)
      setDragging(false)
    },
    [manifestByType, builder],
  )

  const handleAddToEnd = useCallback(
    (manifest: BlockManifest) => builder.addBlock(manifest, builder.page.blocks.length),
    [builder],
  )

  const handleReorder = useCallback(
    (blockId: string, index: number) => builder.reorder(blockId, index),
    [builder],
  )

  const handleMoveByKeyboard = useCallback(
    (id: string, direction: -1 | 1) => {
      const from = builder.page.blocks.findIndex((b) => b.id === id)
      if (from === -1) return
      builder.reorder(id, from + direction)
    },
    [builder],
  )

  // — Save / export / import ————————————————————————————————
  const handleSaveDraft = useCallback(() => {
    const ok = saveDraft(builder.page)
    if (ok) setSavedPage(builder.page)
    setStatusMessage(ok ? "Draft saved to this browser." : "Could not save the draft.")
  }, [builder.page])

  const handleExport = useCallback(() => {
    downloadJson(builder.page)
    setStatusMessage("Page exported as JSON.")
  }, [builder.page])

  const handleImport = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      event.target.value = ""
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        const text = typeof reader.result === "string" ? reader.result : ""
        const result = deserializePageConfig(text)
        if (result.ok) {
          builder.replacePage(result.page)
          setImportError(null)
          setStatusMessage("Page imported.")
        } else {
          setImportError(result.error)
          setStatusMessage(`Import failed: ${result.error}`)
        }
      }
      reader.readAsText(file)
    },
    [builder],
  )

  // — Keyboard shortcuts ————————————————————————————————————
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT"
      if (typing) return
      const mod = event.ctrlKey || event.metaKey
      if (mod && event.key.toLowerCase() === "z" && !event.shiftKey) {
        event.preventDefault()
        builder.undo()
      } else if (mod && (event.key.toLowerCase() === "y" || (event.key.toLowerCase() === "z" && event.shiftKey))) {
        event.preventDefault()
        builder.redo()
      } else if ((event.key === "Delete" || event.key === "Backspace") && builder.selectedId) {
        event.preventDefault()
        setConfirm({ kind: "delete", blockId: builder.selectedId })
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [builder])

  // — Confirm flows —————————————————————————————————————————
  function confirmAccepted(): void {
    if (!confirm) return
    if (confirm.kind === "delete" && confirm.blockId) {
      builder.remove(confirm.blockId)
      setStatusMessage("Block deleted.")
    } else if (confirm.kind === "publish") {
      builder.requestPublish()
      setStatusMessage("Publish request submitted for approval. The page was not published.")
    }
    setConfirm(null)
  }

  return (
    // One isolated ThemeProvider wraps the whole builder so the toolbar's profile
    // picker and the preview canvas share one profile. `disablePersistence` keeps
    // it from driving the document colour scheme or clobbering the app-wide saved profile.
    <ThemeProvider className={styles.builder} disablePersistence>
      <Toolbar
        canUndo={builder.canUndo}
        canRedo={builder.canRedo}
        previewMode={previewMode}
        previewWidth={previewWidth}
        previewScheme={previewScheme}
        saved={saved}
        onUndo={builder.undo}
        onRedo={builder.redo}
        onTogglePreview={() => setPreviewMode((current) => !current)}
        onSetWidth={setPreviewWidth}
        onSetScheme={setPreviewScheme}
        onSaveDraft={handleSaveDraft}
        onExport={handleExport}
        onImport={handleImport}
        onRequestPublish={() => setConfirm({ kind: "publish" })}
      />

      {importError ? (
        <p className={styles.errorBanner} role="alert">
          Import failed: {importError}
        </p>
      ) : null}

      <div className={previewMode ? styles.workspacePreview : styles.workspace}>
        {!previewMode ? (
          <BlockPalette
            manifests={manifests}
            onAdd={handleAddToEnd}
            onDragManifest={(type) => setDragging(type !== null)}
          />
        ) : null}

        <main className={styles.stage} aria-label="Builder stage">
          <PreviewFrame width={previewMode ? previewWidth : "full"}>
            <CanvasSurface
              blocks={builder.page.blocks}
              selectedId={previewMode ? null : builder.selectedId}
              dragging={dragging}
              onSelect={previewMode ? () => {} : builder.select}
              onDropPalette={handleDropPalette}
              onReorder={handleReorder}
              onDragStartBlock={() => setDragging(true)}
              onDragEndBlock={() => setDragging(false)}
              onDuplicate={builder.duplicate}
              onToggleVisibility={builder.toggleVisibility}
              onDelete={(id) => setConfirm({ kind: "delete", blockId: id })}
              onMoveByKeyboard={handleMoveByKeyboard}
            />
          </PreviewFrame>
        </main>

        {!previewMode ? (
          <Inspector
            block={selectedBlock}
            manifest={selectedBlock ? manifestByType.get(selectedBlock.type) : undefined}
            onEditProp={(key, value) => {
              if (builder.selectedId) builder.editProp(builder.selectedId, key, value)
            }}
            onRename={(name) => {
              if (builder.selectedId) builder.rename(builder.selectedId, name)
            }}
            onToggleVisibility={() => {
              if (builder.selectedId) builder.toggleVisibility(builder.selectedId)
            }}
            onDuplicate={() => {
              if (builder.selectedId) builder.duplicate(builder.selectedId)
            }}
            onDelete={() => {
              if (builder.selectedId) setConfirm({ kind: "delete", blockId: builder.selectedId })
            }}
          />
        ) : null}
      </div>

      <ConfirmDialog
        open={confirm?.kind === "delete"}
        title="Delete this block?"
        confirmLabel="Delete block"
        destructive
        onConfirm={confirmAccepted}
        onCancel={() => setConfirm(null)}
      >
        This removes the block from the page. You can undo it afterwards.
      </ConfirmDialog>

      <ConfirmDialog
        open={confirm?.kind === "publish"}
        title="Request publish — approval required"
        confirmLabel="Submit for approval"
        onConfirm={confirmAccepted}
        onCancel={() => setConfirm(null)}
      >
        Publishing is gated. This sends the page for review; it is <strong>not</strong> published
        directly. An approver completes the publish in the CMS workflow.
      </ConfirmDialog>

      <p className={styles.srStatus} role="status" aria-live="polite">
        {statusMessage}
      </p>
    </ThemeProvider>
  )
}
