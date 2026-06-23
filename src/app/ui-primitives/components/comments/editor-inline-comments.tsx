import { Fragment } from "react"

import styles from "./editor-inline-comments.module.css"
import type { CommentStatus, CommentAuthor } from "./comment-types"

export interface InlineCommentRange {
  id: string
  /** Word(s) the comment is anchored to, must be a unique substring of body. */
  anchor: string
  status: CommentStatus
  author: CommentAuthor
  body: string
  timestamp: string
}

export interface EditorParagraph {
  id: string
  /** Plain text body. Ranges are anchored to substring matches. */
  body: string
}

interface EditorInlineCommentsProps {
  docTitle: string
  docMeta?: string
  paragraphs: ReadonlyArray<EditorParagraph>
  ranges: ReadonlyArray<InlineCommentRange>
  className?: string
}

interface RangeHit {
  range: InlineCommentRange
  start: number
  end: number
}

function findHits(
  body: string,
  ranges: ReadonlyArray<InlineCommentRange>,
): ReadonlyArray<RangeHit> {
  const hits: RangeHit[] = []
  for (const range of ranges) {
    const start = body.indexOf(range.anchor)
    if (start < 0) {
      continue
    }
    hits.push({ range, start, end: start + range.anchor.length })
  }
  return hits.sort((a, b) => a.start - b.start)
}

function renderParagraph(
  paragraph: EditorParagraph,
  ranges: ReadonlyArray<InlineCommentRange>,
) {
  const hits = findHits(paragraph.body, ranges)
  if (hits.length === 0) {
    return paragraph.body
  }
  const segments: Array<{ kind: "text" | "highlight"; value: string; range?: InlineCommentRange }> = []
  let cursor = 0
  for (const hit of hits) {
    if (hit.start < cursor) {
      continue
    }
    if (hit.start > cursor) {
      segments.push({ kind: "text", value: paragraph.body.slice(cursor, hit.start) })
    }
    segments.push({
      kind: "highlight",
      value: paragraph.body.slice(hit.start, hit.end),
      range: hit.range,
    })
    cursor = hit.end
  }
  if (cursor < paragraph.body.length) {
    segments.push({ kind: "text", value: paragraph.body.slice(cursor) })
  }
  return segments.map((segment, index) => {
    if (segment.kind === "text") {
      return <Fragment key={`${paragraph.id}-text-${index}`}>{segment.value}</Fragment>
    }
    const range = segment.range
    if (!range) {
      return <Fragment key={`${paragraph.id}-text-${index}`}>{segment.value}</Fragment>
    }
    const resolved = range.status === "resolved"
    return (
      <span
        key={`${paragraph.id}-hit-${range.id}`}
        className={styles.tooltipWrap}
      >
        <button
          type="button"
          className={[
            styles.highlight,
            resolved ? styles.highlightResolved : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-label={`Comment by ${range.author.name}: ${range.body}`}
        >
          {segment.value}
        </button>
        <span className={styles.tooltip} role="tooltip">
          <span className={styles.tooltipHead}>
            <span>{resolved ? "Resolved" : "Open"}</span>
            <span className={styles.tooltipName}>{range.author.name}</span>
            <span className={styles.tooltipTime}>{range.timestamp}</span>
          </span>
          <p className={styles.tooltipBody}>{range.body}</p>
        </span>
      </span>
    )
  })
}

export function EditorInlineComments({
  docTitle,
  docMeta,
  paragraphs,
  ranges,
  className,
}: EditorInlineCommentsProps) {
  const classes = [styles.surface, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      role="region"
      aria-label={`Inline comments on ${docTitle}`}
    >
      <header className={styles.docHeader}>
        <h2 className={styles.docTitle}>{docTitle}</h2>
        {docMeta ? <span className={styles.docMeta}>{docMeta}</span> : null}
      </header>
      {paragraphs.map((paragraph) => (
        <p key={paragraph.id} className={styles.prose}>
          {renderParagraph(paragraph, ranges)}
        </p>
      ))}
    </section>
  )
}

export default EditorInlineComments
