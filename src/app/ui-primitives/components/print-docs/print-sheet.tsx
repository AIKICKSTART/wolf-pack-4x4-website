import type { ReactNode } from "react"

import styles from "./print-sheet.module.css"

export type PrintSheetFormat = "A4" | "Letter" | "Receipt"

interface PrintSheetProps {
  format?: PrintSheetFormat
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
  ariaLabel?: string
}

const formatToClass: Record<PrintSheetFormat, string> = {
  A4: styles.formatA4,
  Letter: styles.formatLetter,
  Receipt: styles.formatReceipt,
}

export function PrintSheet({
  format = "A4",
  header,
  footer,
  children,
  ariaLabel = "Print sheet",
}: PrintSheetProps) {
  return (
    <article
      className={`${styles.printSheet} ${formatToClass[format]}`}
      data-format={format}
      aria-label={ariaLabel}
    >
      {header ? <header className={styles.sheetHeader}>{header}</header> : null}
      <div className={styles.sheetBody}>{children}</div>
      {footer ? <footer className={styles.sheetFooter}>{footer}</footer> : null}
    </article>
  )
}

export default PrintSheet
