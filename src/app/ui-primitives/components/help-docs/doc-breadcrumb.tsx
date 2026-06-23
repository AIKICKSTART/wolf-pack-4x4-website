import { Breadcrumb, type BreadcrumbItem } from "../primitives/breadcrumb"

import styles from "./doc-breadcrumb.module.css"

interface DocBreadcrumbProps {
  items: ReadonlyArray<BreadcrumbItem>
  ariaLabel?: string
}

export function DocBreadcrumb({ items, ariaLabel = "Docs breadcrumb" }: DocBreadcrumbProps) {
  return (
    <div className={styles.wrap}>
      <Breadcrumb
        items={[...items]}
        className={styles.bar}
        ariaLabel={ariaLabel}
        separator={
          <span className={styles.separator} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 3 11 8 6 13" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        }
      />
    </div>
  )
}

export default DocBreadcrumb
