import { ExternalLink, FileBox, FileSpreadsheet, FileText, Image as ImageIcon } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./search-result-file.module.css"

export type FileResultKind = "pdf" | "doc" | "image" | "sheet" | "zip" | "generic"

interface SearchResultFileProps {
  name: string
  path: string
  size: string
  modifiedAt: Date | string
  modifiedLabel: string
  kind?: FileResultKind
  ownerName?: string
  href?: string
  className?: string
}

const KIND_ICON: Record<FileResultKind, ReactNode> = {
  pdf: <FileText size={22} strokeWidth={1.6} aria-hidden="true" />,
  doc: <FileText size={22} strokeWidth={1.6} aria-hidden="true" />,
  image: <ImageIcon size={22} strokeWidth={1.6} aria-hidden="true" />,
  sheet: <FileSpreadsheet size={22} strokeWidth={1.6} aria-hidden="true" />,
  zip: <FileBox size={22} strokeWidth={1.6} aria-hidden="true" />,
  generic: <FileText size={22} strokeWidth={1.6} aria-hidden="true" />,
}

const KIND_TONE: Record<FileResultKind, string> = {
  pdf: styles.toneRed,
  doc: styles.toneTeal,
  image: styles.toneAmber,
  sheet: styles.toneGreen,
  zip: styles.toneNeutral,
  generic: styles.toneNeutral,
}

function toIsoString(value: Date | string): string {
  return value instanceof Date ? value.toISOString() : value
}

export function SearchResultFile({
  name,
  path,
  size,
  modifiedAt,
  modifiedLabel,
  kind = "generic",
  ownerName,
  href,
  className,
}: SearchResultFileProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  return (
    <article className={classes}>
      <span className={`${styles.icon} ${KIND_TONE[kind]}`} aria-hidden="true">
        {KIND_ICON[kind]}
      </span>
      <div className={styles.body}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.path}>{path}</p>
        <ul className={styles.meta}>
          <li>{size}</li>
          <li>
            <time dateTime={toIsoString(modifiedAt)}>{modifiedLabel}</time>
          </li>
          {ownerName ? <li>by {ownerName}</li> : null}
        </ul>
      </div>
      {href ? (
        <a href={href} className={styles.cta} aria-label={`Open file ${name}`}>
          Open
          <ExternalLink size={12} strokeWidth={2.4} aria-hidden="true" />
        </a>
      ) : null}
    </article>
  )
}

export default SearchResultFile
