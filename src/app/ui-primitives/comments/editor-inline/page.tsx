import type { Metadata } from "next"

import {
  EditorInlineComments,
  type EditorParagraph,
  type InlineCommentRange,
} from "../../components/comments"
import { PageHeader } from "../../components/page-header"

import { PEOPLE } from "../demo-data"
import styles from "../comments.module.css"

export const metadata: Metadata = {
  title: "Editor inline comments | Comments primitives",
  description:
    "Primitive 14 — prose with highlighted ranges that, on hover or focus, expose a thread tooltip.",
}

const PARAGRAPHS: ReadonlyArray<EditorParagraph> = [
  {
    id: "p-1",
    body: "The Hilux retrofit quote covers a 3-inch stainless system from manifold to tip, ADR-compliant routing under the chassis, and the spacer kit on Toyota brackets to clear the factory diff drop.",
  },
  {
    id: "p-2",
    body: "Rear muffler diameter is reduced to 4 inches to tuck above the tow bar. Customer accepts the standard 12-month workshop warranty plus the lifetime weld guarantee.",
  },
  {
    id: "p-3",
    body: "Total labour is 4.5 hours billed at the Bay 3 lift rate. Parts kit ships from the runner shelf 12B; allow 24 hours for inbound stock if Bay 3 is double-booked.",
  },
]

const RANGES: ReadonlyArray<InlineCommentRange> = [
  {
    id: "r-1",
    anchor: "ADR-compliant routing",
    status: "open",
    author: PEOPLE.jordan,
    body: "Need to double-check the ADR-13 paragraph on tow-bar clearance before quoting.",
    timestamp: "10:14a",
  },
  {
    id: "r-2",
    anchor: "spacer kit on Toyota brackets",
    status: "resolved",
    author: PEOPLE.kara,
    body: "Spacer kit confirmed in stock; quote uplift $48.",
    timestamp: "10:18a",
  },
  {
    id: "r-3",
    anchor: "lifetime weld guarantee",
    status: "open",
    author: PEOPLE.taj,
    body: "Lifetime guarantee on TIG welds only — flag MIG carve-out in the contract.",
    timestamp: "Wed 9:02a",
  },
  {
    id: "r-4",
    anchor: "runner shelf 12B",
    status: "open",
    author: PEOPLE.marcus,
    body: "12B is reorganised — Hilux kit moved to bin 12B-3.",
    timestamp: "Wed 11:10a",
  },
]

export default function EditorInlinePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Editor inline comments"
        title="Editor inline comments"
        description="Prose with anchored highlight ranges. Hover or focus a highlight to read its thread. Resolved ranges shift to green; open ranges glow amber."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Comments", href: "/ui-primitives/comments" },
          { label: "Editor inline" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Hilux retrofit quote · v4 draft</span>
        <EditorInlineComments
          docTitle="Hilux Retrofit · Quote v4"
          docMeta="Draft · 4 inline comments"
          paragraphs={PARAGRAPHS}
          ranges={RANGES}
        />
      </section>
    </main>
  )
}
