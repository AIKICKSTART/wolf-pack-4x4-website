"use client"

import { useId, useState } from "react"
import { Sparkles } from "lucide-react"

import type { EnrichmentProvider } from "./sales-leads-types"

import styles from "./enrichment-status-chip.module.css"

interface EnrichmentStatusChipProps {
  /** Number of fields enriched (e.g. ABN, vehicle VIN, postcode). */
  enrichedCount: number
  totalCount: number
  providers: ReadonlyArray<EnrichmentProvider>
  className?: string
}

const PROVIDER_LABEL: Record<EnrichmentProvider, string> = {
  clearbit: "Clearbit",
  hunter: "Hunter",
  rev: "Rev",
  manual: "Manual",
  "abn-lookup": "ABN Lookup",
}

function toneForCompletion(ratio: number): "low" | "med" | "high" {
  if (ratio >= 0.8) return "high"
  if (ratio >= 0.4) return "med"
  return "low"
}

export function EnrichmentStatusChip({
  enrichedCount,
  totalCount,
  providers,
  className,
}: EnrichmentStatusChipProps) {
  const popoverId = useId()
  const [open, setOpen] = useState(false)
  const safeEnriched = Math.max(0, Math.min(enrichedCount, totalCount))
  const ratio = totalCount > 0 ? safeEnriched / totalCount : 0
  const tone = toneForCompletion(ratio)

  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  return (
    <span className={classes}>
      <button
        type="button"
        className={styles.chip}
        data-tone={tone}
        aria-expanded={open}
        aria-controls={popoverId}
        aria-label={`Enriched ${safeEnriched} of ${totalCount} fields via ${providers
          .map((p) => PROVIDER_LABEL[p])
          .join(", ")}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" />
        <span className={styles.value}>
          {safeEnriched}/{totalCount}
        </span>
        <span className={styles.label}>enriched</span>
      </button>

      {open ? (
        <span
          id={popoverId}
          role="tooltip"
          className={styles.popover}
        >
          <span className={styles.popoverHead}>Providers</span>
          <span className={styles.providerList}>
            {providers.map((p) => (
              <span key={p} className={styles.provider}>
                {PROVIDER_LABEL[p]}
              </span>
            ))}
          </span>
        </span>
      ) : null}
    </span>
  )
}

export default EnrichmentStatusChip
