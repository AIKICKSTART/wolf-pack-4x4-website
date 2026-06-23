import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { VersionConflictModal } from "../../components/collab-deep"

import { CONFLICT_DOC, CONFLICT_FIELD, CONFLICT_VERSIONS } from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Version conflict modal | Collab deep",
  description:
    "Primitive 05 — 3-way diff with merge / keep-mine / keep-theirs actions, used when two collaborators edited the same field.",
}

export default function VersionConflictModalPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Conflict"
        title="Version conflict modal"
        description="Three-way diff modal for resolving a co-edit conflict. Original / Yours / Theirs columns with author chips, edit stats, and merge / keep-mine / keep-theirs actions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Version conflict modal" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Daniel vs Tim · description conflict</span>
        <VersionConflictModal
          fieldLabel={CONFLICT_FIELD}
          docTitle={CONFLICT_DOC}
          versions={CONFLICT_VERSIONS}
          selectedResolution="merge"
        />
      </section>
    </main>
  )
}
