import { Wrench } from "lucide-react"

import { Breadcrumb } from "../primitives/breadcrumb"

import type { PartBreadcrumbItem, PartTone } from "./parts-pages-types"

import styles from "./parts-breadcrumb.module.css"

export interface PartsBreadcrumbProps {
  items: ReadonlyArray<PartBreadcrumbItem>
  /** Tone for the leaf segment — defaults to amber. */
  leafTone?: PartTone
  /** Optional aria label override. */
  label?: string
  className?: string
}

const TONE_CLASS: Record<PartTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function PartsBreadcrumb({
  items,
  leafTone = "amber",
  label = "Parts breadcrumb",
  className,
}: PartsBreadcrumbProps) {
  return (
    <div className={[styles.wrap, TONE_CLASS[leafTone], className].filter(Boolean).join(" ")}>
      <Breadcrumb
        ariaLabel={label}
        homeIcon={<Wrench size={12} strokeWidth={2.2} aria-hidden="true" />}
        items={items.map(({ label: itemLabel, href }) => ({ label: itemLabel, href }))}
      />
    </div>
  )
}

export default PartsBreadcrumb
