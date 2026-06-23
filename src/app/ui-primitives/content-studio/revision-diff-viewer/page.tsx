import type { Metadata } from "next"

import { RevisionDiffViewer } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import {
  AUTHORS,
  REVISION_DIFF,
  REVISION_NEW,
  REVISION_OLD,
} from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Revision diff viewer | Content studio",
  description:
    "Primitive 09 — side-by-side revision comparison. Three states — full intro rewrite, single-line tweak, no-op revision.",
}

const SINGLE_LINE_DIFF = REVISION_DIFF.slice(0, 4)

const NO_OP_DIFF = REVISION_DIFF.filter((line) => line.kind === "context").slice(0, 4)

const NO_OP_NEW = {
  ...REVISION_NEW,
  id: "rev-5",
  label: "Revision 5 · Mia format pass",
  author: AUTHORS.mia,
  timestamp: "Wed 27 May · 10:08",
  changeSummary: "Adjusted micro-typography only — no copy changes.",
}

const SINGLE_LINE_NEW = {
  ...REVISION_NEW,
  changeSummary: "Single sentence rewrite — cadence pass on the lead paragraph.",
}

export default function RevisionDiffViewerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Revision diff viewer"
        title="Revision diff viewer"
        description="Two columns — old on the red side, new on the green side. Added lines glow green, removed lines glow red, and editor notes hang off the right margin. Three states — intro rewrite, single-line tweak, no-op revision."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Revision diff viewer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <RevisionDiffViewer
            oldRevision={REVISION_OLD}
            newRevision={REVISION_NEW}
            lines={REVISION_DIFF}
          />
          <RevisionDiffViewer
            oldRevision={REVISION_OLD}
            newRevision={SINGLE_LINE_NEW}
            lines={SINGLE_LINE_DIFF}
          />
          <RevisionDiffViewer
            oldRevision={REVISION_NEW}
            newRevision={NO_OP_NEW}
            lines={NO_OP_DIFF}
          />
        </div>
      </section>
    </main>
  )
}
