import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { CorsPolicyEditor } from "../../components/api-console"
import { CORS_POLICY } from "../_fixtures"

import styles from "../api-console.module.css"

export const metadata: Metadata = {
  title: "CORS policy editor | API Console",
  description:
    "Primitive 12 — CORS rules editor with origins, methods, headers tag inputs and credentials toggle.",
}

export default function CorsPolicyEditorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / CORS editor"
        title="CORS policy editor"
        description="Edit the cross-origin policy attached to an API key or environment — allowed origins as tag-input, allowed methods as chips, allowed headers as tag-input, a credentials toggle, and a preflight cache TTL."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "API console", href: "/ui-primitives/api-console" },
          { label: "CORS editor" },
        ]}
      />
      <CorsPolicyEditor value={CORS_POLICY} />
    </main>
  )
}
