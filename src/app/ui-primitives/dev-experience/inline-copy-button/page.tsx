import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InlineCopyButton } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Inline copy button | UI Primitives — Dev experience",
}

export default function InlineCopyButtonPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 11"
        title="Inline copy button"
        description="Subtle chip you can drop into prose, tables, or list rows for copying an API key, ID, or short token."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Inline copy button" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>workshop wsh_oak_flats — copy-anywhere chips</span>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65 }}>
            The Oak Flats workshop ID is{" "}
            <InlineCopyButton value="wsh_oak_flats" /> and the live API key prefix is{" "}
            <InlineCopyButton value="sk_live_abcd1234efgh5678ijkl9012" label="sk_live_abcd…9012" />.
            For idempotency keys, generate a UUIDv7 such as{" "}
            <InlineCopyButton value="019700cf-7d28-7c4e-9c4f-3b1d8e5e2f4a" label="019700cf…2f4a" />.
          </p>
          <div className={styles.demoInline} style={{ marginTop: 14 }}>
            <InlineCopyButton value="bay_oak_flats_01" />
            <InlineCopyButton value="bay_oak_flats_02" />
            <InlineCopyButton value="bay_oak_flats_03" />
            <InlineCopyButton value="bay_oak_flats_04" />
          </div>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Each chip carries its own copy state. When clipboard write succeeds the chip
            background flips to <code>--primitive-green</code> for 1.4 seconds and the
            adjacent <code>role=&quot;status&quot;</code> span announces &quot;Copied&quot;
            to screen readers. <code>label</code> lets you visually truncate the value
            while still copying the full string.
          </p>
        </div>
      </section>
    </main>
  )
}
