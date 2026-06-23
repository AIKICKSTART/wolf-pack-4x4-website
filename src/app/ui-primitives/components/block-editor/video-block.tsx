"use client"

import { Captions, PlayCircle, SkipForward } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  VideoChapter,
  VideoPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

/** Format seconds as `M:SS` or `H:MM:SS`. */
function formatTime(seconds: number): string {
  const total = Math.max(0, Math.floor(seconds))
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = total % 60
  const pad = (n: number) => n.toString().padStart(2, "0")
  if (h > 0) {
    return `${h}:${pad(m)}:${pad(s)}`
  }
  return `${m}:${pad(s)}`
}

type VideoBlockProps = BlockPrimitiveProps<VideoPayload>

export function VideoBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: VideoBlockProps) {
  const titleId = useId()
  const { title, posterUrl, durationSeconds, chapters, captionsEnabled } = data.payload

  const update = (next: Partial<VideoPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<VideoPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const handleAddChapter = (): void => {
    const id = `ch-${chapters.length + 1}`
    const nextChapter: VideoChapter = {
      id,
      label: `Chapter ${chapters.length + 1}`,
      start: chapters[chapters.length - 1]?.start ?? 0,
    }
    update({ chapters: [...chapters, nextChapter] })
  }

  const toolbar = (
    <>
      <button
        type="button"
        className={`${styles.toolbarBtn} ${
          captionsEnabled ? styles.toolbarBtnActive : ""
        }`}
        aria-pressed={captionsEnabled}
        onClick={() => update({ captionsEnabled: !captionsEnabled })}
      >
        <Captions size={12} aria-hidden="true" /> Captions
      </button>
      <button
        type="button"
        className={styles.toolbarBtn}
        onClick={handleAddChapter}
      >
        <SkipForward size={12} aria-hidden="true" /> Chapter
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Video"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={titleId}
    >
      <div className={styles.video}>
        <div
          className={styles.videoFrame}
          role="img"
          aria-label={`Poster: ${title}`}
          style={
            posterUrl
              ? {
                  backgroundImage:
                    "linear-gradient(180deg, transparent 40%, color-mix(in oklab, var(--primitive-canvas) 60%, transparent))",
                }
              : undefined
          }
        >
          <button
            type="button"
            className={styles.videoPlay}
            aria-label={`Play ${title}`}
          >
            <PlayCircle size={28} aria-hidden="true" />
          </button>
          <span className={styles.videoDuration}>
            {formatTime(durationSeconds)}
          </span>
        </div>
        <h3 className={styles.checklistTitle} id={titleId}>
          {title}
          {captionsEnabled ? (
            <span
              className={styles.toolbarLabel}
              style={{ marginLeft: 8 }}
              aria-label="Captions on"
            >
              · CC
            </span>
          ) : null}
        </h3>
        {chapters.length > 0 ? (
          <ol
            className={styles.videoChapters}
            aria-label={`${chapters.length} chapters`}
          >
            {chapters.map((chapter) => (
              <li key={chapter.id} className={styles.videoChapterRow}>
                <span className={styles.videoChapterTime}>
                  {formatTime(chapter.start)}
                </span>
                <span>{chapter.label}</span>
              </li>
            ))}
          </ol>
        ) : null}
      </div>
    </BlockShell>
  )
}

export function VideoBlockEdit(props: VideoBlockProps) {
  return <VideoBlock {...props} mode="edit" />
}
