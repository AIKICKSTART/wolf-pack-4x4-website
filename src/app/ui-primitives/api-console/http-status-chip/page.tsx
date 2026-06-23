import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { HttpStatusChip } from "../../components/api-console"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "HTTP status chip | API Console",
  description:
    "Primitive 10 — tiny HTTP status chip with 2xx / 3xx / 4xx / 5xx tones and reason phrase.",
}

const FAMILIES: ReadonlyArray<{ label: string; codes: ReadonlyArray<number> }> = [
  { label: "2xx success", codes: [200, 201, 202, 204] },
  { label: "3xx redirection", codes: [301, 302, 304] },
  { label: "4xx client errors", codes: [400, 401, 403, 404, 409, 422, 429] },
  { label: "5xx server errors", codes: [500, 502, 503, 504] },
]

export default function HttpStatusChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Status chip"
        title="HTTP status chip"
        description="A compact chip for an HTTP status code with the canonical reason phrase. Tones map 2xx → green, 3xx → teal, 4xx → amber, 5xx → critical red. Used by the event log, inspector, and explorer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "HTTP status chip" },
        ]}
      />
      <section className={styles.stack} aria-label="HTTP status chip families">
        {FAMILIES.map((family) => (
          <article key={family.label} className={styles.note}>
            <span>{family.label}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}>
              {family.codes.map((code) => (
                <HttpStatusChip key={code} code={code} />
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}>
              {family.codes.map((code) => (
                <HttpStatusChip key={`${code}-compact`} code={code} compact />
              ))}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
