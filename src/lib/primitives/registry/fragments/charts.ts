import type { PrimitiveFamilyManifest } from "../types"

const importPath = "@/app/ui-primitives/components/charts"

const manifest: PrimitiveFamilyManifest = {
  family: "charts",
  title: "Charts",
  group: "Data",
  summary: "Lightweight data-viz primitives: area, bar, donut, gauge, heatmap, radial, sparkline, signal strength.",
  entries: [
    {
      key: "charts/sparkline",
      family: "charts",
      name: "Sparkline",
      label: "Sparkline",
      description:
        "Compact inline trend line over a number array, with optional gradient area fill and a soft marker dot on a chosen point.",
      kind: "primitive",
      importPath,
      tags: ["trend", "sparkline", "data-viz", "inline"],
      status: "improved",
    },
    {
      key: "charts/area-chart",
      family: "charts",
      name: "AreaChart",
      label: "Area chart",
      description:
        "Stacked smooth-curve area chart with gradient fills, gridlines, and y/x axis tick labels for multiple toned series.",
      kind: "primitive",
      importPath,
      tags: ["area", "stacked", "data-viz", "trend"],
      status: "improved",
    },
    {
      key: "charts/bar-chart",
      family: "charts",
      name: "BarChart",
      label: "Bar chart",
      description: "Grouped or stacked bar chart with gridlines, axis ticks, per-bar value labels, and a swatch legend.",
      kind: "primitive",
      importPath,
      tags: ["bar", "grouped", "stacked", "data-viz"],
      status: "improved",
    },
    {
      key: "charts/donut-chart",
      family: "charts",
      name: "DonutChart",
      label: "Donut chart",
      description:
        "Ring donut chart with toned arc segments, a center display label/caption, optional external labels, and a percentage legend.",
      kind: "primitive",
      importPath,
      tags: ["donut", "pie", "proportion", "data-viz"],
      status: "improved",
    },
    {
      key: "charts/radial-meter",
      family: "charts",
      name: "RadialMeter",
      label: "Radial meter",
      description:
        "Single circular gauge with a dashed track, animatable filled arc, glow halo, and a centered percentage readout with label.",
      kind: "primitive",
      importPath,
      tags: ["gauge", "radial", "kpi", "progress"],
      status: "improved",
    },
    {
      key: "charts/signal-strength",
      family: "charts",
      name: "SignalStrength",
      label: "Signal strength",
      description:
        "Five ascending bars indicating a 0-5 signal level, with toned filled/empty states and a staggered reveal animation.",
      kind: "primitive",
      importPath,
      tags: ["signal", "bars", "indicator", "status"],
      status: "improved",
    },
    {
      key: "charts/heatmap-calendar",
      family: "charts",
      name: "HeatmapCalendar",
      label: "Heatmap calendar",
      description:
        "GitHub-style contribution heatmap of dated values bucketed into intensity steps over week columns, with axis labels and a legend.",
      kind: "primitive",
      importPath,
      tags: ["heatmap", "calendar", "activity", "data-viz"],
      status: "improved",
    },
    {
      key: "charts/gauge-cluster",
      family: "charts",
      name: "GaugeCluster",
      label: "Gauge cluster",
      description: "Dashboard row of exactly three RadialMeter gauges with an optional shared kicker and bottom scale labels.",
      kind: "widget",
      importPath,
      tags: ["gauges", "dashboard", "kpi", "cluster"],
      status: "improved",
    },
  ],
}

export default manifest
