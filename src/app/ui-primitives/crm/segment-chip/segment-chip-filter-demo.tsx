"use client"

import { useState } from "react"

import { SegmentChip } from "../../components/crm"
import type { CustomerSegment } from "../../components/crm"
import styles from "../crm.module.css"

const FILTER_SEGMENTS: ReadonlyArray<CustomerSegment> = [
  "fleet",
  "performance",
  "diy",
  "trade",
  "retail",
]

export function SegmentChipFilterDemo() {
  const [selected, setSelected] = useState<ReadonlySet<CustomerSegment>>(
    () => new Set(["fleet", "performance"]),
  )

  const toggle = (segment: CustomerSegment) => {
    setSelected((current) => {
      const next = new Set(current)
      if (next.has(segment)) {
        next.delete(segment)
      } else {
        next.add(segment)
      }
      return next
    })
  }

  return (
    <div className={styles.demoInline}>
      {FILTER_SEGMENTS.map((segment) => (
        <SegmentChip
          key={segment}
          segment={segment}
          selected={selected.has(segment)}
          onToggle={() => toggle(segment)}
        />
      ))}
    </div>
  )
}

export default SegmentChipFilterDemo
