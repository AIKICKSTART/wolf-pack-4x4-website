import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AuthSnippetCard } from "../../components/dev-experience"
import type { AuthSnippetVariant } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Auth snippet card | UI Primitives — Dev experience",
}

const VARIANTS: ReadonlyArray<AuthSnippetVariant> = [
  {
    method: "bearer",
    language: "typescript",
    caption: "Recommended for server-side workshop integrations.",
    code: `const muff = new Mufflermen({
  apiKey: process.env.MUFFLERMEN_API_KEY,
})

// Every call sends:
//   Authorization: Bearer sk_live_********`,
  },
  {
    method: "api-key",
    language: "curl",
    caption: "Raw header for non-SDK environments and webhooks.",
    code: `curl https://api.mufflermen.com/v1/parts/lookup \\
  -H "X-Mufflermen-Key: sk_live_********" \\
  -H "Accept: application/json"`,
  },
  {
    method: "mtls",
    language: "typescript",
    caption: "Bay terminal pairing — client cert pinned per workstation.",
    code: `import { readFileSync } from "node:fs"

const muff = new Mufflermen({
  tls: {
    cert: readFileSync("/etc/mufflermen/bay-03.crt"),
    key: readFileSync("/etc/mufflermen/bay-03.key"),
    ca: readFileSync("/etc/mufflermen/oak-flats-ca.pem"),
  },
})`,
  },
  {
    method: "oidc",
    language: "typescript",
    caption: "Manager dashboards — exchanges OIDC ID tokens for SDK access.",
    code: `const muff = await Mufflermen.fromOidc({
  issuer: "https://login.oakflats.mufflermen.com",
  audience: "https://api.mufflermen.com",
  idToken: await getIdTokenFromWorkOs(),
})`,
  },
]

export default function AuthSnippetCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 04"
        title="Auth snippet card"
        description="Auth example card — Bearer / API key / mTLS / OIDC variants, each with a real Mufflermen integration sample."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Auth snippet card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>auth — four supported methods</span>
          <AuthSnippetCard
            variants={VARIANTS}
            postmanUrl="https://www.postman.com/mufflermen/workspace/api/collection/quotes"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Tab change updates the title, caption, and code panel synchronously. The
            open-in-Postman CTA opens in a new tab with <code>rel=&quot;noreferrer&quot;</code>{" "}
            for safety. The component is purely stateful around the active tab — the
            code-block primitive owns its own copy state per render.
          </p>
        </div>
      </section>
    </main>
  )
}
