import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SdkInstallSnippet } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "SDK install snippet | UI Primitives — Dev experience",
}

export default function SdkInstallSnippetPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 01"
        title="SDK install snippet"
        description="Package-manager switcher with copy-per-tab. Each manager surfaces its native install verb."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "SDK install snippet" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>@mufflermen/sdk · v3.4.0</span>
          <SdkInstallSnippet
            packageName="@mufflermen/sdk"
            title="Install the Mufflermen SDK"
            defaultManager="pnpm"
          />
          <SdkInstallSnippet
            packageName="@mufflermen/sdk-react"
            title="Install the React adapter"
            defaultManager="npm"
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The component owns its own active-tab + copy state. Each tab uses
            <code> role=&quot;tab&quot;</code> with <code>aria-selected</code> and the panel uses
            <code> role=&quot;tabpanel&quot;</code>. The status line under the command pane uses{" "}
            <code>role=&quot;status&quot;</code> and announces clipboard activity for assistive tech.
          </p>
        </div>
      </section>
    </main>
  )
}
