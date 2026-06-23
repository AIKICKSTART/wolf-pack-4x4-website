"use client"

import { Grid3x3, GalleryHorizontal, LayoutGrid, Image as ImageIcon } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  GalleryLayout,
  GalleryPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const LAYOUT_LABEL: Record<GalleryLayout, string> = {
  grid: "Grid",
  carousel: "Carousel",
  masonry: "Masonry",
}

const LAYOUT_ICON: Record<GalleryLayout, typeof Grid3x3> = {
  grid: Grid3x3,
  carousel: GalleryHorizontal,
  masonry: LayoutGrid,
}

const LAYOUT_CLASS: Record<GalleryLayout, string> = {
  grid: styles.galleryGrid,
  carousel: styles.galleryCarousel,
  masonry: styles.galleryMasonry,
}

interface GalleryBlockProps extends BlockPrimitiveProps<GalleryPayload> {
  /** Hide the inline caption — used by the full-document composition. */
  hideCaption?: boolean
}

export function GalleryBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
  hideCaption = false,
}: GalleryBlockProps) {
  const captionId = useId()
  const isEdit = mode === "edit"
  const layout = data.payload.layout

  const handleLayoutPick = (next: GalleryLayout): void => {
    if (!onChange || next === layout) {
      return
    }
    const updated: BlockData<GalleryPayload> = {
      ...data,
      payload: { ...data.payload, layout: next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const handleCaptionInput = (event: React.FormEvent<HTMLParagraphElement>): void => {
    if (!onChange) {
      return
    }
    const next: BlockData<GalleryPayload> = {
      ...data,
      payload: { ...data.payload, caption: event.currentTarget.textContent ?? "" },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(next)
  }

  const toolbar = (
    <>
      {(Object.keys(LAYOUT_LABEL) as ReadonlyArray<GalleryLayout>).map((id) => {
        const Icon = LAYOUT_ICON[id]
        return (
          <button
            key={id}
            type="button"
            className={`${styles.toolbarBtn} ${
              id === layout ? styles.toolbarBtnActive : ""
            }`}
            aria-pressed={id === layout}
            aria-label={`Use ${LAYOUT_LABEL[id]} layout`}
            onClick={() => handleLayoutPick(id)}
          >
            <Icon size={12} aria-hidden="true" />
            {LAYOUT_LABEL[id]}
          </button>
        )
      })}
    </>
  )

  return (
    <BlockShell
      kind="Gallery"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={captionId}
    >
      <div className={styles.galleryHead}>
        <span className={styles.toolbarLabel} id={captionId}>
          {LAYOUT_LABEL[layout]} · {data.payload.items.length} photos
        </span>
        {!hideCaption ? (
          <p
            className={`${styles.galleryCaption} ${
              isEdit ? styles.editable : ""
            } ${isEdit ? styles.editableActive : ""}`}
            contentEditable={isEdit}
            suppressContentEditableWarning
            onInput={isEdit ? handleCaptionInput : undefined}
            role={isEdit ? "textbox" : undefined}
            aria-multiline="true"
            aria-label="Gallery caption"
            spellCheck={isEdit}
          >
            {data.payload.caption}
          </p>
        ) : null}
      </div>
      <div
        className={LAYOUT_CLASS[layout]}
        role="list"
        aria-label={`${LAYOUT_LABEL[layout]} of ${data.payload.items.length} photos`}
      >
        {data.payload.items.map((item, index) => (
          <figure
            key={item.id}
            className={styles.galleryItem}
            role="listitem"
            style={
              layout === "masonry"
                ? { aspectRatio: `${item.ratio ?? 16 / 10}` }
                : undefined
            }
          >
            <span className={styles.galleryItemBadge}>
              <ImageIcon size={10} aria-hidden="true" />
              {String(index + 1).padStart(2, "0")}
            </span>
            <figcaption className={styles.galleryItemCaption}>
              {item.caption ?? item.alt}
            </figcaption>
          </figure>
        ))}
      </div>
    </BlockShell>
  )
}

/** Edit-mode alias — emits onChange events for layout + caption. */
export function GalleryBlockEdit(props: GalleryBlockProps) {
  return <GalleryBlock {...props} mode="edit" />
}
