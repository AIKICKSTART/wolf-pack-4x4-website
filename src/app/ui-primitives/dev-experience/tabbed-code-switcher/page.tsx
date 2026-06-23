import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TabbedCodeSwitcher } from "../../components/dev-experience"
import type { CodeTopic } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Tabbed code switcher | UI Primitives — Dev experience",
}

const TOPICS: ReadonlyArray<CodeTopic> = [
  {
    key: "initialize",
    label: "Initialize",
    language: "typescript",
    fileName: "lib/muff.ts",
    code: `import { Mufflermen } from "@mufflermen/sdk"

export const muff = new Mufflermen({
  workshopId: "wsh_oak_flats",
  apiKey: process.env.MUFFLERMEN_API_KEY,
})`,
  },
  {
    key: "authenticate",
    label: "Authenticate",
    language: "typescript",
    fileName: "lib/auth.ts",
    code: `// Workshop API keys are scoped to a single workshop_id.
// Rotate keys at https://dashboard.mufflermen.com/keys
muff.setApiKey(process.env.MUFFLERMEN_API_KEY)`,
  },
  {
    key: "first-request",
    label: "First request",
    language: "typescript",
    fileName: "scripts/first-quote.ts",
    code: `const quote = await muff.quotes.create({
  vehicleId: "veh_2026_ford_ranger_xl",
  partIds: ["part_extractor_xforce_4cyl"],
  bayId: "bay_oak_flats_03",
})

console.log(\`Quote \${quote.id} — total $\${quote.totalAud}\`)`,
  },
]

export default function TabbedCodeSwitcherPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 10"
        title="Tabbed code switcher"
        description="Generic topic-based code switcher — Initialize / Authenticate / First request — distinct from the language switcher."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Tabbed code switcher" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>quickstart walk-through — three topics</span>
          <TabbedCodeSwitcher
            title="Walk through the SDK"
            topics={TOPICS}
          />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Tabs are labelled by topic (a concept your team chooses) rather than language.
            Active state is held inside the component — once a user picks{" "}
            <code>First request</code> they stay there until they explicitly pick a
            different topic. Pair with the lang-switcher when both topic + language matter.
          </p>
        </div>
      </section>
    </main>
  )
}
