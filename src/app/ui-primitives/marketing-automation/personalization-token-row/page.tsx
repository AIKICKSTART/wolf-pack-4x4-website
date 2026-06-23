import type { Metadata } from "next"

import { PersonalizationTokenRow } from "../../components/marketing-automation"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-automation.module.css"

export const metadata: Metadata = {
  title: "Personalization token row | Marketing automation",
  description:
    "Primitive 09 — merge-tag row showing a token, its rendered preview and the fallback used when missing.",
}

export default function PersonalizationTokenRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Personalization token row"
        title="Personalization token row"
        description="Single merge-tag row used to audit personalisation across templates. Shows the literal token, the rendered preview with the merged value bolded, and the fallback used when the source attribute is missing."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          {
            label: "Marketing automation",
            href: "/ui-primitives/marketing-automation",
          },
          { label: "Personalization token row" },
        ]}
      />

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 1 · Standard contact attributes</h2>
        <div className={styles.demoStack}>
          <PersonalizationTokenRow
            token="{{first_name}}"
            source="Contact attribute · first_name"
            previewBefore="G'day "
            previewValue="Dazza"
            previewAfter=", your Hilux quote is saved."
            fallback="Mate"
          />
          <PersonalizationTokenRow
            token="{{vehicle.make}}"
            source="Vehicle attribute"
            previewBefore="Your "
            previewValue="Hilux"
            previewAfter=" cat-back is ready in Bay 2."
            fallback="vehicle"
          />
          <PersonalizationTokenRow
            token="{{quote.amount}}"
            source="Quote attribute · amount"
            previewBefore="Quote total: "
            previewValue="$2,840"
            previewAfter=" inc. GST."
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 2 · Geo / workshop tokens</h2>
        <div className={styles.demoStack}>
          <PersonalizationTokenRow
            token="{{workshop.name}}"
            source="Workshop assignment"
            previewBefore="Booked at "
            previewValue="Oakflats Mufflermen"
            previewAfter=" · Bay 2."
            fallback="Oakflats Mufflermen"
          />
          <PersonalizationTokenRow
            token="{{suburb}}"
            source="Contact address · suburb"
            previewBefore="Local crew in "
            previewValue="Wollongong"
            previewAfter="."
            fallback="Illawarra"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <h2 className={styles.demoLabel}>State 3 · Missing fallback warning</h2>
        <div className={styles.demoStack}>
          <PersonalizationTokenRow
            token="{{loyalty_tier}}"
            source="Loyalty attribute"
            previewBefore="Tier: "
            previewValue=""
            previewAfter=""
          />
          <PersonalizationTokenRow
            token="{{next_service_due}}"
            source="Service attribute"
            previewBefore="Service due: "
            previewValue=""
            previewAfter=""
          />
        </div>
      </section>
    </main>
  )
}
