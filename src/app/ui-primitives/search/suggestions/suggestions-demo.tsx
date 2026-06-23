"use client"

import { useState } from "react"

import { SearchSuggestionList } from "../../components/search"
import type { SuggestionGroup, SuggestionItem } from "../../components/search"
import styles from "../search.module.css"

const GROUPS: ReadonlyArray<SuggestionGroup> = [
  {
    id: "recent",
    heading: "Recent searches",
    kind: "recent",
    items: [
      { id: "r1", label: "Magnaflow 14416", meta: "yesterday · 16:08" },
      { id: "r2", label: "VE Commodore catback", meta: "yesterday · 14:32" },
      { id: "r3", label: "EGR delete kit Toyota", meta: "Tue · 09:48" },
    ],
  },
  {
    id: "popular",
    heading: "Popular this week",
    kind: "popular",
    items: [
      { id: "p1", label: "3-inch midpipe stainless", meta: "184 searches" },
      { id: "p2", label: "Redback headers BA Falcon", meta: "126 searches" },
      { id: "p3", label: "ADR-compliant exhaust tip", meta: "97 searches" },
    ],
  },
  {
    id: "links",
    heading: "Quick links",
    kind: "links",
    items: [
      { id: "l1", label: "Open the supplier ledger", href: "#", meta: "Inventory" },
      { id: "l2", label: "Today's bay schedule", href: "#", meta: "Workshop" },
      { id: "l3", label: "New job ticket", href: "#", meta: "Action" },
    ],
  },
]

export function SuggestionsDemo() {
  const [picked, setPicked] = useState<string>("")

  const handleSelect = (item: SuggestionItem, group: SuggestionGroup) => {
    setPicked(`Picked · ${group.heading}: ${item.label}`)
  }

  return (
    <div className={styles.stage}>
      <div style={{ maxWidth: 480 }}>
        <SearchSuggestionList groups={GROUPS} onSelect={handleSelect} />
      </div>
      {picked.length > 0 ? (
        <p
          aria-live="polite"
          style={{
            margin: 0,
            color: "var(--primitive-amber)",
            fontFamily: "var(--primitive-font-mono)",
            fontSize: 11,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {picked}
        </p>
      ) : null}
    </div>
  )
}
