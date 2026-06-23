/**
 * Charts family — component documentation manifest (docs-1).
 *
 * Read-only docs for eight token-driven SVG data-viz primitives. Tones map to
 * the central `--primitive-red|amber|teal|green` tokens via inline `var(...)`
 * (the only place a token surfaces as a string inside these components). Every
 * chart sets role="img" + aria-label + <title>/<desc> on its SVG.
 *
 * Source of truth: src/app/ui-primitives/components/charts/*.tsx (read-only).
 */

import { DEFAULT_ACCESSIBILITY_RULES } from "../model"
import type { TokenDependency } from "../model"
import type { ComponentDocEntry, ComponentDocFamily } from "./types"

const BARREL = "@/app/ui-primitives/components/charts"

/** Shared tone tokens every chart references through its TONE_VAR map. */
const TONE_TOKENS: readonly TokenDependency[] = [
  { token: "--primitive-red", category: "color", usage: "red series tone" },
  { token: "--primitive-amber", category: "color", usage: "amber series tone" },
  { token: "--primitive-teal", category: "color", usage: "teal series tone" },
  { token: "--primitive-green", category: "color", usage: "green series tone" },
]

const LINE_TOKEN: TokenDependency = {
  token: "--primitive-line",
  category: "color",
  usage: "gridline / track stroke",
}

/** Standard a11y posture for a static SVG chart with an aria-labelled image role. */
const chartA11y: ComponentDocEntry["a11y"] = {
  keyboard: ["Non-interactive; not in the tab order."],
  screenReader: [
    "SVG carries role=\"img\" with an aria-label, plus <title> and <desc> describing the data range.",
  ],
  reducedMotion: "Entrance/draw animations are CSS-gated behind prefers-reduced-motion in the module.",
  focus: ["No focusable elements; pair with a data table when the figures must be inspected."],
}

const chartsDocs: ComponentDocFamily = {
  family: "charts",
  title: "Charts",
  group: "Data",
  summary:
    "Eight hand-built SVG data-viz primitives — sparkline, area, bar, donut, radial meter, signal strength, heatmap calendar, and a three-up gauge cluster — all token-driven with image-role accessibility.",
  barrelPath: BARREL,
  entries: [
    {
      manifest: {
        type: "charts/sparkline",
        name: "Sparkline",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Inline smooth trend line with optional gradient fill and an end marker.",
        componentPath: BARREL,
        importName: "Sparkline",
        propsSchema: {
          fields: [
            { key: "points", type: "array", required: true, items: { key: "point", type: "number", required: true }, description: "Numeric series." },
            { key: "tone", type: "enum", required: false, options: ["red", "amber", "teal", "green"], description: "Defaults to \"teal\"." },
            { key: "area", type: "boolean", required: false, description: "Fill under the line. Defaults to true." },
            { key: "width", type: "number", required: false, description: "Defaults to 160." },
            { key: "height", type: "number", required: false, description: "Defaults to 44." },
            { key: "ariaLabel", type: "string", required: true, description: "Accessible image label." },
            { key: "markerIndex", type: "number", required: false, description: "Index to mark. Defaults to last point." },
          ],
        },
        defaultProps: { tone: "teal", area: true, width: 160, height: 44, ariaLabel: "Trend" },
        editableFields: [
          { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["red", "amber", "teal", "green"] },
          { path: "area", label: "Area fill", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: TONE_TOKENS,
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 4 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { tone: "teal", ariaLabel: "Sample trend" }, aspectRatio: "16/4", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Teal sparkline inside a stat cell.",
          code: `import { Sparkline } from "${BARREL}"

export function Trend() {
  return (
    <Sparkline
      points={[12, 18, 9, 22, 31, 27, 40]}
      tone="teal"
      ariaLabel="Weekly bookings trend"
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { Sparkline } from "${BARREL}".`, "Pass points + a required ariaLabel.", "Size with width/height for the host slot."],
          requires: [],
          notes: ["Client component (\"use client\") — uses React.useId for the gradient."],
        },
        tags: ["chart", "trend", "inline", "svg"],
      },
      role: "Inline trend line.",
      usageExamples: [
        { title: "No-fill line", scenario: "A bare line for a dense table cell.", code: `<Sparkline points={[3, 5, 4, 7, 6]} area={false} ariaLabel="Daily calls" />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "Stretches to the slot via preserveAspectRatio=\"none\".", tablet: "Same.", desktop: "Same; pass explicit width for crispness.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: ["points"], notes: ["Typically embedded inside a card block, not placed standalone."] },
      agent: {
        steps: ["Provide a numeric points array and a descriptive ariaLabel.", "Set area={false} for a minimal line."],
        pitfalls: ["Empty points array renders null."],
        requirements: ["ariaLabel is required.", "Client component."],
      },
    },
    {
      manifest: {
        type: "charts/area-chart",
        name: "Area Chart",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Stacked smooth-area chart with y gridlines, axis ticks, and a legend.",
        componentPath: BARREL,
        importName: "AreaChart",
        propsSchema: {
          fields: [
            { key: "series", type: "array", required: true, items: { key: "s", type: "object", required: true, fields: [
              { key: "label", type: "string", required: true },
              { key: "values", type: "array", required: true, items: { key: "v", type: "number", required: true } },
              { key: "tone", type: "enum", required: true, options: ["red", "amber", "teal", "green"] },
            ] }, description: "One or more stacked series." },
            { key: "xLabels", type: "array", required: true, items: { key: "l", type: "string", required: true } },
            { key: "height", type: "number", required: false, description: "Defaults to 220." },
            { key: "ariaLabel", type: "string", required: true },
            { key: "gridlines", type: "number", required: false, description: "Defaults to 4." },
            { key: "unit", type: "string", required: false },
          ],
        },
        defaultProps: { height: 220, gridlines: 4, unit: "", ariaLabel: "Area chart" },
        editableFields: [
          { path: "unit", label: "Y-axis unit", control: "text", valueType: "string", optional: true },
          { path: "gridlines", label: "Gridlines", control: "number", valueType: "number" },
        ],
        tokenDependencies: [...TONE_TOKENS, LINE_TOKEN],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { ariaLabel: "Sample area" }, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Two-series stacked area chart.",
          code: `import { AreaChart } from "${BARREL}"

export function Volume() {
  return (
    <AreaChart
      ariaLabel="Service volume by bay"
      xLabels={["Mon", "Tue", "Wed", "Thu", "Fri"]}
      series={[
        { label: "Bay 1", values: [8, 12, 9, 14, 11], tone: "teal" },
        { label: "Bay 2", values: [5, 7, 6, 9, 8], tone: "amber" },
      ]}
      unit="k"
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { AreaChart } from "${BARREL}".`, "Provide series + xLabels of matching length.", "Set a required ariaLabel."],
          notes: ["Client component. Series are stacked; sample count = min(series length, xLabels length)."],
        },
        tags: ["chart", "area", "stacked", "svg"],
      },
      role: "Stacked area trend chart.",
      usageExamples: [
        { title: "Single series", scenario: "One filled area for a single metric.", code: `<AreaChart ariaLabel="Revenue" xLabels={["Q1","Q2","Q3","Q4"]} series={[{ label: "Revenue", values: [40,55,48,70], tone: "green" }]} unit="k" />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "viewBox scales to width; labels may crowd under ~360px.", tablet: "Comfortable.", desktop: "Full 640-unit viewBox at native fidelity.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["series", "xLabels"], notes: ["Series is a repeater of {label, values, tone}; values is a nested numeric repeater."] },
      agent: {
        steps: ["Build series with matching value-array lengths.", "Match xLabels length to the value arrays.", "Always set ariaLabel."],
        pitfalls: ["Mismatched lengths truncate to the shortest — pad arrays to align."],
        requirements: ["ariaLabel required.", "Client component."],
      },
    },
    {
      manifest: {
        type: "charts/bar-chart",
        name: "Bar Chart",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Grouped or stacked bar chart with value labels, gridlines, and a legend.",
        componentPath: BARREL,
        importName: "BarChart",
        propsSchema: {
          fields: [
            { key: "series", type: "array", required: true, items: { key: "s", type: "object", required: true, fields: [
              { key: "label", type: "string", required: true },
              { key: "values", type: "array", required: true, items: { key: "v", type: "number", required: true } },
              { key: "tone", type: "enum", required: true, options: ["red", "amber", "teal", "green"] },
            ] } },
            { key: "xLabels", type: "array", required: true, items: { key: "l", type: "string", required: true } },
            { key: "mode", type: "enum", required: false, options: ["grouped", "stacked"], description: "Defaults to \"grouped\"." },
            { key: "height", type: "number", required: false, description: "Defaults to 220." },
            { key: "ariaLabel", type: "string", required: true },
            { key: "valueLabels", type: "boolean", required: false, description: "Defaults to true." },
            { key: "unit", type: "string", required: false },
          ],
        },
        defaultProps: { mode: "grouped", height: 220, valueLabels: true, unit: "", ariaLabel: "Bar chart" },
        editableFields: [
          { path: "mode", label: "Mode", control: "select", valueType: "enum", options: ["grouped", "stacked"] },
          { path: "valueLabels", label: "Value labels", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [...TONE_TOKENS, LINE_TOKEN],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { mode: "grouped", ariaLabel: "Sample bars" }, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Grouped bars comparing two service lines.",
          code: `import { BarChart } from "${BARREL}"

export function Services() {
  return (
    <BarChart
      ariaLabel="Jobs by category per month"
      mode="grouped"
      xLabels={["Jan", "Feb", "Mar"]}
      series={[
        { label: "Exhaust", values: [24, 30, 28], tone: "red" },
        { label: "Brakes", values: [18, 21, 26], tone: "teal" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { BarChart } from "${BARREL}".`, "Choose mode (grouped vs stacked).", "Provide series + xLabels + ariaLabel."],
          notes: ["Server-renderable (no \"use client\"). Value labels hide on bars shorter than ~14px."],
        },
        tags: ["chart", "bar", "grouped", "stacked", "svg"],
      },
      role: "Categorical bar chart.",
      usageExamples: [
        { title: "Stacked totals", scenario: "Stacked mode to show composition.", code: `<BarChart ariaLabel="Stacked spend" mode="stacked" xLabels={["W1","W2"]} series={[{ label: "Parts", values: [10,12], tone: "amber" }, { label: "Labour", values: [8,9], tone: "green" }]} />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "Bars compress; consider fewer categories under 360px.", tablet: "Comfortable.", desktop: "Native fidelity.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["series", "xLabels"], notes: ["mode maps to a select control; series is a repeater."] },
      agent: {
        steps: ["Pick grouped for comparison, stacked for composition.", "Align series value lengths to xLabels."],
        pitfalls: ["Too many grouped series make bars unreadably thin — cap at ~4."],
        requirements: ["ariaLabel required."],
      },
    },
    {
      manifest: {
        type: "charts/donut-chart",
        name: "Donut Chart",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Segmented donut with a center readout, percentage legend, and optional external labels.",
        componentPath: BARREL,
        importName: "DonutChart",
        propsSchema: {
          fields: [
            { key: "segments", type: "array", required: true, items: { key: "seg", type: "object", required: true, fields: [
              { key: "label", type: "string", required: true },
              { key: "value", type: "number", required: true },
              { key: "tone", type: "enum", required: true, options: ["red", "amber", "teal", "green"] },
            ] } },
            { key: "size", type: "number", required: false, description: "Defaults to 220." },
            { key: "thickness", type: "number", required: false, description: "Defaults to 26." },
            { key: "ariaLabel", type: "string", required: true },
            { key: "centerLabel", type: "string", required: true },
            { key: "centerCaption", type: "string", required: false },
            { key: "segmentLabels", type: "boolean", required: false, description: "Defaults to false." },
          ],
        },
        defaultProps: { size: 220, thickness: 26, segmentLabels: false, ariaLabel: "Donut chart", centerLabel: "" },
        editableFields: [
          { path: "centerLabel", label: "Center label", control: "text", valueType: "string" },
          { path: "segmentLabels", label: "Segment labels", control: "toggle", valueType: "boolean" },
        ],
        tokenDependencies: [...TONE_TOKENS, LINE_TOKEN],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 6 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { centerLabel: "100%", ariaLabel: "Sample donut" }, aspectRatio: "1/1", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Donut with a center total and a legend.",
          code: `import { DonutChart } from "${BARREL}"

export function Mix() {
  return (
    <DonutChart
      ariaLabel="Job type mix"
      centerLabel="612"
      centerCaption="total jobs"
      segments={[
        { label: "Exhaust", value: 320, tone: "red" },
        { label: "Brakes", value: 180, tone: "teal" },
        { label: "Tuning", value: 112, tone: "amber" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { DonutChart } from "${BARREL}".`, "Provide segments + a centerLabel + ariaLabel.", "Toggle segmentLabels for external tick labels."],
          notes: ["Server-renderable. Legend shows each segment's percentage of total."],
        },
        tags: ["chart", "donut", "proportion", "svg"],
      },
      role: "Proportional donut chart.",
      usageExamples: [
        { title: "Two-segment split", scenario: "A simple pass/fail donut.", code: `<DonutChart ariaLabel="Inspection results" centerLabel="92%" segments={[{ label: "Pass", value: 92, tone: "green" }, { label: "Fail", value: 8, tone: "red" }]} />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "Square; shrinks with its slot.", tablet: "Comfortable side-by-side with a legend.", desktop: "Native size; bump size prop for emphasis.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["segments"], notes: ["segments is a repeater of {label, value, tone}; centerLabel is a text field."] },
      agent: {
        steps: ["Build segments with positive values.", "Set a meaningful centerLabel (the total or headline %)."],
        pitfalls: ["All-zero values fall back to a total of 1 (empty ring)."],
        requirements: ["ariaLabel and centerLabel required."],
      },
    },
    {
      manifest: {
        type: "charts/radial-meter",
        name: "Radial Meter",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Single-value circular gauge with a dashed track, glow halo, and a center readout.",
        componentPath: BARREL,
        importName: "RadialMeter",
        propsSchema: {
          fields: [
            { key: "value", type: "number", required: true, description: "0..max." },
            { key: "max", type: "number", required: false, description: "Defaults to 100." },
            { key: "label", type: "string", required: true },
            { key: "tone", type: "enum", required: false, options: ["red", "amber", "teal", "green"], description: "Defaults to \"teal\"." },
            { key: "ariaLabel", type: "string", required: true },
            { key: "size", type: "number", required: false, description: "Defaults to 120." },
            { key: "unit", type: "string", required: false, description: "Defaults to \"%\"." },
            { key: "caption", type: "string", required: false },
          ],
        },
        defaultProps: { max: 100, tone: "teal", size: 120, unit: "%", value: 0, label: "", ariaLabel: "Meter" },
        editableFields: [
          { path: "value", label: "Value", control: "number", valueType: "number" },
          { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["red", "amber", "teal", "green"] },
        ],
        tokenDependencies: [...TONE_TOKENS, LINE_TOKEN],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 4 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { value: 72, label: "Load", ariaLabel: "Load 72%" }, aspectRatio: "1/1", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Teal radial meter showing capacity.",
          code: `import { RadialMeter } from "${BARREL}"

export function Capacity() {
  return (
    <RadialMeter
      value={72}
      label="Bay load"
      tone="teal"
      ariaLabel="Bay load at 72 percent"
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { RadialMeter } from "${BARREL}".`, "Pass value, label, and ariaLabel.", "Adjust max/unit for non-percent scales."],
          notes: ["Server-renderable. value is clamped to 0..max."],
        },
        tags: ["chart", "gauge", "meter", "svg"],
      },
      role: "Single-value radial gauge.",
      usageExamples: [
        { title: "Non-percent scale", scenario: "A meter measuring out of 50.", code: `<RadialMeter value={37} max={50} unit="" label="Queue" ariaLabel="Queue 37 of 50" />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "Compact; fits a 3-up row.", tablet: "Comfortable.", desktop: "Bump size for hero stats.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: [], notes: ["Single-stat block; often composed inside GaugeCluster."] },
      agent: {
        steps: ["Set value within 0..max.", "Provide a spoken ariaLabel including the value."],
        pitfalls: ["Out-of-range values are clamped silently."],
        requirements: ["label and ariaLabel required."],
      },
    },
    {
      manifest: {
        type: "charts/signal-strength",
        name: "Signal Strength",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "Five-bar ascending signal indicator with a 0–5 fill level.",
        componentPath: BARREL,
        importName: "SignalStrength",
        propsSchema: {
          fields: [
            { key: "level", type: "number", required: true, min: 0, max: 5, description: "Bars filled, 0–5." },
            { key: "tone", type: "enum", required: false, options: ["red", "amber", "teal", "green"], description: "Defaults to \"teal\"." },
            { key: "ariaLabel", type: "string", required: true },
            { key: "size", type: "number", required: false, description: "Defaults to 24." },
          ],
        },
        defaultProps: { tone: "teal", size: 24, level: 0, ariaLabel: "Signal" },
        editableFields: [
          { path: "level", label: "Level", control: "number", valueType: "number" },
          { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["red", "amber", "teal", "green"] },
        ],
        tokenDependencies: TONE_TOKENS,
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 2 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { level: 4, ariaLabel: "Signal 4 of 5" }, aspectRatio: "1/1", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Four-of-five signal bars.",
          code: `import { SignalStrength } from "${BARREL}"

export function Connectivity() {
  return <SignalStrength level={4} tone="green" ariaLabel="Diagnostic link 4 of 5" />
}`,
        },
        setupInstructions: {
          steps: [`Import { SignalStrength } from "${BARREL}".`, "Pass an integer level 0–5 and an ariaLabel.", "Size to the host icon slot."],
          notes: ["Server-renderable. level is typed as the literal union 0|1|2|3|4|5."],
        },
        tags: ["chart", "indicator", "signal", "svg"],
      },
      role: "Discrete 5-bar level indicator.",
      usageExamples: [
        { title: "Low signal warning", scenario: "Red bars at level 1.", code: `<SignalStrength level={1} tone="red" ariaLabel="Weak signal 1 of 5" />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "Tiny inline glyph.", tablet: "Same.", desktop: "Same.", hasHorizontalScroll: false },
      cms: { isCmsBlock: false, draggable: true, acceptsChildren: false, repeaterProps: [], notes: ["Inline indicator; typically inside a row or status cell, not standalone."] },
      agent: {
        steps: ["Pass level as an integer 0..5 (TS literal union).", "Set ariaLabel describing the level."],
        pitfalls: ["Passing a non-literal number errors under strict TS — narrow to the union."],
        requirements: ["ariaLabel required.", "level must be 0|1|2|3|4|5."],
      },
    },
    {
      manifest: {
        type: "charts/heatmap-calendar",
        name: "Heatmap Calendar",
        category: "Data",
        kind: "primitive",
        version: "1.0.0",
        summary: "GitHub-style contribution heatmap bucketed into 5 intensity levels with a Less→More legend.",
        componentPath: BARREL,
        importName: "HeatmapCalendar",
        propsSchema: {
          fields: [
            { key: "cells", type: "array", required: true, items: { key: "c", type: "object", required: true, fields: [
              { key: "date", type: "string", required: true, description: "ISO YYYY-MM-DD." },
              { key: "value", type: "number", required: true },
            ] } },
            { key: "tone", type: "enum", required: false, options: ["red", "amber", "teal", "green"], description: "Defaults to \"green\"." },
            { key: "ariaLabel", type: "string", required: true },
            { key: "weeks", type: "number", required: false, description: "Defaults to 12." },
            { key: "monthLabels", type: "array", required: false, items: { key: "m", type: "string", required: false } },
          ],
        },
        defaultProps: { tone: "green", weeks: 12, ariaLabel: "Activity heatmap" },
        editableFields: [
          { path: "tone", label: "Tone", control: "select", valueType: "enum", options: ["red", "amber", "teal", "green"] },
          { path: "weeks", label: "Weeks", control: "number", valueType: "number" },
        ],
        tokenDependencies: TONE_TOKENS,
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [],
        responsiveRules: [{ breakpoint: "xs", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "img", requiresLabel: true },
        previewConfig: { sampleProps: { ariaLabel: "Sample heatmap" }, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Twelve-week green activity heatmap.",
          code: `import { HeatmapCalendar } from "${BARREL}"

export function Activity({ cells }: { cells: { date: string; value: number }[] }) {
  return (
    <HeatmapCalendar
      cells={cells}
      tone="green"
      weeks={12}
      ariaLabel="Workshop activity over the last 12 weeks"
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { HeatmapCalendar } from "${BARREL}".`, "Supply cells ordered chronologically (7 per week column).", "Set weeks + ariaLabel."],
          notes: ["Server-renderable. Cells are laid out column-major: index 0..6 = week 1's Mon..Sun."],
        },
        tags: ["chart", "heatmap", "calendar", "svg"],
      },
      role: "Calendar activity heatmap.",
      usageExamples: [
        { title: "With month labels", scenario: "Top-row month markers per week column.", code: `<HeatmapCalendar cells={cells} monthLabels={["Mar","","","","Apr","","","","May","","",""]} ariaLabel="Monthly activity" />` },
      ],
      a11y: chartA11y,
      responsive: { mobile: "Wide; the figure scales but reduce weeks under 360px.", tablet: "Comfortable at 12 weeks.", desktop: "Native fidelity.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["cells", "monthLabels"], notes: ["cells is a date/value repeater — usually populated from data, not hand-edited."] },
      agent: {
        steps: ["Order cells chronologically.", "Provide 7 cells per intended week column.", "Set weeks to match the data span."],
        pitfalls: ["Unsorted cells produce a scrambled grid (layout is index-based, not date-based)."],
        requirements: ["ariaLabel required."],
      },
    },
    {
      manifest: {
        type: "charts/gauge-cluster",
        name: "Gauge Cluster",
        category: "Data",
        kind: "component",
        version: "1.0.0",
        summary: "Three RadialMeters arranged left-center-right with an optional shared kicker and scale labels.",
        componentPath: BARREL,
        importName: "GaugeCluster",
        propsSchema: {
          fields: [
            { key: "gauges", type: "array", required: true, description: "Exactly three GaugeClusterDatum {label, value, max?, unit?, tone}.", items: { key: "g", type: "object", required: true, fields: [
              { key: "label", type: "string", required: true },
              { key: "value", type: "number", required: true },
              { key: "max", type: "number", required: false },
              { key: "unit", type: "string", required: false },
              { key: "tone", type: "enum", required: true, options: ["red", "amber", "teal", "green"] },
            ] } },
            { key: "ariaLabel", type: "string", required: true },
            { key: "kicker", type: "string", required: false },
            { key: "scaleLabels", type: "array", required: false, description: "Exactly three labels.", items: { key: "l", type: "string", required: true } },
          ],
        },
        defaultProps: { ariaLabel: "Gauge cluster" },
        editableFields: [
          { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
        ],
        tokenDependencies: [...TONE_TOKENS, LINE_TOKEN],
        iconDependencies: [],
        assetDependencies: [],
        allowedChildren: [{ kind: "primitive", types: ["charts/radial-meter"], min: 3, max: 3 }],
        responsiveRules: [{ breakpoint: "xs", stack: true, span: 12 }, { breakpoint: "md", span: 12 }],
        accessibilityRules: { ...DEFAULT_ACCESSIBILITY_RULES, role: "group", requiresLabel: true },
        previewConfig: { sampleProps: { ariaLabel: "Sample cluster" }, aspectRatio: "16/9", background: "panel", animate: false },
        codeExample: {
          language: "tsx",
          caption: "Three-up gauge cluster with scale labels.",
          code: `import { GaugeCluster } from "${BARREL}"

export function Bays() {
  return (
    <GaugeCluster
      ariaLabel="Bay utilisation"
      kicker="Live utilisation"
      scaleLabels={["Low", "Target", "Peak"]}
      gauges={[
        { label: "Bay 1", value: 64, tone: "teal" },
        { label: "Bay 2", value: 88, tone: "amber" },
        { label: "Bay 3", value: 41, tone: "green" },
      ]}
    />
  )
}`,
        },
        setupInstructions: {
          steps: [`Import { GaugeCluster } from "${BARREL}".`, "Pass exactly three gauges (TS enforces the tuple).", "Optionally add kicker + three scaleLabels."],
          requires: ["charts/radial-meter"],
          notes: ["Server-renderable. Composes RadialMeter internally — no separate import needed."],
        },
        tags: ["chart", "gauge", "cluster", "group"],
      },
      role: "Three-gauge utilisation group.",
      usageExamples: [
        { title: "No scale labels", scenario: "Bare three-up gauges.", code: `<GaugeCluster ariaLabel="KPIs" gauges={[{ label: "A", value: 50, tone: "teal" }, { label: "B", value: 70, tone: "red" }, { label: "C", value: 30, tone: "green" }]} />` },
      ],
      a11y: { ...chartA11y, screenReader: ["Wrapper has role=\"group\" + aria-label; each gauge is its own labelled image."] },
      responsive: { mobile: "Gauges stack into a column.", tablet: "Three across.", desktop: "Three across, generous gap.", hasHorizontalScroll: false },
      cms: { isCmsBlock: true, draggable: true, acceptsChildren: false, repeaterProps: ["gauges"], notes: ["gauges is a fixed-length-3 tuple — the CMS repeater must cap at exactly three rows."] },
      agent: {
        steps: ["Provide exactly three gauge data objects.", "If using scaleLabels, provide exactly three."],
        pitfalls: ["Fewer or more than three gauges is a TS tuple error."],
        requirements: ["ariaLabel required.", "gauges must be a 3-tuple."],
      },
    },
  ],
}

export default chartsDocs
