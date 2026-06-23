"use client"

import { useMemo, useState } from "react"

import {
  BulkActionBar,
  FileGridView,
  FileListView,
  FilePreviewPane,
  FileTree,
  FolderBreadcrumb,
  UploadDropZone,
  type FileItem,
} from "../../components/file-browser"

import {
  DEMO_BREADCRUMB,
  DEMO_FILES,
  DEMO_TREE,
  DEMO_UPLOADS,
} from "../demo-data"
import styles from "../file-browser.module.css"

type ViewMode = "grid" | "list"

export function FullExplorerDemo() {
  const [view, setView] = useState<ViewMode>("grid")
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(
    new Set([DEMO_FILES[0].id]),
  )

  const selected = useMemo<FileItem | null>(() => {
    if (selectedIds.size === 0) return null
    const id = Array.from(selectedIds)[selectedIds.size - 1]
    return DEMO_FILES.find((f) => f.id === id) ?? null
  }, [selectedIds])

  return (
    <section className={styles.explorer}>
      <header className={styles.explorerHeader}>
        <FolderBreadcrumb segments={DEMO_BREADCRUMB} />
        <div className={styles.explorerToggle} role="group" aria-label="View mode">
          <button
            type="button"
            aria-pressed={view === "grid"}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </header>

      <div className={styles.explorerTree}>
        <FileTree
          nodes={DEMO_TREE}
          defaultExpanded={["root", "fleet", "fleet-photos"]}
          activeId="f-1"
        />
      </div>

      <div className={styles.explorerMain}>
        {view === "grid" ? (
          <FileGridView
            files={DEMO_FILES}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
          />
        ) : (
          <FileListView
            files={DEMO_FILES}
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            caption="Workshop assets"
          />
        )}
      </div>

      <div className={styles.explorerPreview}>
        <FilePreviewPane file={selected} />
      </div>

      <div className={styles.explorerFooter}>
        <UploadDropZone entries={DEMO_UPLOADS} />
      </div>

      <BulkActionBar
        count={selectedIds.size}
        onClear={() => setSelectedIds(new Set())}
      />
    </section>
  )
}
