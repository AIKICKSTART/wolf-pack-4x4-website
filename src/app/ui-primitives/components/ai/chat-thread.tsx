"use client"

import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

import styles from "./chat-thread.module.css"

interface ChatThreadProps {
  children: ReactNode
  className?: string
  ariaLabel?: string
}

const SCROLL_THRESHOLD_PX = 80

export function ChatThread({
  children,
  className,
  ariaLabel = "Conversation transcript",
}: ChatThreadProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const [stickToBottom, setStickToBottom] = useState(true)
  const childCount = Children.count(children)

  const isNearBottom = useCallback((node: HTMLDivElement): boolean => {
    const distance = node.scrollHeight - node.scrollTop - node.clientHeight
    return distance < SCROLL_THRESHOLD_PX
  }, [])

  const handleScroll = useCallback(() => {
    const node = scrollerRef.current
    if (!node) {
      return
    }
    setStickToBottom(isNearBottom(node))
  }, [isNearBottom])

  useEffect(() => {
    const node = scrollerRef.current
    if (!node || !stickToBottom) {
      return
    }
    node.scrollTop = node.scrollHeight
  }, [childCount, stickToBottom])

  const classes = [styles.thread, className].filter(Boolean).join(" ")

  return (
    <div
      ref={scrollerRef}
      className={classes}
      role="log"
      aria-label={ariaLabel}
      aria-live="polite"
      aria-relevant="additions"
      tabIndex={0}
      onScroll={handleScroll}
    >
      <ol className={styles.list}>{children}</ol>
    </div>
  )
}

export default ChatThread
