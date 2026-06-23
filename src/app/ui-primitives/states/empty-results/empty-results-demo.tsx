"use client"

import { useState } from "react"
import Link from "next/link"

import { StateEmptyResults } from "../../components/states"
import styles from "../states.module.css"

const SUGGESTIONS = [
  "3-inch midpipe",
  "Redback long tube headers",
  "Magnaflow muffler",
  "BA Falcon catback",
  "VE Commodore extractors",
  "ADR-compliant tip",
]

export function EmptyResultsDemo() {
  const [query, setQuery] = useState<string>("3.5 inch quad-tip catback for HiLux LN106")

  return (
    <StateEmptyResults
      query={query}
      suggestions={SUGGESTIONS}
      onSuggestionSelect={setQuery}
      primaryAction={
        <Link href="/ui-primitives/forms-gallery" className={styles.btnRed}>
          Request a custom quote
        </Link>
      }
      secondaryAction={
        <Link href="/ui-primitives/data-display" className={styles.btnGhost}>
          Browse full catalogue
        </Link>
      }
    />
  )
}
