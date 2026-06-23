import { MetricBlock } from "../data-display"

import type { AreaStat } from "./services-areas-types"

export interface AreaStatsTrioProps {
  /** Three stat tiles. The first three entries are rendered; extras are ignored. */
  stats: ReadonlyArray<AreaStat>
}

/**
 * Area stats trio adapter. Composes the data-display `MetricBlock`
 * primitive — supplies three stat tiles: workshops count, suburbs covered,
 * and average response time. Mapping `AreaStat → MetricBlockItem`
 * surfaces the helper line as a "flat" delta so MetricBlock renders it
 * underneath the value.
 */
export function AreaStatsTrio({ stats }: AreaStatsTrioProps) {
  const trio = stats.slice(0, 3)

  return (
    <MetricBlock
      metrics={trio.map((stat) => ({
        id: stat.id,
        label: stat.label,
        value: stat.value,
        delta: stat.helper ? { label: stat.helper, direction: "flat" as const } : undefined,
      }))}
    />
  )
}

export default AreaStatsTrio
