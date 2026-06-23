import type { Metadata } from "next"

import { NoteComposer } from "../../components/crm"
import { PageHeader } from "../../components/page-header"

import styles from "../crm.module.css"

export const metadata: Metadata = {
  title: "Note composer | CRM",
  description:
    "Primitive 12 — rich-text note composer with @mention directory, tag input, pin toggle, and save with confirmation toast.",
}

const MENTION_DIRECTORY = [
  { id: "jp", name: "Jordan Pham", role: "Workshop lead" },
  { id: "mw", name: "Marcus Wells", role: "Front of house" },
  { id: "rt", name: "Rita Tan", role: "Bookings" },
  { id: "sk", name: "Sam Kovacs", role: "Apprentice" },
] as const

export default function NoteComposerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Note composer"
        title="Note composer"
        description="Customer note input. Type @ to bring up the mention list, press Enter in the tag input to add a tag, toggle pin, save to fire a confirmation toast."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CRM", href: "/ui-primitives/crm" },
          { label: "Note composer" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — Mick Davis profile</span>
        <NoteComposer
          mentionDirectory={MENTION_DIRECTORY}
          placeholder="Write a note about Mick — @mention a teammate, tag with #vehicle, #followup…"
          initial={{
            body: "Mick wants the Hilux SR5 turbo-back done before the Mudgee trip on the 17th. ",
            tags: ["hilux", "followup"],
            mentions: [],
            pinned: false,
          }}
        />
      </section>
    </main>
  )
}
