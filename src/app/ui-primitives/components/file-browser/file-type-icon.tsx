import type { FileKind } from "./file-types"

import styles from "./file-type-icon.module.css"

export type FileTypeIconSize = "sm" | "md" | "lg"

interface FileTypeIconProps {
  kind: FileKind
  /** Optional extension label rendered inside the icon. */
  extension?: string
  size?: FileTypeIconSize
  className?: string
}

const SIZE_PX: Record<FileTypeIconSize, number> = {
  sm: 24,
  md: 32,
  lg: 48,
}

const KIND_CLASS: Record<FileKind, string> = {
  image: styles.image,
  video: styles.video,
  audio: styles.audio,
  pdf: styles.pdf,
  doc: styles.doc,
  sheet: styles.sheet,
  slide: styles.slide,
  archive: styles.archive,
  code: styles.code,
  "3d-model": styles.model3d,
  cad: styles.cad,
  generic: styles.generic,
}

const KIND_LABEL: Record<FileKind, string> = {
  image: "Image file",
  video: "Video file",
  audio: "Audio file",
  pdf: "PDF document",
  doc: "Document",
  sheet: "Spreadsheet",
  slide: "Presentation",
  archive: "Archive",
  code: "Code file",
  "3d-model": "3D model",
  cad: "CAD drawing",
  generic: "File",
}

function FileBody({ extension }: { extension?: string }) {
  return (
    <>
      <path
        d="M6 2 H18 L26 10 V28 A2 2 0 0 1 24 30 H6 A2 2 0 0 1 4 28 V4 A2 2 0 0 1 6 2 Z"
        className={styles.body}
      />
      <path d="M18 2 V10 H26" className={styles.fold} />
      {extension ? (
        <text
          x="15"
          y="26"
          textAnchor="middle"
          className={styles.ext}
        >
          {extension.slice(0, 4).toUpperCase()}
        </text>
      ) : null}
    </>
  )
}

function ImageGlyph() {
  return (
    <>
      <FileBody />
      <circle cx="11" cy="15" r="2" className={styles.glyph} />
      <path
        d="M7 22 L13 17 L17 21 L21 18 L24 22 L24 25 H7 Z"
        className={styles.glyphFill}
      />
    </>
  )
}

function VideoGlyph() {
  return (
    <>
      <FileBody />
      <rect x="7" y="16" width="14" height="9" rx="1.5" className={styles.glyph} />
      <path d="M21 19 L25 17 V24 L21 22 Z" className={styles.glyphFill} />
    </>
  )
}

function AudioGlyph() {
  return (
    <>
      <FileBody />
      <path
        d="M9 24 V16 L17 14 V22"
        className={styles.glyph}
      />
      <circle cx="9" cy="24" r="2" className={styles.glyphFill} />
      <circle cx="17" cy="22" r="2" className={styles.glyphFill} />
    </>
  )
}

function PdfGlyph() {
  return (
    <>
      <FileBody />
      <text
        x="15"
        y="22"
        textAnchor="middle"
        className={styles.bigLabel}
      >
        PDF
      </text>
    </>
  )
}

function DocGlyph() {
  return (
    <>
      <FileBody />
      <line x1="8" y1="15" x2="22" y2="15" className={styles.glyph} />
      <line x1="8" y1="19" x2="22" y2="19" className={styles.glyph} />
      <line x1="8" y1="23" x2="18" y2="23" className={styles.glyph} />
    </>
  )
}

function SheetGlyph() {
  return (
    <>
      <FileBody />
      <rect x="8" y="14" width="14" height="12" className={styles.glyph} />
      <line x1="8" y1="18" x2="22" y2="18" className={styles.glyph} />
      <line x1="8" y1="22" x2="22" y2="22" className={styles.glyph} />
      <line x1="15" y1="14" x2="15" y2="26" className={styles.glyph} />
    </>
  )
}

function SlideGlyph() {
  return (
    <>
      <FileBody />
      <rect x="8" y="14" width="14" height="10" className={styles.glyph} />
      <line x1="11" y1="18" x2="19" y2="18" className={styles.glyph} />
      <line x1="11" y1="21" x2="16" y2="21" className={styles.glyph} />
    </>
  )
}

function ArchiveGlyph() {
  return (
    <>
      <FileBody />
      <path
        d="M14 13 H16 V15 H14 Z M14 17 H16 V19 H14 Z M14 21 H16 V23 H14 Z"
        className={styles.glyphFill}
      />
    </>
  )
}

function CodeGlyph() {
  return (
    <>
      <FileBody />
      <path d="M12 16 L8 20 L12 24" className={styles.glyph} />
      <path d="M18 16 L22 20 L18 24" className={styles.glyph} />
      <line x1="16" y1="14" x2="14" y2="26" className={styles.glyph} />
    </>
  )
}

function Model3dGlyph() {
  return (
    <>
      <FileBody />
      <path
        d="M15 13 L22 17 V23 L15 27 L8 23 V17 Z"
        className={styles.glyph}
      />
      <line x1="15" y1="13" x2="15" y2="27" className={styles.glyph} />
      <line x1="8" y1="17" x2="22" y2="17" className={styles.glyph} />
    </>
  )
}

function CadGlyph() {
  return (
    <>
      <FileBody />
      <circle cx="11" cy="20" r="3" className={styles.glyph} />
      <circle cx="11" cy="20" r="1" className={styles.glyphFill} />
      <line x1="14" y1="20" x2="23" y2="20" className={styles.glyph} />
      <line x1="14" y1="20" x2="23" y2="15" className={styles.glyph} />
    </>
  )
}

function GenericGlyph({ extension }: { extension?: string }) {
  return <FileBody extension={extension} />
}

function GlyphFor({ kind, extension }: { kind: FileKind; extension?: string }) {
  switch (kind) {
    case "image":
      return <ImageGlyph />
    case "video":
      return <VideoGlyph />
    case "audio":
      return <AudioGlyph />
    case "pdf":
      return <PdfGlyph />
    case "doc":
      return <DocGlyph />
    case "sheet":
      return <SheetGlyph />
    case "slide":
      return <SlideGlyph />
    case "archive":
      return <ArchiveGlyph />
    case "code":
      return <CodeGlyph />
    case "3d-model":
      return <Model3dGlyph />
    case "cad":
      return <CadGlyph />
    case "generic":
    default:
      return <GenericGlyph extension={extension} />
  }
}

export function FileTypeIcon({
  kind,
  extension,
  size = "md",
  className,
}: FileTypeIconProps) {
  const px = SIZE_PX[size]
  const classes = [styles.icon, KIND_CLASS[kind], className]
    .filter(Boolean)
    .join(" ")

  return (
    <svg
      viewBox="0 0 30 32"
      width={px}
      height={px}
      className={classes}
      role="img"
      aria-label={KIND_LABEL[kind]}
    >
      <GlyphFor kind={kind} extension={extension} />
    </svg>
  )
}

export default FileTypeIcon
