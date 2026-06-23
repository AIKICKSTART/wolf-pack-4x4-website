import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuthMethodChip } from "../../components/api-console"
import type { AuthMethod } from "../../components/api-console"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "Auth method chip | API Console",
  description:
    "Primitive 11 — auth method chip with icon and a signature preview popover for Bearer, Basic, API Key, mTLS, OIDC.",
}

const METHODS: ReadonlyArray<AuthMethod> = ["bearer", "basic", "api-key", "mtls", "oidc"]

export default function AuthMethodChipPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Auth chip"
        title="Auth method chip"
        description="Compact chip identifying the auth required for an endpoint — clickable to reveal a popover with a sample signature line so a developer can see what their header is supposed to look like."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "Auth method chip" },
        ]}
      />
      <section className={styles.stack}>
        <article className={styles.note}>
          <span>Interactive chips (click to preview signature)</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}>
            {METHODS.map((method) => (
              <AuthMethodChip key={method} method={method} />
            ))}
          </div>
        </article>
        <article className={styles.note}>
          <span>Inert variant (no popover) — for tightly packed cells</span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)" }}>
            {METHODS.map((method) => (
              <AuthMethodChip key={`${method}-inert`} method={method} inert />
            ))}
          </div>
        </article>
      </section>
    </main>
  )
}
