"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import { FacetedFilterPanel } from "../../components/storefront"
import type { FacetGroup } from "../../components/storefront"

import { FACET_GROUPS } from "../_mock-data"
import styles from "../storefront.module.css"

function clone(groups: ReadonlyArray<FacetGroup>): FacetGroup[] {
  return groups.map((group) => ({
    ...group,
    options: group.options?.map((opt) => ({ ...opt })),
    rangeValue: group.rangeValue
      ? ([group.rangeValue[0], group.rangeValue[1]] as [number, number])
      : undefined,
  }))
}

function StatefulPanel({
  initial,
  initialCount,
}: {
  initial: ReadonlyArray<FacetGroup>
  initialCount: number
}) {
  const [groups, setGroups] = useState<FacetGroup[]>(() => clone(initial))
  const [count, setCount] = useState<number>(initialCount)

  const toggleOption = (groupKey: string, optionId: string) => {
    setGroups((prev) =>
      prev.map((group) => {
        if (group.key !== groupKey || !group.options) {
          return group
        }
        return {
          ...group,
          options: group.options.map((option) =>
            option.id === optionId ? { ...option, selected: !option.selected } : option,
          ),
        }
      }),
    )
    setCount((prev) => Math.max(0, prev + (Math.random() > 0.5 ? -3 : 4)))
  }

  const updateRange = (groupKey: string, value: [number, number]) => {
    setGroups((prev) =>
      prev.map((group) => (group.key === groupKey ? { ...group, rangeValue: value } : group)),
    )
  }

  const clearAll = () => {
    setGroups(clone(initial))
    setCount(initialCount)
  }

  return (
    <FacetedFilterPanel
      groups={groups}
      resultCount={count}
      onToggleOption={toggleOption}
      onRangeChange={updateRange}
      onClear={clearAll}
    />
  )
}

export default function FacetedFilterPanelPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Faceted filter panel"
        title="Faceted filter panel"
        description="Left-rail filters with brand checkboxes, category checkboxes, price range, finish swatches and a rego-based fitment match. Active chips and clear-all live above."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Faceted filter panel" },
        ]}
      />
      <section className={styles.stageFrame}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 22,
          }}
        >
          <div>
            <span className={styles.stageCaption}>State 01 · active facets · 24 results</span>
            <StatefulPanel initial={FACET_GROUPS} initialCount={24} />
          </div>
          <div>
            <span className={styles.stageCaption}>State 02 · clean · 184 results</span>
            <StatefulPanel
              initial={FACET_GROUPS.map((g) => ({
                ...g,
                options: g.options?.map((o) => ({ ...o, selected: false })),
              }))}
              initialCount={184}
            />
          </div>
          <div>
            <span className={styles.stageCaption}>State 03 · no matches</span>
            <StatefulPanel initial={FACET_GROUPS} initialCount={0} />
          </div>
        </div>
      </section>
    </main>
  )
}
