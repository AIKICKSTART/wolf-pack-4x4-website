import type { Metadata } from "next"

import { RuntimeVersionTile } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import { RUNTIME_VERSIONS } from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Runtime version tile | Deploy console",
  description:
    "Primitive 13 — runtime pinning tile for Node / Next / pnpm / Docker / Postgres / Redis.",
}

const MATCHED = RUNTIME_VERSIONS.find((r) => r.drift === "matched") ?? RUNTIME_VERSIONS[0]
const BEHIND = RUNTIME_VERSIONS.find((r) => r.drift === "behind") ?? RUNTIME_VERSIONS[4]
const AHEAD = RUNTIME_VERSIONS.find((r) => r.drift === "ahead") ?? RUNTIME_VERSIONS[5]

export default function RuntimeVersionTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Tile"
        title="Runtime version tile"
        description="One tile per runtime. Glyph + label, drift chip (Pinned / Behind pin / Ahead of pin) and a Current / Pinned / Latest version dl. The current row is rendered in display type and the tone colour; pinned + latest sit smaller below."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Runtime version tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · full runtime grid · all 6 services</span>
        <div className={styles.demoTriple}>
          {RUNTIME_VERSIONS.map((runtime) => (
            <RuntimeVersionTile key={runtime.kind} runtime={runtime} />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · matched · Node LTS pinned</span>
        <RuntimeVersionTile runtime={MATCHED} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · drift · Postgres behind pin, Redis ahead</span>
        <div className={styles.demoSplit}>
          <RuntimeVersionTile runtime={BEHIND} />
          <RuntimeVersionTile runtime={AHEAD} />
        </div>
      </section>
    </main>
  )
}
