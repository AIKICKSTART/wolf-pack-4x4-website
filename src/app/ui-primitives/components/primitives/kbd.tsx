import { Children, type ReactNode } from "react"

import styles from "./kbd.module.css"

export type KbdSize = "sm" | "md" | "lg"

interface KbdProps {
  children: ReactNode
  size?: KbdSize
  className?: string
}

interface KbdGroupProps {
  children: ReactNode
  separator?: ReactNode
  size?: KbdSize
  className?: string
}

const SIZE_CLASS: Record<KbdSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

export function Kbd({ children, size = "md", className }: KbdProps) {
  const classes = [styles.kbd, SIZE_CLASS[size], className].filter(Boolean).join(" ")
  return <kbd className={classes}>{children}</kbd>
}

export function KbdGroup({
  children,
  separator = "+",
  size = "md",
  className,
}: KbdGroupProps) {
  const classes = [styles.group, SIZE_CLASS[size], className].filter(Boolean).join(" ")
  const items = Children.toArray(children)

  return (
    <span className={classes} role="group">
      {items.map((item, index) => (
        <span key={index} className={styles.groupItem}>
          {item}
          {index < items.length - 1 && (
            <span className={styles.separator} aria-hidden="true">
              {separator}
            </span>
          )}
        </span>
      ))}
    </span>
  )
}

export default Kbd
