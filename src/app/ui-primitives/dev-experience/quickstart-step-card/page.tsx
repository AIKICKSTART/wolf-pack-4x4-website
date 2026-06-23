import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuickstartStepCard } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Quickstart step card | UI Primitives — Dev experience",
}

const AUTH_CODE = `import { Mufflermen } from "@mufflermen/sdk"

const muff = new Mufflermen({
  apiKey: process.env.MUFFLERMEN_API_KEY,
})`

const QUOTE_CODE = `const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
})`

export default function QuickstartStepCardPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 02"
        title="Quickstart step card"
        description="Single quickstart step — number chip, language tag, body, code sample, and a mark-done toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Quickstart step card" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>quickstart · step 1 — authenticate</span>
          <QuickstartStepCard
            stepNumber={1}
            title="Authenticate the SDK"
            language="typescript"
            fileName="apps/web/lib/mufflermen.ts"
            code={AUTH_CODE}
          >
            <p>
              Create a Mufflermen client using your workshop API key. The key scopes the
              client to your bays — keep it on the server, never ship it to the browser.
            </p>
          </QuickstartStepCard>
          <QuickstartStepCard
            stepNumber={2}
            title="Build your first instant quote"
            language="typescript"
            fileName="apps/web/quote-flow.ts"
            code={QUOTE_CODE}
            initialDone
          >
            <p>
              Pass the vehicle, parts, and bay — the SDK resolves availability against the
              bay-availability stream and returns a quote with line items, GST, and an
              expiry timestamp.
            </p>
          </QuickstartStepCard>
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The card is a self-contained <code>&lt;article&gt;</code> labelled by its
            heading. Mark-done state is uncontrolled and tracked locally — when toggled the
            chip rotates to <code>--primitive-green</code> and the toggle becomes a filled
            pill with <code>aria-pressed</code> reflecting state.
          </p>
        </div>
      </section>
    </main>
  )
}
