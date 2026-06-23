"use client"

// NOTE (dev-only): mirrors the hermes-web-ui file browser. Customer-facing
// identity here is "Torque" — no Hermes string ships to the owner.

import { LayoutGrid, List as ListIcon, UploadCloud } from "lucide-react"
import { useCallback, useMemo, useState } from "react"

import {
  BulkActionBar,
  FileGridView,
  FileListView,
  FilePreviewPane,
  FileTree,
  FolderBreadcrumb,
  UploadDropZone,
  VersionHistory,
} from "../../components/file-browser"
import type {
  BulkActionId,
  FileItem,
  TreeNode,
} from "../../components/file-browser"
import { ConfirmDialog } from "../../components/overlays/confirm-dialog"

import {
  BREADCRUMB_SEGMENTS,
  DEFAULT_EXPANDED,
  FILES,
  FOLDER_TREE,
  UPLOADS,
  VERSIONS,
} from "./_demo-data"
import styles from "./file-browser.module.css"

type ViewMode = "list" | "grid"

interface PendingDelete {
  ids: ReadonlySet<string>
  /** A label for the confirm copy — single file name or "N files". */
  label: string
}

function deleteLabel(ids: ReadonlySet<string>, files: ReadonlyArray<FileItem>): string {
  if (ids.size === 1) {
    const [only] = [...ids]
    return files.find((f) => f.id === only)?.name ?? "1 file"
  }
  return `${ids.size} files`
}

export function FileBrowserScene() {
  const [view, setView] = useState<ViewMode>("list")
  const [activeTreeId, setActiveTreeId] = useState<string>("fitment-photos")
  const [selection, setSelection] = useState<ReadonlySet<string>>(
    new Set(["hilux-redback-fitted"]),
  )
  const [previewId, setPreviewId] = useState<string>("hilux-redback-fitted")
  const [files, setFiles] = useState<ReadonlyArray<FileItem>>(FILES)
  const [pendingDelete, setPendingDelete] = useState<PendingDelete | null>(null)
  const [deleting, setDeleting] = useState<boolean>(false)

  const previewFile = useMemo(
    () => files.find((f) => f.id === previewId) ?? null,
    [files, previewId],
  )

  const handleTreeSelect = useCallback((node: TreeNode) => {
    setActiveTreeId(node.id)
  }, [])

  const handleSelectionChange = useCallback((ids: ReadonlySet<string>) => {
    setSelection(ids)
    if (ids.size === 1) {
      const [only] = [...ids]
      setPreviewId(only)
    }
  }, [])

  const requestDelete = useCallback(
    (ids: ReadonlySet<string>) => {
      if (ids.size === 0) return
      setPendingDelete({ ids, label: deleteLabel(ids, files) })
    },
    [files],
  )

  const handleBulkAction = useCallback(
    (action: BulkActionId) => {
      if (action === "delete") {
        requestDelete(selection)
      }
    },
    [requestDelete, selection],
  )

  const confirmDelete = useCallback(() => {
    if (!pendingDelete) return
    setDeleting(true)
    // Demo-only: mutate the local snapshot, no network call.
    const removed = pendingDelete.ids
    setFiles((current) => current.filter((f) => !removed.has(f.id)))
    setSelection((current) => {
      const next = new Set(current)
      for (const id of removed) next.delete(id)
      return next
    })
    if (removed.has(previewId)) setPreviewId("")
    setDeleting(false)
    setPendingDelete(null)
  }, [pendingDelete, previewId])

  return (
    <div className={styles.scene}>
      <header className={styles.bar}>
        <span className={styles.avatar} aria-hidden="true">
          <span className={styles.avatarInitial}>T</span>
        </span>
        <div className={styles.barText}>
          <span className={styles.kicker}>Torque · Asset library</span>
          <h2 className={styles.barTitle}>Workshop assets / Fitment photos</h2>
        </div>
        <div className={styles.barTools}>
          <span className={styles.fileCount}>
            <span className={styles.fileCountNum}>{files.length}</span> items
          </span>
          <div
            className={styles.viewToggle}
            role="group"
            aria-label="View mode"
          >
            <button
              type="button"
              className={styles.viewBtn}
              data-active={view === "list"}
              aria-pressed={view === "list"}
              onClick={() => setView("list")}
            >
              <ListIcon size={14} strokeWidth={2.2} aria-hidden="true" />
              List
            </button>
            <button
              type="button"
              className={styles.viewBtn}
              data-active={view === "grid"}
              aria-pressed={view === "grid"}
              onClick={() => setView("grid")}
            >
              <LayoutGrid size={14} strokeWidth={2.2} aria-hidden="true" />
              Grid
            </button>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        <nav className={styles.treeCol} aria-label="Asset folders">
          <span className={styles.colLabel}>Folders</span>
          <FileTree
            nodes={FOLDER_TREE}
            defaultExpanded={DEFAULT_EXPANDED}
            activeId={activeTreeId}
            onSelect={handleTreeSelect}
          />
        </nav>

        <section className={styles.mainCol} aria-label="Files">
          <FolderBreadcrumb
            segments={BREADCRUMB_SEGMENTS}
            className={styles.breadcrumb}
          />

          <div className={styles.fileSurface}>
            {view === "list" ? (
              <FileListView
                files={files}
                selectedIds={selection}
                onSelectionChange={handleSelectionChange}
                onMenuOpen={(file) => setPreviewId(file.id)}
                caption="Fitment photos — Oak Flats Muffler Men"
              />
            ) : (
              <FileGridView
                files={files}
                selectedIds={selection}
                onSelectionChange={handleSelectionChange}
                onMenuOpen={(file) => setPreviewId(file.id)}
              />
            )}
          </div>

          <BulkActionBar
            count={selection.size}
            onAction={handleBulkAction}
            onClear={() => setSelection(new Set())}
            className={styles.bulkBar}
          />
        </section>

        <aside className={styles.sideCol} aria-label="Preview and history">
          <FilePreviewPane
            file={previewFile}
            onDownload={() => undefined}
            onShare={() => undefined}
            onDelete={(file) => requestDelete(new Set([file.id]))}
          />
          {previewFile?.kind === "image" ? (
            <VersionHistory versions={VERSIONS} className={styles.versions} />
          ) : null}
        </aside>
      </div>

      <section className={styles.uploadCol} aria-label="Upload assets">
        <span className={styles.colLabel}>
          <UploadCloud size={13} strokeWidth={2.2} aria-hidden="true" /> Uploads
        </span>
        <UploadDropZone
          entries={UPLOADS}
          onAdd={() => undefined}
          onCancel={() => undefined}
          maxSizeMb={250}
          acceptHint="Fitment photos, dyno clips, CAD, datasheets"
        />
      </section>

      <ConfirmDialog
        open={pendingDelete !== null}
        onOpenChange={(open) => {
          if (!open) setPendingDelete(null)
        }}
        title="Delete from the asset library?"
        description={
          pendingDelete
            ? `${pendingDelete.label} will be removed from the Oak Flats Muffler Men library. Customers can still view any media already published to the live site.`
            : ""
        }
        confirmLabel="Delete"
        cancelLabel="Keep file"
        variant="destructive"
        busy={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  )
}

export default FileBrowserScene
