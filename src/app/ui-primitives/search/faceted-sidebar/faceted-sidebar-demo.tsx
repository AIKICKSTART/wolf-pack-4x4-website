"use client"

import { useMemo, useState } from "react"

import { FacetedFilterSidebar } from "../../components/search"
import type { FacetGroup } from "../../components/search"
import styles from "../search.module.css"

interface SidebarState {
  categories: ReadonlySet<string>
  suppliers: ReadonlySet<string>
  fitments: ReadonlySet<string>
  maxPrice: number
  inStock: boolean
}

const INITIAL_STATE: SidebarState = {
  categories: new Set(["mufflers"]),
  suppliers: new Set(["magnaflow"]),
  fitments: new Set(),
  maxPrice: 2200,
  inStock: true,
}

function formatPrice(value: number): string {
  return `$${value.toLocaleString()}`
}

export function FacetedSidebarDemo() {
  const [state, setState] = useState<SidebarState>(INITIAL_STATE)

  const groups = useMemo<ReadonlyArray<FacetGroup>>(
    () => [
      {
        id: "category",
        heading: "Category",
        kind: "checkbox",
        defaultOpen: true,
        options: [
          { id: "mufflers", label: "Mufflers", count: 184, checked: state.categories.has("mufflers") },
          { id: "headers", label: "Headers", count: 92, checked: state.categories.has("headers") },
          {
            id: "midpipes",
            label: "Midpipes",
            count: 142,
            checked: state.categories.has("midpipes"),
          },
          {
            id: "catbacks",
            label: "Catback systems",
            count: 76,
            checked: state.categories.has("catbacks"),
          },
          { id: "tips", label: "Exhaust tips", count: 218, checked: state.categories.has("tips") },
        ],
      },
      {
        id: "supplier",
        heading: "Supplier",
        kind: "checkbox",
        defaultOpen: true,
        options: [
          {
            id: "magnaflow",
            label: "Magnaflow",
            count: 64,
            checked: state.suppliers.has("magnaflow"),
          },
          { id: "redback", label: "Redback", count: 52, checked: state.suppliers.has("redback") },
          { id: "manta", label: "Manta", count: 41, checked: state.suppliers.has("manta") },
          { id: "xforce", label: "X-Force", count: 38, checked: state.suppliers.has("xforce") },
        ],
      },
      {
        id: "price",
        heading: "Max price",
        kind: "range",
        defaultOpen: true,
        range: {
          min: 0,
          max: 4000,
          step: 50,
          current: state.maxPrice,
          format: formatPrice,
        },
      },
      {
        id: "fitment",
        heading: "Vehicle compatibility",
        kind: "chip",
        defaultOpen: true,
        options: [
          { id: "ba-falcon", label: "BA Falcon", selected: state.fitments.has("ba-falcon") },
          { id: "ve-commodore", label: "VE Commodore", selected: state.fitments.has("ve-commodore") },
          { id: "hilux", label: "Hilux", selected: state.fitments.has("hilux") },
          { id: "navara", label: "Navara", selected: state.fitments.has("navara") },
          { id: "ranger", label: "Ranger", selected: state.fitments.has("ranger") },
        ],
      },
      {
        id: "stock",
        heading: "Availability",
        kind: "toggle",
        defaultOpen: true,
        toggleLabel: "In stock only",
        toggleOn: state.inStock,
      },
    ],
    [state],
  )

  const toggleSetMember = (current: ReadonlySet<string>, id: string, next: boolean): Set<string> => {
    const out = new Set(current)
    if (next) out.add(id)
    else out.delete(id)
    return out
  }

  const handleCheckbox = (groupId: string, optionId: string, next: boolean) => {
    setState((prev) => {
      if (groupId === "category") {
        return { ...prev, categories: toggleSetMember(prev.categories, optionId, next) }
      }
      if (groupId === "supplier") {
        return { ...prev, suppliers: toggleSetMember(prev.suppliers, optionId, next) }
      }
      return prev
    })
  }

  const handleChip = (groupId: string, optionId: string, next: boolean) => {
    if (groupId !== "fitment") return
    setState((prev) => ({ ...prev, fitments: toggleSetMember(prev.fitments, optionId, next) }))
  }

  const handleRange = (groupId: string, value: number) => {
    if (groupId !== "price") return
    setState((prev) => ({ ...prev, maxPrice: value }))
  }

  const handleToggle = (groupId: string, next: boolean) => {
    if (groupId !== "stock") return
    setState((prev) => ({ ...prev, inStock: next }))
  }

  const handleClear = () => setState(INITIAL_STATE)

  const appliedCount =
    state.categories.size +
    state.suppliers.size +
    state.fitments.size +
    (state.inStock ? 1 : 0)

  return (
    <div className={styles.stage}>
      <div style={{ display: "grid", gridTemplateColumns: "296px 1fr", gap: 18, alignItems: "start" }}>
        <FacetedFilterSidebar
          groups={groups}
          heading="Refine catalog"
          appliedCount={appliedCount}
          onCheckboxToggle={handleCheckbox}
          onChipToggle={handleChip}
          onRangeChange={handleRange}
          onToggleChange={handleToggle}
          onClearAll={handleClear}
        />
        <div
          style={{
            padding: 18,
            border: "1px dashed var(--primitive-line)",
            borderRadius: "var(--primitive-radius-lg)",
            color: "var(--primitive-muted)",
            fontFamily: "var(--primitive-font-mono)",
            fontSize: "var(--primitive-text-xs)",
            lineHeight: 1.7,
          }}
        >
          <strong style={{ color: "var(--primitive-text-strong)", fontFamily: "var(--primitive-font-display)", fontSize: "var(--primitive-text-xl)", display: "block", marginBottom: "var(--primitive-space-3)" }}>
            Filter payload preview
          </strong>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap", color: "var(--primitive-amber)" }}>{JSON.stringify(
            {
              categories: [...state.categories],
              suppliers: [...state.suppliers],
              fitments: [...state.fitments],
              maxPrice: state.maxPrice,
              inStock: state.inStock,
            },
            null,
            2,
          )}</pre>
        </div>
      </div>
    </div>
  )
}
