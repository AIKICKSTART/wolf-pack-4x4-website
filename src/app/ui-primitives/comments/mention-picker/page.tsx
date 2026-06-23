import type { Metadata } from "next"

import { MentionPicker } from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { MENTION_CANDIDATES } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Mention picker | Comments primitives",
  description:
    "Primitive 07 — typeahead @mention popover for users, teams, and roles. Arrow-key navigable, outputs a typed mention token.",
}

export default function MentionPickerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Mention picker"
        title="Mention picker"
        description="Inline popover triggered by @. Lists users (Bay 3 tech, foreman), teams (floor crew, customer success), and roles (lead technician). Arrow keys navigate; enter selects."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Mention picker" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Floating · open</span>
        <MentionPicker
          candidates={MENTION_CANDIDATES}
        />
      </section>
    </main>
  )
}
