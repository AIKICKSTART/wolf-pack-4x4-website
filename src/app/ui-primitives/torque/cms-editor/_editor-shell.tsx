"use client"

import { Eye, Redo2, Save, Undo2 } from "lucide-react"
import { useMemo, useState } from "react"

import {
  BlockLibraryPanel,
  PageCanvas,
  PageTree,
  PublishFlow,
  ResponsiveToolbar,
  SlotInspector,
  BLOCK_CATEGORY_LABEL,
  type CanvasBlock,
} from "../../components/cms"

import {
  CANVAS_BLOCKS,
  EDITING_PAGE,
  HERO_INSPECTOR_GROUPS,
  LIBRARY_BLOCKS,
  PAGE_TREE,
} from "./_demo-data"
import styles from "./cms-editor.module.css"

/** Placeholder circular Torque avatar — brand-red gradient, initial "T".
 *  Real mascot art lands later. */
function TorqueAvatar() {
  return (
    <span
      className={styles.torqueAvatar}
      role="img"
      aria-label="Torque, your Mufflermen business assistant"
    >
      <span aria-hidden="true">T</span>
    </span>
  )
}

const TREE_EXPANDED = ["home", "deals", "services", "suburbs"]

export function EditorShell() {
  const [selectedBlockId, setSelectedBlockId] = useState<string>("blk-hero")

  const blocks = useMemo<ReadonlyArray<CanvasBlock>>(
    () =>
      CANVAS_BLOCKS.map((block) => ({
        ...block,
        selected: block.id === selectedBlockId,
      })),
    [selectedBlockId],
  )

  const selectedBlock = useMemo<CanvasBlock>(
    () => blocks.find((block) => block.id === selectedBlockId) ?? blocks[0],
    [blocks, selectedBlockId],
  )

  const handleSelectBlock = (block: CanvasBlock) => {
    setSelectedBlockId(block.id)
  }

  return (
    <div className={styles.shell} aria-label="CMS page editor workbench">
      {/* ---- Editor chrome / topbar ---- */}
      <header className={styles.topbar}>
        <div className={styles.brandGroup}>
          <TorqueAvatar />
          <span className={styles.brandText}>
            <span className={styles.brandName}>Torque · Page editor</span>
            <span className={styles.brandPage}>
              {EDITING_PAGE.title}
              <span className={styles.brandSlug}>/{EDITING_PAGE.slug}</span>
            </span>
          </span>
        </div>

        <div className={styles.historyGroup} role="group" aria-label="Edit history">
          <button type="button" className={styles.chromeBtn} aria-label="Undo last change">
            <Undo2 size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className={styles.chromeBtnLabel}>Undo</span>
          </button>
          <button
            type="button"
            className={styles.chromeBtn}
            aria-label="Redo change"
            disabled
          >
            <Redo2 size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className={styles.chromeBtnLabel}>Redo</span>
          </button>
          <span className={styles.saveState} aria-live="polite">
            <Save size={13} strokeWidth={2.2} aria-hidden="true" />
            Draft saved · 14s ago
          </span>
        </div>

        <div className={styles.chromeActions}>
          <button type="button" className={styles.chromeBtn} aria-label="Preview page">
            <Eye size={14} strokeWidth={2.2} aria-hidden="true" />
            <span className={styles.chromeBtnLabel}>Preview</span>
          </button>
          <a
            className={`${styles.chromeBtn} ${styles.chromePrimary}`}
            href="#publish"
            aria-label="Jump to publish flow"
          >
            Publish flow
          </a>
        </div>
      </header>

      {/* ---- Responsive toolbar in the chrome ---- */}
      <ResponsiveToolbar
        defaultViewport="desktop"
        className={styles.chromeToolbar}
        preview={
          <div className={styles.previewMeta}>
            <span className={styles.previewKicker}>Live preview</span>
            <span className={styles.previewTitle}>{EDITING_PAGE.title}</span>
            <span className={styles.previewHint}>
              {blocks.length} blocks · /{EDITING_PAGE.slug} ·{" "}
              {BLOCK_CATEGORY_LABEL[selectedBlock.category]} block focused
            </span>
          </div>
        }
      />

      {/* ---- Workbench: tree | canvas | inspector ---- */}
      <div className={styles.workbench}>
        <PageTree
          className={styles.tree}
          nodes={PAGE_TREE}
          selectedId="deal-winter"
          defaultExpandedIds={TREE_EXPANDED}
        />

        <PageCanvas
          className={styles.canvas}
          pageTitle={EDITING_PAGE.title}
          pageSlug={EDITING_PAGE.slug}
          blocks={blocks}
          onSelectBlock={handleSelectBlock}
        />

        <SlotInspector
          className={styles.inspector}
          blockName={selectedBlock.name}
          blockCategory={BLOCK_CATEGORY_LABEL[selectedBlock.category]}
          blockSummary={selectedBlock.summary}
          groups={HERO_INSPECTOR_GROUPS}
        />
      </div>

      {/* ---- Block library + publish flow ---- */}
      <div className={styles.lower}>
        <BlockLibraryPanel className={styles.library} blocks={LIBRARY_BLOCKS} />

        <div id="publish" className={styles.publish}>
          <PublishFlow
            pageTitle={EDITING_PAGE.title}
            slug={EDITING_PAGE.slug}
            state="draft"
            reviewer={EDITING_PAGE.reviewer}
            branch={EDITING_PAGE.branch}
            scheduledFor={EDITING_PAGE.scheduledFor}
            changeRequests={2}
          />
        </div>
      </div>
    </div>
  )
}

export default EditorShell
