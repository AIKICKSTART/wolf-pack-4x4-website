import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CursorTrailRail } from "../../components/collab-deep"

import { CURSOR_TRAILS } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Cursor trail rail | Collab deep",
  description:
    "Primitive 11 — heat trail of every recent cursor position on the doc, rendered as a wide SVG rail.",
}

export default function CursorTrailRailPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Trail"
        title="Cursor trail rail"
        description="A wide SVG heat trail of every recent cursor position on the doc, one trail per collaborator. Gradient fades from old → new and the leading position gets a circle endpoint."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Cursor trail rail" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Last 30s · 4 collaborators</span>
        <CursorTrailRail trails={CURSOR_TRAILS} caption="Last 30s · Falcon parts page" />
      </section>
    </main>
  )
}
