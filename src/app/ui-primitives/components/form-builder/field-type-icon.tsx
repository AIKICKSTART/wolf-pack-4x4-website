import type { CSSProperties } from "react"

import type { FormFieldType } from "./form-builder-types"
import styles from "./field-type-icon.module.css"

interface FieldTypeIconProps {
  type: FormFieldType
  /** Pixel size — defaults to 18. */
  size?: number
  /** Optional accessible label; otherwise treated as decorative. */
  ariaLabel?: string
  className?: string
}

const STROKE = 2.1

export function FieldTypeIcon({
  type,
  size = 18,
  ariaLabel,
  className,
}: FieldTypeIconProps) {
  const classes = [styles.icon, className].filter(Boolean).join(" ")
  const style = { width: `${size}px`, height: `${size}px` } as CSSProperties
  const decorative = !ariaLabel

  return (
    <svg
      className={classes}
      style={style}
      viewBox="0 0 24 24"
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={ariaLabel}
      fill="none"
      stroke="currentColor"
      strokeWidth={STROKE}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {renderGlyph(type)}
    </svg>
  )
}

function renderGlyph(type: FormFieldType) {
  switch (type) {
    case "short-text":
      return (
        <>
          <rect x="3" y="8.5" width="18" height="7" rx="1.5" />
          <path d="M6.5 12h5" />
        </>
      )
    case "long-text":
      return (
        <>
          <rect x="3" y="5" width="18" height="14" rx="1.5" />
          <path d="M6.5 9h11M6.5 12.5h11M6.5 16h7" />
        </>
      )
    case "email":
      return (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="1.5" />
          <path d="m3.5 7 8.5 6L20.5 7" />
        </>
      )
    case "phone":
      return (
        <>
          <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
          <path d="M10.5 18.5h3" />
        </>
      )
    case "number":
      return (
        <>
          <path d="M5 7h14M5 17h14" />
          <path d="M10 4 7.5 20M16.5 4 14 20" />
        </>
      )
    case "currency":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 8.5c-.8-1-2-1.5-3.2-1.5-1.7 0-3 .9-3 2.3 0 1.4 1.5 1.9 3.4 2.4 1.9.5 3.3 1 3.3 2.5 0 1.4-1.3 2.3-3 2.3-1.2 0-2.4-.5-3.2-1.5M12 5.5v13" />
        </>
      )
    case "date":
      return (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="1.5" />
          <path d="M3.5 9.5h17M8 3v4M16 3v4" />
          <circle cx="12" cy="14" r="1.2" fill="currentColor" stroke="none" />
        </>
      )
    case "dropdown":
      return (
        <>
          <rect x="3" y="6" width="18" height="12" rx="1.5" />
          <path d="m9 11 3 3 3-3" />
        </>
      )
    case "multi-select":
      return (
        <>
          <rect x="3.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="13.5" y="3.5" width="7" height="7" rx="1" />
          <rect x="3.5" y="13.5" width="7" height="7" rx="1" />
          <path d="m15 16.5 2 2 3.5-3.5" />
        </>
      )
    case "rating":
      return (
        <path d="m12 3.5 2.6 5.4 5.9.6-4.4 4 1.3 5.8L12 16.4 6.6 19.3l1.3-5.8-4.4-4 5.9-.6z" />
      )
    case "file-upload":
      return (
        <>
          <path d="M14.5 3.5H7A2 2 0 0 0 5 5.5v13A2 2 0 0 0 7 20.5h10a2 2 0 0 0 2-2V8" />
          <path d="M14.5 3.5 19 8h-4.5z" />
          <path d="M12 12v5M9.5 14l2.5-2.5L14.5 14" />
        </>
      )
    case "signature":
      return (
        <>
          <path d="M3.5 17.5c2-3 4-5 6-5 1 0 1 1.5 0 2.5s-2 1.5-2 .5 1.5-2.5 3-3.5 3.5-1 5.5 1" />
          <path d="M3.5 20.5h17" />
        </>
      )
    case "address":
      return (
        <>
          <path d="M12 21.5s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </>
      )
    case "payment":
      return (
        <>
          <rect x="2.5" y="6" width="19" height="12" rx="2" />
          <path d="M2.5 10h19M6 14h3" />
        </>
      )
    case "yes-no":
      return (
        <>
          <rect x="2.5" y="7.5" width="19" height="9" rx="4.5" />
          <circle cx="16.5" cy="12" r="3" />
        </>
      )
    default:
      return null
  }
}
