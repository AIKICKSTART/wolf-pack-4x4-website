/**
 * Component documentation manifest — `navigation` family (the chrome shell).
 *
 * The navigation family is the app/site chrome: 5 headers, 5 footers, 4 docks,
 * 4 slide-ups, and 4 sidebars. Sourced READ-ONLY from
 * `src/app/ui-primitives/components/chrome`. The barrel re-exports each variant
 * plus the shared `ChromeBrandConfig` / `ChromeNavItem` types.
 *
 * Entries live in `navigation.entries-a.ts` (headers + footers) and
 * `navigation.entries-b.ts` (docks + slide-ups + sidebars), split for the
 * 800-line cap; this file composes them. Every design value is referenced as a
 * central `--primitive-*` token name; CTAs follow the metallic primary-button
 * standard via `--primitive-btn-primary-*`.
 */

import { NAVIGATION_ENTRIES_A } from "./navigation.entries-a"
import { NAVIGATION_ENTRIES_B } from "./navigation.entries-b"
import { CHROME_PATH } from "./navigation.shared"
import type { ComponentDocEntry, ComponentDocFamily } from "./navigation.shared"

const entries: readonly ComponentDocEntry[] = [
  ...NAVIGATION_ENTRIES_A,
  ...NAVIGATION_ENTRIES_B,
]

const navigationDocs: ComponentDocFamily = {
  family: "navigation",
  title: "Navigation & chrome",
  group: "Chrome",
  summary:
    "The app/site navigation shell: 5 headers, 5 footers, 4 docks, 4 slide-ups, and 4 sidebars. Brand-driven, token-themed, with metallic CTAs and compositor-only motion. (Maps to the chrome component family.)",
  importPath: CHROME_PATH,
  entries,
}

export default navigationDocs
