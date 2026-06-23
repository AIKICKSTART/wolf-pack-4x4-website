"use client"

import { ChevronLeft, ChevronRight, Pin } from "lucide-react"
import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
} from "react"

import styles from "./pinned-message-bar.module.css"
import type { PinnedMessage } from "./inbox-types"

interface PinnedMessageBarProps {
  pinned: ReadonlyArray<PinnedMessage>
  /** Triggered when a pinned card is clicked. */
  onJump?: (id: string) => void
  className?: string
}

export function PinnedMessageBar({
  pinned,
  onJump,
  className,
}: PinnedMessageBarProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const trackRef = useRef<HTMLDivElement | null>(null)

  const scrollByCards = useCallback((direction: 1 | -1) => {
    const node = trackRef.current
    if (!node) {
      return
    }
    const amount = node.clientWidth * 0.7 * direction
    node.scrollBy({ left: amount, behavior: "smooth" })
    setActiveIndex((current) => {
      const next = current + direction
      if (next < 0) return 0
      if (next >= pinned.length) return pinned.length - 1
      return next
    })
  }, [pinned.length])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault()
      scrollByCards(1)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      scrollByCards(-1)
    }
  }

  if (pinned.length === 0) {
    return null
  }

  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Pinned messages">
      <header className={styles.head}>
        <span className={styles.title}>
          <Pin size={12} strokeWidth={2.4} aria-hidden="true" />
          Pinned
        </span>
        <span className={styles.counter}>
          {activeIndex + 1} / {pinned.length}
        </span>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.scrollBtn}
            aria-label="Previous pinned message"
            onClick={() => scrollByCards(-1)}
          >
            <ChevronLeft size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.scrollBtn}
            aria-label="Next pinned message"
            onClick={() => scrollByCards(1)}
          >
            <ChevronRight size={14} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
      </header>
      <div
        className={styles.track}
        ref={trackRef}
        tabIndex={0}
        role="list"
        aria-label="Pinned messages list"
        onKeyDown={handleKeyDown}
      >
        {pinned.map((message) => (
          <button
            key={message.id}
            type="button"
            role="listitem"
            className={styles.card}
            onClick={() => onJump?.(message.id)}
            aria-label={`Jump to pinned message from ${message.author.name}`}
          >
            <span className={styles.cardKicker}>{message.author.name}</span>
            <span className={styles.cardPreview}>{message.preview}</span>
            <time className={styles.cardTime}>{message.pinnedAt}</time>
          </button>
        ))}
      </div>
    </section>
  )
}

export default PinnedMessageBar
