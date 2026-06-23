import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RightToLeftTile } from "../../components/localization-deep"

import { RTL_TILE_LTR, RTL_TILE_PRIMARY } from "../_mock-data"
import styles from "../localization-deep.module.css"

export const metadata: Metadata = {
  title: "Right-to-left tile | Localization deep",
  description:
    "Primitive 10 — RTL preview tile with a mirror toggle and direction-aware controls.",
}

export default function RightToLeftTilePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / RTL"
        title="Right-to-left tile"
        description="Sanity-checks UI under RTL conditions before a translation ships. The mirror toggle flips the entire layout (icon direction, button rows, headline alignment) while preserving LTR numerics for prices."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Localization deep", href: "/ui-primitives/localization-deep" },
          { label: "Right-to-left tile" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>ar-SA · mirror enabled by default</span>
        <RightToLeftTile {...RTL_TILE_PRIMARY} />

        <span className={styles.stageCaption}>en-AU · LTR baseline for visual diff</span>
        <RightToLeftTile {...RTL_TILE_LTR} />
      </section>
    </main>
  )
}
