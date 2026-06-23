import type { Metadata } from "next"

import { ReleaseNotesCard } from "../../components/deploy-console"
import { PageHeader } from "../../components/page-header"

import {
  RELEASE_NOTES_BREAKING,
  RELEASE_NOTES_PATCH,
  RELEASE_NOTES_TEAL,
} from "../_mock-data"
import styles from "../deploy-console.module.css"

export const metadata: Metadata = {
  title: "Release notes card | Deploy console",
  description:
    "Primitive 11 — semver release notes with breaking-change callouts.",
}

export default function ReleaseNotesCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Card"
        title="Release notes card"
        description="Semver header, codename, release date, plain-text summary and a per-change row with tone chip (feature / fix / perf / breaking / chore / security). Breaking changes promote a callout above the change list; the header tone follows the highest-severity change kind."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Deploy console", href: "/ui-primitives/deploy-console" },
          { label: "Release notes card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State A · current production · v3.42.7 polish wave</span>
        <ReleaseNotesCard notes={RELEASE_NOTES_TEAL} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State B · upcoming major · v3.43.0 with 2 breaking changes</span>
        <ReleaseNotesCard notes={RELEASE_NOTES_BREAKING} />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State C · patch · v3.42.6 Seedance fix</span>
        <ReleaseNotesCard notes={RELEASE_NOTES_PATCH} />
      </section>
    </main>
  )
}
