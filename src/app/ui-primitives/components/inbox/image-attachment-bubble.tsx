import { Expand, ImageIcon } from "lucide-react"
import Image from "next/image"

import styles from "./image-attachment-bubble.module.css"
import type { MessageSender } from "./inbox-types"

interface ImageAttachmentBubbleProps {
  sender: MessageSender
  /** Source URL. When omitted, a tinted placeholder renders. */
  src?: string
  /** Alternative text. Required for screen readers. */
  alt: string
  /** File name overlay shown on hover. */
  fileName: string
  /** Optional file size label. */
  fileSize?: string
  /** Optional intrinsic image dimensions. Defaults to 480x320. */
  width?: number
  height?: number
  /** Caption text shown below the image. */
  caption?: string
  className?: string
}

export function ImageAttachmentBubble({
  sender,
  src,
  alt,
  fileName,
  fileSize,
  width = 480,
  height = 320,
  caption,
  className,
}: ImageAttachmentBubbleProps) {
  const isMine = sender === "me"
  const classes = [
    styles.bubble,
    isMine ? styles.bubbleMine : styles.bubbleTheirs,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      aria-label={`Image attachment: ${fileName}`}
    >
      <figure className={styles.figure}>
        <div className={styles.thumb}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              className={styles.image}
              unoptimized
            />
          ) : (
            <div className={styles.placeholder} role="presentation">
              <ImageIcon
                size={32}
                strokeWidth={1.6}
                aria-hidden="true"
                className={styles.placeholderIcon}
              />
              <span className={styles.placeholderLabel}>{alt}</span>
            </div>
          )}
          <button
            type="button"
            className={styles.expandBtn}
            aria-label={`Expand ${fileName}`}
          >
            <Expand size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <div className={styles.overlay}>
            <span className={styles.fileName}>{fileName}</span>
            {fileSize ? (
              <span className={styles.fileSize}>{fileSize}</span>
            ) : null}
          </div>
        </div>
        {caption ? (
          <figcaption className={styles.caption}>{caption}</figcaption>
        ) : null}
      </figure>
    </article>
  )
}

export default ImageAttachmentBubble
