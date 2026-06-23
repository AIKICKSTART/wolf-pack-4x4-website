import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SdkVersionSelector } from "../../components/dev-experience"
import type { SdkVersionOption } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "SDK version selector | UI Primitives — Dev experience",
}

const VERSIONS: ReadonlyArray<SdkVersionOption> = [
  { version: "3.4.0", channel: "stable" },
  { version: "3.3.2", channel: "stable" },
  { version: "4.0.0-beta.2", channel: "beta", breaking: true },
  { version: "4.0.0-canary.7", channel: "canary", breaking: true },
  { version: "3.0.0", channel: "stable", breaking: true },
]

export default function SdkVersionSelectorPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 13"
        title="SDK version selector"
        description="Compact dropdown with the current version, channel chip, and an inline breaking-changes badge per option."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "SDK version selector" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>@mufflermen/sdk — pick a release</span>
          <div className={styles.demoInline}>
            <SdkVersionSelector
              options={VERSIONS}
              currentVersion="3.4.0"
            />
            <SdkVersionSelector
              options={VERSIONS}
              currentVersion="4.0.0-beta.2"
            />
            <SdkVersionSelector
              options={VERSIONS}
              currentVersion="3.0.0"
            />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The trigger surfaces the version, channel chip, and (when set){" "}
            <code>Breaking</code> badge. The dropdown is a proper{" "}
            <code>role=&quot;listbox&quot;</code> with each option as{" "}
            <code>role=&quot;option&quot;</code> + <code>aria-selected</code>. Open / close
            state is managed inside the component and the chevron rotates 180° to confirm.
          </p>
        </div>
      </section>
    </main>
  )
}
