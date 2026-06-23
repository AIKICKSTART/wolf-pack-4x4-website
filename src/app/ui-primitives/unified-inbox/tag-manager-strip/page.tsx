import type { Metadata } from "next"

import { TagManagerStrip } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import { TAG_LIBRARY } from "../_mock-data"
import styles from "../unified-inbox.module.css"

export const metadata: Metadata = {
  title: "Tag manager strip | Unified inbox primitives",
  description:
    "Primitive 13 — tag input with autocomplete suggestions and colour coding derived from the tag label.",
}

export default function TagManagerStripScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Tags"
        title="Tag manager strip"
        description="Combobox-style tag input. Type to filter the existing tag library — pressing Enter on a new label adds it with a colour automatically derived from the keywords (e.g. 'warranty' becomes amber, 'urgent' becomes red, 'VIP' becomes violet)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Tag manager strip" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Pre-filled · DPF clean · suggestions populated
        </span>
        <TagManagerStrip
          selected={[
            { id: "tag-dpf", label: "DPF clean", tone: "teal" },
          ]}
          suggestions={TAG_LIBRARY}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty · type to add</span>
        <TagManagerStrip selected={[]} suggestions={TAG_LIBRARY} />
      </section>
    </main>
  )
}
